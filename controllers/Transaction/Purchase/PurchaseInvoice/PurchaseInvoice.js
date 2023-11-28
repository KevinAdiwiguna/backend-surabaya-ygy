import GoodReceiptH from '../../../../models/Transaction/Purchase/GoodReceiptHeader.js'
import GoodReceiptD from '../../../../models/Transaction/Purchase/GoodReceiptDetail.js'
import PurchaseOrderD from '../../../../models/Transaction/Purchase/PurchaseOrder/PurchaseOrderDetail.js'
import PurchaseInvoiceH from '../../../../models/Transaction/Purchase/PurchaseInvoice/PurchaseInvoiceHeader.js'
import PurchaseInvoiceD from '../../../../models/Transaction/Purchase/PurchaseInvoice/PurchaseInvoiceDetail.js'
import MasterPeriode from '../../../../models/Master/MasterPeriode.js'
import GenerateTaxNo from '../../../../models/Master/MasterGenerateTaxNo.js'
import APBook from '../../../../models/Report/AccountPayable/APBook.js'

import sequelize from "sequelize";
import { Op } from "sequelize";
import db from '../../../../config/Database.js'


export const getAllPurchaseInvoice = async (req, res) => {
  const response = await PurchaseInvoiceH.findAll()
  return res.status(200).json(response)
}

export const goodReceiptStatus = async (req, res) => {
  try {
    const response = await GoodReceiptH.findAll({
      where: {
        Status: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPurchaseDetail = async (req, res) => {
  const Detail = await GoodReceiptD.findAll({
    where: {
      DocNo: req.params.id,
    },
  });


  if (Detail.length <= 0) return res.status(404).json({ msg: "Data Tidak ada" })
  const Header = await GoodReceiptH.findAll({
    where: {
      DocNo: req.params.id,
    },
  });



  if (Header.length <= 0) return res.status(404).json({ msg: "Data Tidak ada" })
  const orderDetail = await PurchaseOrderD.findAll({
    where: {
      DocNo: Header[0].PODocNo,
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

export const getPurchaseUpdate = async (req, res) => {
  const response = await GoodReceiptH.findAll({
    where: {
      DocNo: req.params.id
    }
  })
  res.status(200).json(response)
}

export const printInvoice = async (req, res) => {
  const data = await GoodReceiptH.findOne({
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

    await PurchaseInvoiceH.update(
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

export const getPurchaseh = async (req, res) => {
  try {
    const response = await GoodReceiptH.findAll();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllDataGoodReceipt = async (req, res) => {
  try {
    const header = await GoodReceiptH.findOne({
      where: {
        DocNo: req.params.id,
      },
    });
    const detail = await GoodReceiptD.findAll({
      where: {
        DocNo: header.DocNo,
      },
    });

    return res.status(200).json({ header: header, detail: detail });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPurchase = async (req, res) => {
  const {
    series,
    docDate,
    poDocNo,
    joDocNo,
    trip,
    transactionType,
    grDocNo,
    batchNo,
    supplierCode,
    supplierTaxTo,
    supplierInvNo,
    top,
    currency,
    exchangeRate,
    totalCost,
    costDistribution,
    taxStatus,
    taxPercent,
    taxPrefix,
    taxNo,
    discPercent,
    totalGross,
    totalDisc,
    downPayment,
    taxValue,
    taxValueInTaxCur,
    totalNetto,
    cutPPh,
    pphPercent,
    pphValue,
    information,
    status,
    createdBy,
    changedBy,
    generateDocDate,
    details
  } = req.body;


  const t = await db.transaction();

  try {
    const existingHeader = await PurchaseInvoiceH.findOne({
      attributes: ["DocNo"],
      where: {
        DocNo: {
          [Op.like]: `${series}-${generateDocDate}-%`,
        },
      },
      order: [[sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), "DESC"]],
      raw: true,
      limit: 1,
      transaction: t,
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
        transaction: t,
      });

      if (!response.TaxNo) {
        await t.rollback();
        return res.status(404).json({ msg: "tax no tidak ada" });
      }

      await GenerateTaxNo.update({
        DocNo: DocNo,
      }, {
        where: {
          TaxNo: taxNo
        },
        transaction: t,
      });
    }

    const getMasterPeriode = await MasterPeriode.findOne({
      where: {
        IsClosed: 0,
      },
      transaction: t,
    });

    if (!getMasterPeriode) {
      await t.rollback();
      return res.status(400).json({ msg: "Periode is Closed" });
    }

    await PurchaseInvoiceH.create({
      DocNo,
      Series: series,
      DocDate: docDate,
      PODocNo: poDocNo,
      JODocNo: joDocNo,
      Trip: trip,
      TransactionType: transactionType,
      GRDocNo: grDocNo,
      BatchNo: batchNo,
      SupplierCode: supplierCode,
      SupplierTaxTo: supplierTaxTo,
      SupplierInvNo: supplierInvNo,
      TOP: top,
      Currency: currency,
      ExchangeRate: exchangeRate,
      TotalCost: totalCost,
      CostDistribution: costDistribution,
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
      CutPPh: cutPPh,
      PPhPercent: pphPercent,
      PPhValue: pphValue,
      Information: information,
      Status: status,
      PrintCounter: 0,
      PrintedBy: '',
      CreatedBy: createdBy,
      ChangedBy: changedBy,
    }, {
      transaction: t,
    });

    if (details && Array.isArray(details)) {
      await Promise.all(
        details.map(async (detailItem) => {
          const {
            number,
            materialCode,
            info,
            location,
            unit,
            qty,
            price,
            gross,
            discPercent,
            discPercent2,
            discPercent3,
            discValue,
            discNominal,
            netto,
            cost
          } = detailItem;

          await PurchaseInvoiceD.create({
            DocNo,
            Number: number,
            MaterialCode: materialCode,
            Info: info,
            Location: location,
            Unit: unit,
            Qty: qty,
            Price: price,
            Gross: gross,
            DiscPercent: discPercent,
            DiscPercent2: discPercent2,
            DiscPercent3: discPercent3,
            DiscValue: discValue,
            DiscNominal: discNominal,
            Netto: netto,
            Cost: cost,
          }, {
            transaction: t,
          });
        })
      );
    }

    if (taxStatus === "Include") {
      await APBook.create({
        Periode: getMasterPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: DocNo,
        DocDate: docDate,
        TOP: top,
        DueDate: docDate,
        Currency: currency,
        ExchangeRate: exchangeRate,
        Information: taxStatus === "No" ? "" : taxNo,
        DC: "D",
        DocValue: parseFloat(totalNetto) - parseFloat(taxValue),
        DocValueLocal: parseFloat(totalNetto) - parseFloat(taxValue),
        PaymentValue: 0,
        PaymentValueLocal: 0,
        ExchangeRateDiff: 0,
      })

      await APBook.create({
        Periode: getMasterPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: DocNo + "T",
        DocDate: docDate,
        TOP: top,
        DueDate: docDate,
        Currency: currency,
        ExchangeRate: exchangeRate,
        Information: taxStatus === "No" ? "" : taxNo,
        DC: "D",
        DocValue: taxValue,
        DocValueLocal: taxValue,
        PaymentValue: 0,
        PaymentValueLocal: 0,
        ExchangeRateDiff: 0,
      })
    }


    if (taxStatus === "Exclude") {
      await APBook.create({
        Periode: getMasterPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: DocNo,
        DocDate: docDate,
        TOP: top,
        DueDate: docDate,
        Currency: currency,
        ExchangeRate: exchangeRate,
        Information: taxStatus === "No" ? "" : taxNo,
        DC: "D",
        DocValue: totalNetto,
        DocValueLocal: totalNetto,
        PaymentValue: 0,
        PaymentValueLocal: 0,
        ExchangeRateDiff: 0,
      })
      await APBook.create({
        Periode: getMasterPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: DocNo + "T",
        DocDate: docDate,
        TOP: top,
        DueDate: docDate,
        Currency: currency,
        ExchangeRate: exchangeRate,
        Information: taxStatus === "No" ? "" : taxNo,
        DC: "D",
        DocValue: taxValue,
        DocValueLocal: taxValue,
        PaymentValue: 0,
        PaymentValueLocal: 0,
        ExchangeRateDiff: 0,
      })
    }


    if (taxStatus === "No") {
      await APBook.create({
        Periode: getMasterPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: DocNo,
        DocDate: docDate,
        TOP: top,
        DueDate: docDate,
        Currency: currency,
        ExchangeRate: exchangeRate,
        Information: taxStatus === "No" ? "" : taxNo,
        DC: "D",
        DocValue: totalNetto,
        DocValueLocal: totalNetto,
        PaymentValue: 0,
        PaymentValueLocal: 0,
        ExchangeRateDiff: 0,
      }, {
        transaction: t,
      });
    }

    await GoodReceiptH.update(
      {
        Status: "INVOICED",
      },
      {
        where: {
          DocNo: poDocNo,
        },
        transaction: t,
      });

    await t.commit();
    return res.status(200).json({ msg: "berhasil create" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ msg: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    await PurchaseInvoiceH.update(
      { Status: "INVOICED" },
      {
        where: {
          DocNo: req.params.id
        }
      }
    )
    res.status(201).json({ msg: "delete" })
  } catch (error) {
    res.status(201).json({ msg: error.message })
  }

}


