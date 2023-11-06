import CustomerPaymentD from "../../../../models/Transaction/Account Receivable/CustomerPayment/CustomerPaymentD.js";
import CustomerPaymentH from "../../../../models/Transaction/Account Receivable/CustomerPayment/CustomerPaymentH.js";
import ARRequestListd from "../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListDetail.js";
import SalesInvoiceh from '../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceH.js'
import ARBook from "../../../../models/Report/AccountReceivable/ARBook.js";
import Sequelize, { Op } from 'sequelize'
import db from '../../../../config/Database.js'

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



