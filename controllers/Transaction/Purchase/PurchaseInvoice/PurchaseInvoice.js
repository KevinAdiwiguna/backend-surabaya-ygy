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
export const getPurchaseInvoiceByCode = async (req, res) => {
  const response = await PurchaseInvoiceH.findOne({
    where: {
      DocNo: req.params.id
    }
  })
  const detail = await PurchaseInvoiceD.findAll({
    where: {
      DocNo: req.params.id
    }
  })
  res.status(200).json({ header: response, detail: detail })
}
export const getPurchaseUpdate = async (req, res) => {
  const response = await GoodReceiptH.findAll({
    where: {
      DocNo: req.params.id
    }
  })
  res.status(200).json(response)
}
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
    await GoodReceiptH.update({
      Status: "INVOICED"
    }, {
      where: {
        DocNo: grDocNo
      }
    }, { transaction: t })


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
export const updatePurchaseInvoice = async (req, res) => {
  const { supplierInvoiceNo, jobOrderNo, termOfPayment, taxStatus, taxPrefix, taxNo, information, cutPPh,
    pphValue, pphPercent, costDistribution, totalNetto, supplierCode, docDate, currency, exchangeRate, taxValue,
    details
  } = req.body


  const t = await db.transaction()

  try {
    const getPeriode = await APBook.findOne({
      where: {
        DocNo: req.params.id
      }
    })
    if (!getPeriode) return res.status(404).json({ msg: "periode tidak ada" })

    const existingH = await PurchaseInvoiceH.findOne({
      where: {
        DocNo: req.params.id
      }
    })

    await PurchaseInvoiceH.update({
      SupplierInvNo: supplierInvoiceNo || existingH.supplierInvoiceNo,
      JODocNo: jobOrderNo || existingH.jobOrderNo,
      TOP: termOfPayment || existingH.termOfPayment,
      TaxStatus: taxStatus || existingH.TaxStatus,
      TaxPrefix: taxPrefix || existingH.taxPrefix,
      TaxNo: taxNo || existingH.taxNo,
      Information: information || existingH.information,
      CutPPh: cutPPh || existingH.cutPPh,
      PPhValue: pphValue || existingH.pphValue,
      PPhPercent: pphPercent || existingH.pphPercent,
      CostDistribution: costDistribution || existingH.costDistribution,

    }, {
      where: {
        DocNo: req.params.id
      }
    }, { transaction: t })

    if (details && Array.isArray(details)) {
      await Promise.all(
        details.map(async (details) => {
          const {
            Price,
            DiscPercent,
            DiscPercent2,
            DiscPercent3,
            DiscValue,
            Cost,
            Netto,
            DiscNominal
          } = details

          await PurchaseInvoiceD.update({
            Price: Price,
            DiscPercent: DiscPercent,
            DiscPercent2: DiscPercent2,
            DiscPercent3: DiscPercent3,
            DiscValue: DiscValue,
            Cost: Cost,
            Netto: Netto,
            DiscNominal: DiscNominal
          }, {
            where: {
              DocNo: req.params.id
            }
          }, { transaction: t })
        })
      )
    }


    if (taxStatus === "Include") {
      if (!taxPrefix) return res.status(400).json({ msg: "taxPrefix harus ada" })
      if (!taxNo) return res.status(400).json({ msg: "taxNo harus ada" })

      const checkTaxNo = await GenerateTaxNo.findOne({
        where: {
          TaxNo: taxNo
        }
      })
      if (checkTaxNo.DocNo) return res.status(400).json({ msg: "taxno sudah digunakan" })
      await APBook.destroy({
        where: {
          DocNo: req.params.id
        }
      })
      await APBook.destroy({
        where: {
          DocNo: req.params.id + "T"
        }
      })


      await APBook.create({
        Periode: getPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: req.params.id,
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
        Periode: getPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: req.params.id + "T",
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
      if (!taxPrefix) return res.status(400).json({ msg: "taxPrefix harus ada" })
      if (!taxNo) return res.status(400).json({ msg: "taxNo harus ada" })

      const checkTaxNo = await GenerateTaxNo.findOne({
        where: {
          TaxNo: taxNo
        }
      })
      if (checkTaxNo.DocNo) return res.status(400).json({ msg: "taxno sudah digunakan" })
      await APBook.destroy({
        where: {
          DocNo: req.params.id
        }
      })
      await APBook.destroy({
        where: {
          DocNo: req.params.id + "T"
        }
      })

      await APBook.create({
        Periode: getPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: req.params.id,
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
        Periode: getPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: req.params.id + "T",
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
      await APBook.destroy({
        where: {
          DocNo: req.params.id
        }
      })
      await APBook.create({
        Periode: getPeriode.Periode,
        SupplierCode: supplierCode,
        TransType: "",
        DocNo: req.parmas.id,
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
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }


}
export const printPurchaseInvoice = async (req, res) => {
  try {
    await PurchaseInvoiceH.update(
      { Status: 'PRINTED' },
      {
        where: {
          DocNo: req.parmas.id
        }
      })
    res.status(201).json({ msg: "success" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }

}
export const deleteInvoice = async (req, res) => {
  try {
    await PurchaseInvoiceH.update(
      { Status: "DELETED" },
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


