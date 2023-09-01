import goodsissue from "../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js";
import salesInvoiceh from "../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceH.js";
import salesInvoiced from "../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceD.js";
import salesInvoicepd from "../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceDP.js";
import TaxNo from "../../../../models/Master/MasterGenerateTaxNo.js";

export const goodsissueStatus = async (req, res) => {
  try {
    const response = await goodsissue.findAll({
      where: {
        Status: req.params.id,
      },
      attributes: ["Status"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const printInvoice = async (req, res) => {
  const data = await salesInvoiceh.findOne({
    where: {
      DocNo: req.params.id,
    },
  });
  if (!data) return res.status(404).json({ msg: "data tidak ada" });

  let count;
  try {
    if (data.PrintCounter < 1 || data.PrintCounter == undefined) {
      count = 1;
    } else {
      count = data.PrintCounter + 1;
    }

    await salesInvoiceh.update(
      {
        Status: "PRINTED",
        PrintCounter: count,
      },
      {
        where: {
          DocNo: req.params.id,
        },
      }
    );

    res.status(200).json({ msg: "printed" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSalesinvoice = async (req, res) => {
  const { docNo, series, docDate, sODocNo, gIDocNo, pONo, customerCode, taxToCode, salesCode, top, currency, exchangeRate, taxStatus, taxPercent, taxPrefix, taxNo, discPercent, totalGross, totalDisc, downPayment, taxValue, taxValueInTaxCur, totalNetto, totalCost, cutPPh, pPhPercent, pPhValue, information, status, printCounter, printedBy, printedDate, createdBy, changedBy, detail } = req.body;

  const response = await TaxNo.findOne({
    where: {
      TaxNo: taxNo,
    },
  });

  try {
    if (!response) return res.status(404).json({ msg: "tax no tidak ada" });

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
      TOP: top,
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

    if (detail && Array.isArray(detail)) {
      await Promise.all(
        detail.map(async (detail) => {
          const { docNod, numberd, materialCoded, infod, locationd, batchNod, unitd, qtyd, priced, grossd, discPercentd, discPercent2d, discPercent3d, discValued, discNominald, nettod, costd } = detail;
          try {
            await salesInvoiced.create({
              DocNo: docNod,
              Number: numberd,
              MaterialCode: materialCoded,
              Info: infod,
              Location: locationd,
              BatchNo: batchNod,
              Unit: unitd,
              Qty: qtyd,
              Price: priced,
              Gross: grossd,
              DiscPercent: discPercentd,
              DiscPercent2: discPercent2d,
              DiscPercent3: discPercent3d,
              DiscValue: discValued,
              DiscNominal: discNominald,
              Netto: nettod,
              Cost: costd,
            });
          } catch (error) {
            console.error("Error while saving salesInvoice detail:", error);
          }
        })
      );
    }

    res.status(200).json({ msg: "berhasil create" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
