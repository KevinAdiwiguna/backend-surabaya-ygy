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
    const { docNo, series, docDate, supplierCode, customerGroup, salesArea1, salesArea2, salesArea3, currency, totalCustomer, totalDocument, totalValue, information, status, printCounter, printedBy, printedDate, createdBy, changedBy, details } = req.body;

    const receiptListh = await APReceiptListh.findOne({
      where: {
        DocNo: req.params.id
      }
    });

    if (!receiptListh) {
      return res.status(400).json({ msg: "Data tidak ditemukan" });
    }

    await APReceiptListh.update({
      DocNo: docNo || receiptListh.DocNo,
      Series: series || receiptListh.Series,
      DocDate: docDate || receiptListh.DocDate,
      SupplierCode: supplierCode || receiptListh.SupplierCode,
      CustomerGroup: customerGroup || receiptListh.CustomerGroup,
      SalesArea1: salesArea1 || receiptListh.SalesArea1,
      SalesArea2: salesArea2 || receiptListh.SalesArea2,
      SalesArea3: salesArea3 || receiptListh.SalesArea3,
      Currency: currency || receiptListh.Currency,
      TotalCustomer: totalCustomer || receiptListh.TotalCustomer,
      TotalDocument: totalDocument || receiptListh.TotalDocument,
      TotalValue: totalValue || receiptListh.TotalValue,
      PrintCounter: printCounter || receiptListh.PrintCounter,
      PrintedBy: printedBy || receiptListh.PrintedBy,
      PrintedDate: printedDate || receiptListh.PrintedDate,
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
    const response = await APReceiptListh.findAll({
      where: {
        DocNo: req.params.id
      }
    })
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}