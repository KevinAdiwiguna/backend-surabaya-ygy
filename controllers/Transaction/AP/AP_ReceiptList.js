import APReceiptListh from "../../../models/Transaction/AP/AR_ReceiptListh.js";
import APReceiptLishd from "../../../models/Transaction/AP/AR_ReceiptLIstd.js";
import APBook from "../../../models/Report/AccountPayable/APBook.js";
import sequelize, { Op } from 'sequelize'

export const createRequestList = async (req, res) => {
  const { series, docDate, generateDocDate, supplierCode, totalDocument, totalValue, information, status, printCounter, createdBy, changedBy, details } = req.body
  try {
    const existingHeader = await APReceiptListh.findOne({
      attributes: ["DocNo"],
      where: {
        DocNo: {
          [Op.like]: `${series}-${generateDocDate}-%`,
        },
      },
      order: [[sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), "DESC"]],
      raw: true,
      limit: 1,
    });

    let DocNo;
    if (!existingHeader) {
      DocNo = `${series}-${generateDocDate}-0001`;
    } else {
      const Series = parseInt(existingHeader.DocNo.split("-")[2], 10) + 1;
      DocNo = `${series}-${generateDocDate}-${Series.toString().padStart(4, "0")}`;
    }

    await APReceiptListh.create({
      DocNo: DocNo,
      Series: series,
      DocDate: docDate,
      SupplierCode: supplierCode,
      TotalDocument: totalDocument,
      TotalValue: totalValue,
      Information: information,
      Status: status,
      PrintCounter: printCounter,
      CreatedBy: createdBy,
      ChangedBy: changedBy
    })

    if (details && Array.isArray(details)) {
      await Promise.all(
        details.map(async (details) => {
          const { apDocNo } = details;
          try {
            await APReceiptLishd.create({
              DocNo: DocNo,
              APDocNo: apDocNo,
            });
          } catch (error) {
            console.error(error);
          }
        })
      );
    }
    res.status(200).json({ msg: "create berhasil" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const getCreatedApRequestList = async (req, res) => {
  try {
    const response = await APReceiptListh.findAll(
      {
        where: {
          Status: "PRINTED"
        }
      }
    )

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
export const updateRequestList = async (req, res) => {

  try {
    const { series, information, status, createdBy, changedBy, details } = req.body;

    const receiptListh = await APReceiptListh.findOne({
      where: {
        DocNo: req.params.id
      }
    });

    if (!receiptListh) {
      return res.status(400).json({ msg: "Data tidak ditemukan" });
    }

    await APReceiptListh.update({
      Series: series || receiptListh.Series,
      Information: information || receiptListh.Information,
      Status: status || receiptListh.Status,
      CreatedBy: createdBy || receiptListh.CreatedBy,
      ChangedBy: changedBy || receiptListh.ChangedBy
    }, {
      where: {
        DocNo: receiptListh.DocNo
      },
    });

    if (details && Array.isArray(details)) {
      await Promise.all(
        details.map(async (detail) => {
          const { apDocNo } = detail;
          try {
            await APReceiptLishd.upsert({
              DocNo: receiptListh.DocNo,
              APDocNo: apDocNo,
            }, {
              where: {
                DocNo: receiptListh.DocNo
              },
            });
          } catch (error) {
            console.error(error);
          }
        })
      );
    }

    await APReceiptLishd.destroy({
      where: {
        DocNo: receiptListh.DocNo,
      },
    });

    for (let a = 0; a < details.length; a++) {
      await APReceiptLishd.create({
        DocNo: receiptListh.DocNo,
        CustomerCode: details[a].CustomerCode,
        ARDocNo: details[a].ARDocNo,
      });
    }

    res.status(200).json({ msg: "Update berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const getRequestListDetail = async (req, res) => {
  try {
    const response = await APBook.findAll({
      where: {
        SupplierCode: req.params.id
      }
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const getAPReceiptUsed = async (req, res) => {
  try {
    const response = await APReceiptListh.findAll({
      where: {
        Status: "USED"
      }
    })

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const getAllAPReceipt = async (req, res) => {
  try {
    const response = await APReceiptListh.findAll()
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const getAppBok = async (req, res) => {
  try {
    const response = await APBook.findAll({})
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
export const getApReceiptDetail = async (req, res) => {
  try {
    const header = await APReceiptListh.findOne({
      where: {
        DocNo: req.params.id
      }
    })

    const detail = await APReceiptLishd.findAll({
      where: {
        DocNo: req.params.id
      }
    })
    return res.status(200).json({
      header,
      detail
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const deleteApReceipt = async (req, res) => {
  try {
    await APReceiptListh.update({
      Status: "DELETED"
    }, {
      where: {
        DocNo: req.params.id
      }
    })
    res.status(200).json({ msg: 'data deleted' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const printRequestList = async (req, res) => {
  const { printedBy } = req.body
  let count;
  try {
    const data = await APReceiptListh.findOne({
      where: {
        DocNo: req.params.id
      }
    })
    if (data.PrintCounter < 1 || data.PrintCounter == undefined) {
      count = 1;
    } else {
      count = data.PrintCounter + 1;
    }

    await APReceiptListh.update(
      {
        Status: "PRINTED",
        PrintCounter: count,
        PrintedDate: new Date(),
        PrintedBy: printedBy
      },
      {
        where: {
          DocNo: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "success print" });
  } catch (error) {
    res.status(500).json({ msg: error.message });

  }
}