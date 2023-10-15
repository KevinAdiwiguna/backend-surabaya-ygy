import goodsReceiptH from "../../../models/Transaction/Purchase/GoodReceiptHeader.js";
import goodsReceiptDetails from "../../../models/Transaction/Purchase/GoodReceiptDetail.js";
import purchaseOrderH from "../../../models/Transaction/Purchase/PurchaseOrder/PurchaseOrderHeader.js";
import jobOrder from "../../../models/Transaction/Production/JobOrder.js";
import salesOrderD from "../../../models/Transaction/Sales/SalesOrder/SalesOrderDetail.js";
import purchaseOrderd from "../../../models/Transaction/Purchase/PurchaseOrder/PurchaseOrderDetail.js";
import sequelize from "sequelize";
import { Op } from "sequelize";

export const getAllgoodReceipt = async (req, res) => {
  try {
    const goodreceiptH = await goodsReceiptH.findAll();
    res.status(200).json(goodreceiptH);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getGoodReceiptDetail = async (req, res) => {
  try {
    const getPurchaseOrder = await purchaseOrderH.findOne({
      where: {
        DocNo: req.params.id,
      },
      attributes: ["JODocNo"],
    });

    const getJobOrder = await jobOrder.findOne({
      where: {
        DocNo: getPurchaseOrder.JODocNo,
      },
      attributes: ["SODocNo"],
    });

    const getSalesOrder = await salesOrderD.findAll({
      where: {
        DocNo: getJobOrder.SODocNo,
      },
      attributes: ["DocNo", "Number", "Qty"],
    });

    const getPurchaseOrderd = await purchaseOrderd.findAll({
      where: {
        DocNo: req.params.id,
      },
      attributes: ["DocNo", "Number", "Unit", "MaterialCode"],
    });

    const mergedPurchaseOrderd = getPurchaseOrderd.map((purchaseOrder) => {
      const matchingSalesOrder = getSalesOrder.find(
        (salesOrder) => salesOrder.Number === purchaseOrder.Number
      );
      if (matchingSalesOrder) {
        purchaseOrder.Qty = matchingSalesOrder.Qty;
      }
      return purchaseOrder;
    });

    const materialCodes = mergedPurchaseOrderd.map((item) => item.MaterialCode);
    const units = mergedPurchaseOrderd.map((item) => item.Unit);

    const getGoodReceiptDetail = await goodsReceiptDetails.findAll({
      where: {
        MaterialCode: {
          [Op.in]: materialCodes,
        },
        Unit: {
          [Op.in]: units,
        },
      },
    });

    const uniqueNumbers = [
      ...new Set(getGoodReceiptDetail.map((item) => item.Number)),
    ];

    const combinedData = {};

    uniqueNumbers.forEach((number) => {
      const itemsWithSameNumber = getGoodReceiptDetail.filter(
        (item) => item.Number === number
      );

      const totalQty = itemsWithSameNumber.reduce(
        (acc, item) => acc + parseFloat(item.Qty),
        0
      );

      const matchingPurchaseOrder = mergedPurchaseOrderd.find(
        (purchaseOrder) => purchaseOrder.Number === number
      );
      let QtyPOTotal = "0.0000";
      if (matchingPurchaseOrder) {
        QtyPOTotal = matchingPurchaseOrder?.Qty;
      }

      combinedData[number] = {
        DocNo: itemsWithSameNumber[0].DocNo,
        Number: number,
        MaterialCode: itemsWithSameNumber[0].MaterialCode,
        Info: itemsWithSameNumber[0].Info,
        Location: itemsWithSameNumber[0].Location,
        Unit: itemsWithSameNumber[0].Unit,
        QtyPOTotal: QtyPOTotal,
        QtyPORemain: QtyPOTotal - totalQty,
      };
    });

    const response = Object.values(combinedData);

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getgoodReceiptByCode = async (req, res) => {
  const getGoodReceiptH = await goodsReceiptH.findOne({
    where: {
      DocNo: req.params.id,
    },
  });
  if (!getGoodReceiptH)
    return res.status(400).json({ msg: "data tidak ditemukan" });
  try {
    res.status(200).json(getGoodReceiptH);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateGoodReceiptH = async (req, res) => {
  const {
    docNo,
    series,
    docDate,
    supplierCode,
    PODocNo,
    batchNo,
    supplierDlvDocNo,
    vehicleNo,
    information,
    printCounter,
    printedBy,
    printedDate,
    status,
    createdBy,
    changedBy,
  } = req.body;

  const updGoodReceiptH = await goodsReceiptH.findOne({
    where: {
      DocNo: req.params.id,
    },
  });
  if (!updGoodReceiptH)
    return res.status(400).json({ msg: "data tidak ditemukan" });
  try {
    await goodsReceiptH.update(
      {
        DocNo: docNo || updGoodReceiptH.DocNo,
        Series: series || updGoodReceiptH.Series,
        DocDate: docDate || updGoodReceiptH.DocDate,
        SupplierCode: supplierCode || updGoodReceiptH.SupplierCode,
        PODocNo: PODocNo || updGoodReceiptH.PODocNo,
        BatchNo: batchNo || updGoodReceiptH.BatchNO,
        SupplierDlvDocNo: supplierDlvDocNo || updGoodReceiptH.SupplierDlvDocNo,
        VehicleNo: vehicleNo || updGoodReceiptH.VehicleNo,
        Information: information || updGoodReceiptH.Information,
        PrintCounter: printCounter || updGoodReceiptH.PrintCounter,
        PrintedBy: printedBy || updGoodReceiptH.PrintedBy,
        PrintedDate: printedDate || updGoodReceiptH.PrintedDate,
        Status: status || updGoodReceiptH.Status,
        CreatedBy: createdBy || updGoodReceiptH.CreatedBy,
        ChangedBy: changedBy || updGoodReceiptH.ChangedBy,
      },
      {
        where: {
          DocNo: updGoodReceiptH.DocNo,
        },
      }
    );
    res.status(200).json({ msg: "update berhasiil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPurchaseCostH = async (req, res) => {
  const {
    generateDocDate,
    series,
    docDate,
    supplierCode,
    PODocNo,
    supplierDlvDocNo,
    vehicleNo,
    batchNo,
    information,
    status,
    printCounter,
    printedBy,
    printedDate,
    createdBy,
    changedBy,
    GoodReceiptd,
  } = req.body;

  try {
    const existingHeader = await goodsReceiptH.findOne({
      attributes: ["DocNo"],
      where: {
        DocNo: {
          [Op.like]: `${series}-${generateDocDate}-%`,
        },
      },
      order: [
        [
          sequelize.literal(
            "CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"
          ),
          "DESC",
        ],
      ],
      raw: true,
      limit: 1,
    });

    let DocNo;
    if (existingHeader) {
      const Series = parseInt(existingHeader.DocNo.split("-")[2], 10) + 1;
      DocNo = `${series}-${generateDocDate}-${Series.toString().padStart(
        4,
        "0"
      )}`;
    } else {
      DocNo = `${series}-${generateDocDate}-0001`;
    }

    let BatchNo;
    if (existingHeader) {
      const lastDocNo = existingHeader.DocNo;
      const lastNumber = parseInt(lastDocNo.split("-")[2], 10);
      const nextNumber = lastNumber + 1;
      BatchNo = `${generateDocDate}${nextNumber.toString().padStart(4, "0")}`;
    } else {
      BatchNo = `${generateDocDate}0001`;
    }

    await goodsReceiptH.create({
      DocNo: DocNo,
      Series: series,
      DocDate: docDate,
      SupplierCode: supplierCode,
      PODocNo: PODocNo,
      SupplierDlvDocNo: supplierDlvDocNo,
      VehicleNo: vehicleNo,
      BatchNo: BatchNo,
      Information: information,
      PrintCounter: printCounter,
      PrintedBy: printedBy,
      PrintedDate: printedDate,
      Status: status,
      CreatedBy: createdBy,
      ChangedBy: changedBy,
    });

    if (GoodReceiptd && Array.isArray(GoodReceiptd)) {
      await Promise.all(
        GoodReceiptd.map(async (detail) => {
          const { number, materialCode, info, location, unit, qty } = detail;

          await goodsReceiptDetails.create({
            DocNo: DocNo,
            Number: number,
            MaterialCode: materialCode,
            Info: info,
            Location: location,
            Unit: unit,
            Qty: qty,
          });
        })
      );
    }

    const responseObject = {
      DocNo: DocNo,
      Series: series,
      DocDate: docDate,
      SupplierCode: supplierCode,
      PODocNo: PODocNo,
      SupplierDlvDocNo: supplierDlvDocNo,
      VehicleNo: vehicleNo,
      BatchNo: batchNo,
      Information: information,
      PrintCounter: printCounter,
      PrintedBy: printedBy,
      PrintedDate: printedDate,
      Status: status,
      CreatedBy: createdBy,
      ChangedBy: changedBy,
      GoodReceiptd: GoodReceiptd,
    };

    res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        msg: "Failed to create Sales Order Header",
        error: error.message,
      });
  }
};

export const deleteGoodReceiptH = async (req, res) => {
  try {
    const delgoodreceipth = await goodsReceiptH.findOne({
      where: {
        DocNo: req.params.id,
      },
    });
    if (!delgoodreceipth)
      return res.status(400).json({ msg: "data tidak ditemukan" });

    await goodsReceiptH.update(
      { Status: "DELETED" },
      {
        where: {
          DocNo: delgoodreceipth.DocNo,
        },
      }
    );
    res.status(200).json({ msg: "data Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
