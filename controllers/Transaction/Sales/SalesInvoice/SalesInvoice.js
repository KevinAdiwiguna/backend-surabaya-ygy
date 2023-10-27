import goodsissue from "../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js";
import salesInvoiceh from "../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceH.js";
import salesInvoiced from "../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceD.js";
import goodsIssued from "../../../../models/Transaction/Sales/GoodIssue/GoodIssued.js";
import salesOrderd from "../../../../models/Transaction/Sales/SalesOrder/SalesOrderDetail.js";
import GenerateTaxNo from '../../../../models/Master/MasterGenerateTaxNo.js'
import ARBook from "../../../../models/Report/AccountReceivable/ARBook.js";
import MasterPeriode from '../../../../models/Master/MasterPeriode.js'

import sequelize from "sequelize";
import { Op } from "sequelize";

import GoodIssueh from "../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js";

export const getSalesInvoiceUpdate = async (req, res) => {
  const response = await salesInvoiced.findAll({
    where: {
      DocNo: req.params.id
    }
  })
  res.status(200).json(response)
}

export const getSaleInvoiceD = async (req, res) => {
  const Detail = await goodsIssued.findAll({
    where: {
      DocNo: req.params.id,
    },
  });
  if (Detail.length <= 0) return res.status(404).json({ msg: "Data Tidak ada" })
  const Header = await goodsissue.findAll({
    where: {
      DocNo: req.params.id,
    },
  });

  if (Header.length <= 0) return res.status(404).json({ msg: "Data Tidak ada" })
  const orderDetail = await salesOrderd.findAll({
    where: {
      DocNo: Header[0].SODocNo,
    },
  });

  const goodsissues = [];

  for (const detailItem of Detail) {
    const goodsissue = {
      Number: detailItem.Number,
      Code: detailItem.MaterialCode,
      Name: detailItem.Name,
      Info: detailItem.Info,
      Location: detailItem.Location,
      BatchNo: detailItem.BatchNo,
      Unit: detailItem.Unit,
      Qty: detailItem.Qty,
    };
    goodsissues.push(goodsissue);
  }

  const goodsissuesMap = new Map();

  for (const goodsissue of goodsissues) {
    goodsissuesMap.set(goodsissue.Number, goodsissue);
  }

  const combinedData = [];

  for (const salesOrder of orderDetail) {
    const goodsissue = goodsissuesMap.get(salesOrder.Number);
    if (goodsissue) {
      const gross = salesOrder.Price * goodsissue.Qty;

      let netto;
      let discNominal;
      if (salesOrder?.DiscPercent || salesOrder?.DiscPercent2 || salesOrder?.DiscPercent3) {
        const disc = goodsissue.Qty * salesOrder.Price - (goodsissue.Qty * salesOrder.Price * salesOrder.DiscPercent) / 100;
        const disc2 = disc - (disc * salesOrder.DiscPercent2) / 100;
        const disc3 = disc2 - (disc2 * salesOrder.DiscPercent3) / 100;
        netto = disc3;
        discNominal = (goodsissue.Qty * salesOrder.Price * salesOrder.DiscPercent) / 100 + (disc * salesOrder.DiscPercent2) / 100 + (disc2 * salesOrder.DiscPercent3) / 100;
      }
      const combinedItem = {
        ...goodsissue,
        Price: salesOrder.Price,
        DiscPercent: salesOrder.DiscPercent,
        DiscPercent2: salesOrder.DiscPercent2,
        DiscPercent3: salesOrder.DiscPercent3,
        DiscValue: salesOrder.DiscValue,
        DiscNominal: discNominal,
        Gross: gross,
        Netto: netto,
      };
      combinedData.push(combinedItem);
    }
  }

  res.json(combinedData);
};

export const goodsissueStatus = async (req, res) => {
  try {
    const response = await goodsissue.findAll({
      where: {
        Status: req.params.id,
      },
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
  const {
    generateDocDate, series, docDate, sODocNo, giDocNo, poNo, customerCode, taxToCode, salesCode, top, currency,
    exchangeRate, taxStatus, taxPercent, taxPrefix, taxNo, discPercent, totalGross, totalDisc, downPayment, taxValue,
    taxValueInTaxCur, totalNetto, totalCost, cutPPh, pPhPercent, pPhValue, information, status, printCounter, printedBy, printedDate, createdBy, changedBy, detail
  } = req.body;

  try {
    const existingHeader = await salesInvoiceh.findOne({
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

    if (taxStatus !== "No") {
      const response = await GenerateTaxNo.findOne({
        where: {
          TaxNo: taxNo,
        },
      });

      if (!response || !response.TaxNo) {
        throw new Error("Tax number not found");
      }

      await GenerateTaxNo.update({
        DocNo: DocNo,
      }, {
        where: {
          TaxNo: taxNo,
        }
      });
    }

    const getMasterPeriode = await MasterPeriode.findOne({
      where: {
        IsClosed: 0,
      },
    });

    if (!getMasterPeriode) {
      throw new Error("Periode is Closed");
    }

    await salesInvoiceh.create({
      DocNo: DocNo,
      Series: series,
      DocDate: docDate,
      SODocNo: sODocNo,
      GIDocNo: giDocNo,
      PONo: poNo,
      CustomerCode: customerCode,
      TaxToCode: taxToCode,
      SalesCode: salesCode,
      TOP: top,
      Currency: currency,
      ExchangeRate: exchangeRate,
      TaxStatus: taxStatus,
      TaxPercent: taxPercent,
      TaxPrefix: taxStatus === "No" ? "" : taxPrefix,
      TaxNo: taxStatus === "No" ? "" : taxNo,
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
        detail.map(async (detailItem) => {
          const {
            Number,
            MaterialCode,
            Info,
            Location,
            BatchNo,
            Unit,
            Qty,
            Price,
            Gross,
            DiscPercent,
            DiscPercent2,
            DiscPercent3,
            DiscValue,
            DiscNominal,
            Netto,
            Cost
          } = detailItem;
          await salesInvoiced.create({
            DocNo: DocNo,
            Number: Number,
            MaterialCode: MaterialCode,
            Info: Info,
            Location: Location,
            BatchNo: BatchNo,
            Unit: Unit,
            Qty: Qty,
            Price: Price,
            Gross: Gross,
            DiscPercent: DiscPercent,
            DiscPercent2: DiscPercent2,
            DiscPercent3: DiscPercent3,
            DiscValue: DiscValue,
            DiscNominal: DiscNominal,
            Netto: Netto,
            Cost: Cost,
          });

          if (taxStatus !== "No") {
            if (taxStatus === "Include") {
              await ARBook.create({
                Periode: getMasterPeriode.Periode,
                CustomerCode: customerCode,
                TransType: "",
                DocNo: DocNo,
                DocDate: docDate,
                TOP: top,
                DueDate: docDate,
                Currency: currency,
                ExchangeRate: exchangeRate,
                Information: taxStatus === "No" ? "" : taxNo,
                DC: "C",
                DocValue: totalNetto - taxValue,
                DocValueLocal: totalNetto - taxValue,
                PaymentValue: 0,
                PaymentValueLocal: 0,
                ExchangeRateDiff: 0,
              });
              await ARBook.create({
                Periode: getMasterPeriode.Periode,
                CustomerCode: customerCode,
                TransType: "",
                DocNo: DocNo + "T",
                DocDate: docDate,
                TOP: top,
                DueDate: docDate,
                Currency: currency,
                ExchangeRate: exchangeRate,
                Information: taxStatus === "No" ? "" : taxNo,
                DC: "C",
                DocValue: taxValue,
                DocValueLocal: taxValue,
                PaymentValue: 0,
                PaymentValueLocal: 0,
                ExchangeRateDiff: 0,
              });
            } else if (taxStatus === "Exclude") {
              await ARBook.create({
                Periode: getMasterPeriode.Periode,
                CustomerCode: customerCode,
                TransType: "",
                DocNo: DocNo,
                DocDate: docDate,
                TOP: top,
                DueDate: docDate,
                Currency: currency,
                ExchangeRate: exchangeRate,
                Information: taxStatus === "No" ? "" : taxNo,
                DC: "C",
                DocValue: totalNetto,
                DocValueLocal: totalNetto,
                PaymentValue: 0,
                PaymentValueLocal: 0,
                ExchangeRateDiff: 0,
              });
              await ARBook.create({
                Periode: getMasterPeriode.Periode,
                CustomerCode: customerCode,
                TransType: "",
                DocNo: DocNo + "T",
                DocDate: docDate,
                TOP: top,
                DueDate: docDate,
                Currency: currency,
                ExchangeRate: exchangeRate,
                Information: taxStatus === "No" ? "" : taxNo,
                DC: "C",
                DocValue: taxValue,
                DocValueLocal: taxValue,
                PaymentValue: 0,
                PaymentValueLocal: 0,
                ExchangeRateDiff: 0,
              });
            }
          } else {
            await ARBook.create({
              Periode: getMasterPeriode.Periode,
              CustomerCode: customerCode,
              TransType: "",
              DocNo: DocNo,
              DocDate: docDate,
              TOP: top,
              DueDate: docDate,
              Currency: currency,
              ExchangeRate: exchangeRate,
              Information: taxStatus === "No" ? "" : taxNo,
              DC: "C",
              DocValue: totalNetto,
              DocValueLocal: totalNetto,
              PaymentValue: 0,
              PaymentValueLocal: 0,
              ExchangeRateDiff: 0,
            });
          }
        })
      );
    } else {
      await ARBook.create({
        Periode: getMasterPeriode.Periode,
        CustomerCode: customerCode,
        TransType: "",
        DocNo: DocNo,
        DocDate: docDate,
        TOP: top,
        DueDate: docDate,
        Currency: currency,
        ExchangeRate: exchangeRate,
        Information: taxStatus === "No" ? "" : taxNo,
        DC: "C",
        DocValue: totalGross - totalNetto,
        DocValueLocal: totalGross - totalNetto,
        PaymentValue: 0,
        PaymentValueLocal: 0,
        ExchangeRateDiff: 0,
      });
    }

    await GoodIssueh.update(
      {
        Status: "INVOICED",
      },
      {
        where: {
          DocNo: giDocNo,
        },
      });

    return res.status(200).json({ msg: "berhasil create" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
}



export const getSalesInvoiceh = async (req, res) => {
  try {
    const response = await salesInvoiceh.findAll();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getAllDataSalesInvoice = async (req, res) => {
  try {
    const header = await salesInvoiceh.findOne({
      where: {
        DocNo: req.params.id,
      },
    });
    const detail = await salesInvoiced.findAll({
      where: {
        DocNo: header.DocNo,
      },
    });

    return res.status(200).json({ header: header, detail: detail });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
