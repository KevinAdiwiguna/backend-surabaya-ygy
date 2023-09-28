import CustomerPaymentD from "../../../../models/Transaction/Account Receivable/CustomerPayment/CustomerPaymentD.js";
import CustomerPaymentH from "../../../../models/Transaction/Account Receivable/CustomerPayment/CustomerPaymentH.js";
import ARRequestListd from "../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListDetail.js";
import ARRequestListh from '../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListHeader.js'
import ARBook from "../../../../models/Report/AccountReceivable/ARBook.js";
import sequelize, { Op } from 'sequelize'

export const createCustomerPayment = async (req, res) => {
  const { series, docDate, arRequestListNo, totalCustomer, totalDocument, totalPayment, information, status, createdBy, changedBy, generateDocDate, details } = req.body

  const existingHeader = await CustomerPaymentH.findOne({
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
    ARRequestListNo: arRequestListNo,
    TotalCustomer: totalCustomer,
    TotalDocument: totalDocument,
    TotalPayment: totalPayment,
    Information: information,
    Status: status,
    CreatedBy: createdBy,
    ChangedBy: changedBy,
    GenerateDocDate: generateDocDate,
  })

  if (details && Array.isArray(details)) {
    await Promise.all(
      details.map(async (detail) => {
        const { DocNo, transactionType, customerCode, arDocNo, dc, currency, payment, exchangeRate, paymentLocal, taxPrefix, taxNo, information } = detail;
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
          });
        } catch (error) {
          console.error(error);
        }
      })
    );
  }


}



export const getCustomerPaymentDetail = async (req, res) => {
  const getARRequestListd = await ARRequestListd.findAll({
    where: {
      DocNo: req.params.id
    },
    attributes: ["ARDocNo", "DocNo"]
  });

  const ARBookPromises = getARRequestListd.map(async (arRequest) => {
    const ARBookData = await ARBook.findAll({
      where: {
        DocNo: arRequest.ARDocNo
      },
      attributes: ["CustomerCode", "DocNo", "TransType", "TOP", "DueDate", "Currency", "ExchangeRate", "Information", "DC", "DocValue", "DocValueLocal", "PaymentValue", "PaymentValueLocal", "ExchangeRateDiff"]
    });
    return ARBookData;
  });

  const ARBookDataArray = await Promise.all(ARBookPromises);

  const mergedARBookData = ARBookDataArray.flat();

  res.json(mergedARBookData);
}
