import CustomerPaymentD from "../../../../models/Transaction/Account Receivable/CustomerPayment/CustomerPaymentD.js";
import CustomerPaymentH from "../../../../models/Transaction/Account Receivable/CustomerPayment/CustomerPaymentH.js";
import ARRequestListd from "../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListDetail.js";
import ARRequestListh from '../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListHeader.js'
import SalesInvoiceh from '../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceH.js'
import ARBook from "../../../../models/Report/AccountReceivable/ARBook.js";
import Sequelize, { Op } from 'sequelize'
import db from '../../../../config/Database.js'

export const getAllCustomerPayment = async (req, res) => {
  try {
    const response = await CustomerPaymentH.findAll({})
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

export const createCustomerPayment = async (req, res) => {
  const { series, docDate, arRequestListNo, totalCustomer, totalDocument, totalPayment, information, status, createdBy, changedBy, generateDocDate, details } = req.body;

  const t = await db.transaction();

  try {
    const data = await CustomerPaymentH.findOne({
      where: {
        ARReqListNo: arRequestListNo
      }
    })

    if (data) return res.status(400).json({ msg: "document sudah di digunakan" })

    await ARRequestListh.update({
      Status: "USED"
    }, {
      where: {
      DocNo: arRequestListNo
      }
  })

  const existingHeader = await CustomerPaymentH.findOne({
      attributes: ["DocNo"],
      where: {
        DocNo: {
          [Op.like]: `${series}-${generateDocDate}-%`,
        },
      },
      order: [[Sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), "DESC"]],
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

    await CustomerPaymentH.create({
      DocNo: DocNo,
      Series: series,
      DocDate: docDate,
      ARReqListNo: arRequestListNo,
      TotalCustomer: totalCustomer,
      TotalDocument: totalDocument,
      TotalPayment: totalPayment,
      Information: information,
      Status: status,
      CreatedBy: createdBy,
      ChangedBy: changedBy,
      GenerateDocDate: generateDocDate,
    }, { transaction: t });

    if (details && Array.isArray(details)) {
      await Promise.all(
        details.map(async (detail) => {
          const { transactionType, customerCode, arDocNo, dc, currency, payment, exchangeRate, paymentLocal, taxPrefix, taxNo, information } = detail;
          try {
            await CustomerPaymentD.create({
              DocNo: DocNo,
              TransactionType: transactionType,
              CustomerCode: customerCode,
              ARDocNo: arDocNo,
              DC: dc,
              Currency: currency,
              Payment: payment,
              ExchangeRate: exchangeRate,
              PaymentLocal: paymentLocal,
              TaxPrefix: taxPrefix,
              TaxNo: taxNo,
              Information: information,
            }, { transaction: t });


            await ARBook.update({
              PaymentValue: payment,
              PaymentValueLocal: paymentLocal,
            }, {
              where: {
                DocNo: arDocNo
              }
            })

          } catch (error) {
            console.error(error);
            await t.rollback();
            res.status(500).json({ msg: "Gagal membuat detail" });
          }
        })
      );
    }

    await t.commit();
    res.status(201).json({ msg: "berhasil create" });

  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(500).json({ msg: error.message });
  }
}

export const getCustomerPaymentDetail = async (req, res) => {
  try {
    const getARRequestListd = await ARRequestListd.findAll({
      where: {
        DocNo: req.params.id
      },
      attributes: ["ARDocNo", "DocNo"]
    });

    const arBookItem = await ARBook.findAll({
      where: {
        DocNo: getARRequestListd.map(item => item.ARDocNo)
      },
      attributes: [
        "CustomerCode", "DocNo", "TransType", "TOP", "DueDate",
        "Currency", "ExchangeRate", "Information", "DC", "DocValue",
        "DocValueLocal", "PaymentValue", "PaymentValueLocal", "ExchangeRateDiff"
      ]
    });

    const getDetail = await SalesInvoiceh.findOne({
      where: {
        DocNo: arBookItem[0].DocNo
      },
      attributes: ["TaxNo", "TaxPrefix"]
    });

    const combinedData = getARRequestListd.map(arRequestItem => {
      const matchingARBookItem = arBookItem.find(arBookItem => arBookItem.DocNo === arRequestItem.ARDocNo);

      return {
        ...matchingARBookItem.dataValues,
        TaxNo: getDetail ? getDetail.TaxNo : null,
        TaxPrefix: getDetail ? getDetail.TaxPrefix : null
      };
    });

    res.json(combinedData);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getCustomerPaymentDetailByDocNo = async (req, res) => {
  try {
    const response = await CustomerPaymentD.findAll({
      where: {
        DocNo: req.params.id
      }
    })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

export const updateCustomerPayment = async (req, res) => {
  const { information, details } = req.body
  const t = await db.transaction();

  try {
    const exisingHeader = await CustomerPaymentH.findOne({
      where: {
        DocNo: req.params.id
      }
    },  { transaction: t })

    if (!exisingHeader) return res.status(404).json({ msg: "data tidak ada" })
    if (exisingHeader.Status == 'PRINTED') return res.status(400).json({ msg: "data printed tidak bisa di update" })


    await CustomerPaymentH.update({
      Information: information
    }, {
      where: {
        DocNo: req.params.id
      }
    })

 

    if (details && Array.isArray(details)) {
      await Promise.all(
        details.map(async (detail) => {
          const { ExchangeRate, Payment, PaymentLocal, Information,DocNo } = detail;
    
          await CustomerPaymentD.update(
            {
              ExchangeRate: ExchangeRate,
              Payment: Payment,
              PaymentLocal: PaymentLocal,
              Information: Information
            },
            {
              where: {
                ARDocNo: DocNo
              }
            }
          );
        },  { transaction: t })
      );
    }

    return res.status(201).json({ msg: "data updated" })
  } catch (error) {
    return res.status(200).json({ msg: error.message })
  }
}

