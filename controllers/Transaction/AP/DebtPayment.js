import DebtPaymentD from "../../../models/Transaction/AP/DebtPaymentD.js";
import DebtPaymentH from "../../../models/Transaction/AP/DebtPaymentH.js";
import APReceiptListd from "../../../models/Transaction/AP/AR_ReceiptLIstd.js";
import APReceiptListh from "../../../models/Transaction/AP/AR_ReceiptListh.js";
import PurchaseInvoiceh from '../../../models/Transaction/Purchase/PurchaseInvoice/PurchaseInvoiceHeader.js'
import APBook from "../../../models/Report/AccountPayable/APBook.js";
import Sequelize, { Op } from 'sequelize'
import db from '../../../config/Database.js'

export const createDebtPayment = async (req, res) => {
  const { series, docDate, apRecListNo, supplierCode, totalDocument, totalPayment, information, status, createdBy, changedBy, generateDocDate, details } = req.body;

  const t = await db.transaction();

  try {

    await APReceiptListh.update(
      { Status: "USED" },
      {
        where: {
          DocNo: apRecListNo
        }
      }
    )

    const data = await DebtPaymentH.findOne({
      where: {
        APRecListNo: apRecListNo
      }
    })

    if (data) return res.status(400).json({ msg: "document sudah di digunakan" })

    const existingHeader = await DebtPaymentH.findOne({
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

    await DebtPaymentH.create({
      DocNo: DocNo,
      Series: series,
      DocDate: docDate,
      APRecListNo: apRecListNo,
      SupplierCode: supplierCode,
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
          const { transactionType, apDocNo, dc, currency, payment, exchangeRate, paymentLocal, taxPrefix, taxNo, information } = detail;
          try {
            await DebtPaymentD.create({
              DocNo: DocNo,
              TransactionType: transactionType,
              APDocNo: apDocNo,
              DC: dc,
              Currency: currency,
              Payment: payment,
              ExchangeRate: exchangeRate,
              PaymentLocal: paymentLocal,
              TaxPrefix: taxPrefix,
              TaxNo: taxNo,
              Information: information,
            }, { transaction: t });
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

export const getDebtPaymentDetail = async (req, res) => {
  try {
    const getAPReceiptListd = await APReceiptListd.findAll({
      where: {
        DocNo: req.params.id
      },
      attributes: ["APDocNo", "DocNo"]
    });

    const apBookItem = await APBook.findAll({
      where: {
        DocNo: getAPReceiptListd.map(item => item.APDocNo)
      },
      attributes: [
        "SupplierCode", "DocNo", "TransType", "TOP", "DueDate",
        "Currency", "ExchangeRate", "Information", "DC", "DocValue",
        "DocValueLocal", "PaymentValue", "PaymentValueLocal", "ExchangeRateDiff"
      ]
    });

    const getDetail = await PurchaseInvoiceh.findOne({
      where: {
        DocNo: apBookItem[0].DocNo
      },
      attributes: ["TaxNo", "TaxPrefix"]
    });

    // Menggabungkan data dari getARRequestListd dan arBookItem berdasarkan ARDocNo dan DocNo
    const combinedData = getAPReceiptListd.map(apRequestItem => {
      const matchingARBookItem = apBookItem.find(apBookItem => apBookItem.DocNo === apRequestItem.APDocNo);

      // Menambahkan getDetail ke objek hasil, atau menggunakan nilai default jika getDetail tidak ditemukan
      return {
        ...matchingARBookItem.dataValues,
        TaxNo: getDetail ? getDetail.TaxNo : null,
        TaxPrefix: getDetail ? getDetail.TaxPrefix : null
      };
    });

    res.json(combinedData); // Mengirimkan hasil gabungan
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

