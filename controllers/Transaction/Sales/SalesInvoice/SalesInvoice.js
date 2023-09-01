import goodsissue from "../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js";
import salesInvoiceh from "../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceH.js";

export const goodsissueStatus = async (req, res) => {
  try {
    const response = await goodsissue.findAll({
      where: {
        Status: req.params.id,
      },
    });
    res.status({ msg: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSalesinvoice = async (req, res) => {
  const { docNo, series, docDate, sODocNo, gIDocNo, pONo, customerCode, taxToCode, salesCode, tOP, currency, exchangeRate, taxStatus, taxPercent, taxPrefix, taxNo, discPercent, totalGross, totalDisc, downPayment, taxValue, taxValueInTaxCur, totalNetto, totalCost, cutPPh, pPhPercent, pPhValue, information, status, printCounter, printedBy, printedDate, createdBy, changedBy } = req.body;
  try {
    await salesInvoiceh.create({
      DocNo: docNo,
      Series: series,
      DocDate: docDate,
      SODocNo: sODocNo,
      GIDocNo: gIDocNo,
      PONo: pONo,
      CustomerCode: customerCode,
      TaxToCode: taxToCode,
      SalesCode: salesCode,
      TOP: tOP,
      Currency: currency,
      ExchangeRate: exchangeRate,
      TaxStatus: taxStatus,
      TaxPercent: taxPercent,
      TaxPrefix: taxPrefix,
      TaxNo: taxNo,
      DiscPercent: discPercent,
      TotalGross: totalGross,
      TotalDisc: totalDisc,
      DownPayment: downPayment,
      TaxValue: taxValue,
      TaxValueInTaxCur: taxValueInTaxCur,
      TotalNetto: totalNetto,
      TotalCost: totalCost,
      CutPPh: cutPPh,
      PPhPercent: pPhPercent,
      PPhValue: pPhValue,
      Information: information,
      Status: status,
      PrintCounter: printCounter,
      PrintedBy: printedBy,
      PrintedDate: printedDate,
      CreatedBy: createdBy,
      ChangedBy: changedBy,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
