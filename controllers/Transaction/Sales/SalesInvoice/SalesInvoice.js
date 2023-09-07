import goodsissue from "../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js";
import salesInvoiceh from "../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceH.js";
import salesInvoiced from "../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceD.js";
import goodsIssued from "../../../../models/Transaction/Sales/GoodIssue/GoodIssued.js";
import salesOrderd from "../../../../models/Transaction/Sales/SalesOrder/SalesOrderDetail.js";
import salesInvoicepd from "../../../../models/Transaction/Sales/SalesInvoice/SalesInvoiceDP.js";
import TaxNo from "../../../../models/Master/MasterGenerateTaxNo.js";

import sequelize from "sequelize";
import { Op } from "sequelize";

export const getSaleInvoiceD = async (req, res) => {
  const Detail = await goodsIssued.findAll({
    where: {
      DocNo: req.params.id,
    },
  });
  const Header = await goodsissue.findAll({
    where: {
      DocNo: req.params.id,
    },
  });

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
      const combinedItem = {
        ...goodsissue,
        Price: salesOrder.Price,
        DiscPercent: salesOrder.DiscPercent,
        DiscValue: salesOrder.DiscValue,
        DiscNominal: salesOrder.DiscNominal,
      };
      combinedData.push(combinedItem);
    }
  }

  res.json(combinedData);
};

//   salesorder
//   price
//   discPercent
//   discPercent2
//   discPercent3
//   discvalue
//   discnominal
// })

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
  const { generateDocDate, series, docDate, sODocNo, giDocNo, poNo, customerCode, taxToCode, salesCode, top, currency, exchangeRate, taxStatus, taxPercent, taxPrefix, taxNo, discPercent, totalGross, totalDisc, downPayment, taxValue, taxValueInTaxCur, totalNetto, totalCost, cutPPh, pPhPercent, pPhValue, information, status, printCounter, printedBy, printedDate, createdBy, changedBy, detail } = req.body;

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

    const response = await TaxNo.findOne({
      where: {
        TaxNO: taxNo,
      },
    });
    if (!response.TaxNo) return res.status(404).json({ msg: "tax no tidak ada" });

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
        detail.map(async (detailItem) => {
          const { numberd, materialCoded, infod, locationd, batchNod, unitd, qtyd, priced, grossd, discPercentd, discPercent2d, discPercent3d, discValued, discNominald, nettod, costd } = detailItem;
          try {
            await salesInvoiced.create({
              DocNo: DocNo,
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
            res.status(500).json({ msg: error.message });
          }
        })
      );
    }

    res.status(200).json({ msg: "berhasil create" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSalesInvoiceh = async (req, res) => {
  try {
    const response = await salesInvoiceh.findAll({
      attributes: ["DocNo"],
    });
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
