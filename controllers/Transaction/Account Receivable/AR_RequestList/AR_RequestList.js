import ARRequestListh from "../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListHeader.js";
import ARRequestListd from "../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListDetail.js";
import ARBook from "../../../../models/Report/AccountReceivable/ARBook.js";
import sequelize, { Op } from 'sequelize'

export const getAllRequestList = async (req,res) => {
  try {
    const response = await ARRequestListh.findAll({})
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

export const getDetailDocNo = async (req, res) => {
  try {
    const header = await ARRequestListh.findOne({
      where: {
        DocNo: req.params.id,
      },
    });
    const detail = await ARRequestListd.findAll({
      where: {
        DocNo: req.params.id,
      },
    });

    res.status(200).json({ header: header, detail: detail });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createRequestList = async (req, res) => {
  const { series, docDate, generateDocDate, collectorCode, customerGroup, salesArea1, salesArea2, salesArea3, currency, totalCustomer, totalDocument, totalValue, information, status, printCounter, printedBy, createdBy, changedBy, printedDate, details } = req.body
  try {
    const existingHeader = await ARRequestListh.findOne({
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

    await ARRequestListh.create({
      DocNo: DocNo,
      Series: series,
      DocDate: docDate,
      CollectorCode: collectorCode,
      CustomerGroup: customerGroup,
      SalesArea1: salesArea1,
      SalesArea2: salesArea2,
      SalesArea3: salesArea3,
      Currency: currency,
      TotalCustomer: totalCustomer,
      TotalDocument: totalDocument,
      TotalValue: totalValue,
      Information: information,
      Status: status,
      PrintCounter: printCounter,
      PrintedBy: printedBy,
      PrintedDate: printedDate,
      CreatedBy: createdBy,
      ChangedBy: changedBy
    })

    if (details && Array.isArray(details)) {
      await Promise.all(
        details.map(async (detail) => {
          const { customerCode, arDocNo } = detail;
          try {
            await ARRequestListd.create({
              DocNo: DocNo,
              CustomerCode: customerCode,
              ARDocNo: arDocNo,
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

export const updateRequestList = async (req, res) => {

  try {
    const { docNo, series, docDate, collectorCode, customerGroup, salesArea1, salesArea2, salesArea3, currency, totalCustomer, totalDocument, totalValue, information, status, printCounter, printedBy, printedDate, createdBy, changedBy, details } = req.body;

    const requestListh = await ARRequestListh.findOne({
      where: {
        DocNo: req.params.id
      }
    });

    if (!requestListh) {
      return res.status(400).json({ msg: "Data tidak ditemukan" });
    }

    await ARRequestListh.update({
      DocNo: docNo || requestListh.DocNo,
      Series: series || requestListh.Series,
      DocDate: docDate || requestListh.DocDate,
      CollectorCode: collectorCode || requestListh.CollectorCode,
      CustomerGroup: customerGroup || requestListh.CustomerGroup,
      SalesArea1: salesArea1 || requestListh.SalesArea1,
      SalesArea2: salesArea2 || requestListh.SalesArea2,
      SalesArea3: salesArea3 || requestListh.SalesArea3,
      Currency: currency || requestListh.Currency,
      TotalCustomer: totalCustomer || requestListh.TotalCustomer,
      TotalDocument: totalDocument || requestListh.TotalDocument,
      TotalValue: totalValue || requestListh.TotalValue,
      PrintCounter: printCounter || requestListh.PrintCounter,
      PrintedBy: printedBy || requestListh.PrintedBy,
      PrintedDate: printedDate || requestListh.PrintedDate,
      Information: information || requestListh.Information,
      Status: status || requestListh.Status,
      CreatedBy: createdBy || requestListh.CreatedBy,
      ChangedBy: changedBy || requestListh.ChangedBy
    }, {
      where: {
        DocNo: requestListh.DocNo
      },
    });


    if (details && Array.isArray(details)) {
      await Promise.all(
        details.map(async (detail) => {
          const { customerCode, arDocNo } = detail;
          try {
            
            await ARRequestListd.upsert({
              DocNo: requestListh.DocNo,
              CUstomerCode: customerCode,
              ARDocNo: arDocNo,
            }, {
              where: {
                DocNo: requestListh.DocNo
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
    const response = await ARBook.findAll()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const getRequestListPrinted = async (req, res) => {
  try {
    const response = await ARRequestListh.findAll({
      where: {
        Status: "PRINTED"
      }
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })

  }
}
export const getRequestListUsed = async (req, res) => {
  try {
    const response = await ARRequestListh.findAll({
      where: {
        Status: "USED"
      }
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })

  }
}