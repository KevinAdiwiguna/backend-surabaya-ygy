import goodsReceiptH from "../../../models/Transaction/Purchase/GoodReceiptHeader.js";
import goodsReceiptDetails from "../../../models/Transaction/Purchase/GoodReceiptDetail.js";
import purchaseOrderH from "../../../models/Transaction/Purchase/PurchaseOrder/PurchaseOrderHeader.js";
import purchaseOrderd from "../../../models/Transaction/Purchase/PurchaseOrder/PurchaseOrderDetail.js";
import sequelize from "sequelize";
import { Op } from "sequelize";
import goodreceiptD from "../../../models/Transaction/Purchase/GoodReceiptDetail.js";

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
        const getPurchaseOrderNo = await purchaseOrderH.findOne({
            where: {
                DocNo: req.params.id
            },
            attributes: ['DocNo']
        });

        const getDetailPurchaseOrderNo = await purchaseOrderd.findAll({
            where: {
                DocNo: getPurchaseOrderNo.DocNo
            }
        });

        const modifiedResponse = getDetailPurchaseOrderNo.map(item => {
            return {
                DocNo: item.DocNo,
                Number: item.Number,
                MaterialCode: item.MaterialCode,
                Info: item.Info,
                Unit: item.Unit,
                QtyPOTotal: item.Qty,
                Price: item.Price,
                QtyRemain: parseFloat(item.Qty) - parseFloat(item.QtyReceived)
            };
        });

        res.status(200).json(modifiedResponse);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const getUpdateGoodsReceipt = async (req, res) => {
    try {
        const getHeaderGoodsReceipt = await goodsReceiptH.findOne({
            where: {
                DocNo: req.params.id
            }, attributes: ["PODocNo"]
        });

        const getDetailGoodsReceipt = await goodsReceiptDetails.findAll({
            where: {
                DocNo: req.params.id
            }
        });

        const getTotalQty = await purchaseOrderd.findAll({
            where: {
                DocNo: getHeaderGoodsReceipt.PODocNo
            }, attributes: ['QtyReceived', 'Qty', 'DocNo', 'Number']
        });

        const combinedData = getDetailGoodsReceipt.map(detail => {
            const correspondingTotalQty = getTotalQty.find(total => total.dataValues.Number === detail.dataValues.Number);
            const QtyRemain = parseFloat(correspondingTotalQty.dataValues.Qty) - parseFloat(correspondingTotalQty.dataValues.QtyReceived) + parseFloat(detail.dataValues.Qty);

            return {
                ...detail.dataValues,
                QtyTotal: correspondingTotalQty.dataValues.Qty,
                QtyRemain: QtyRemain.toFixed(4)
            };
        });

        return res.json(combinedData);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
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
    try {
        const {
            details,
            batchNo,
            supplierDlvDocNo,
            vehicleNo,
            information,
            status,
            changedBy,
        } = req.body;

        const updGoodReceiptH = await goodsReceiptH.findOne({
            where: {
                DocNo: req.params.id,
            },
        });
        if (!updGoodReceiptH)
            return res.status(400).json({ msg: "data tidak ditemukan" });

        if (details && Array.isArray(details)) {
            await Promise.all(
                details.map(async (detail) => {
                    const {
                        number,
                        materialCode,
                        info,
                        location,
                        unit,
                        qty
                    } = detail;

                    await goodsReceiptDetails.create({
                        Number: number,
                        MaterialCode: materialCode,
                        Info: info,
                        Location: location,
                        Unit: unit,
                        Qty: qty
                    });
                })
            );
        }

        await goodsReceiptH.update(
            {
                BatchNo: batchNo || updGoodReceiptH.BatchNO,
                SupplierDlvDocNo: supplierDlvDocNo || updGoodReceiptH.SupplierDlvDocNo,
                VehicleNo: vehicleNo || updGoodReceiptH.VehicleNo,
                Information: information || updGoodReceiptH.Information,
                Status: status || updGoodReceiptH.Status,
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
        information,
        status,
        printCounter,
        printedBy,
        printedDate,
        createdBy,
        changedBy,
        GoodReceiptd } = req.body;

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
            const Series = parseInt(existingHeader.DocNo.split('-')[2], 10) + 1;
            DocNo = `${series}-${generateDocDate}-${Series.toString().padStart(4, '0')}`;
        } else {
            DocNo = `${series}-${generateDocDate}-0001`;
        }

        const batchNo = DocNo.split("-")

        await goodsReceiptH.create({
            DocNo: DocNo,
            Series: series,
            DocDate: docDate,
            SupplierCode: supplierCode,
            PODocNo: PODocNo,
            SupplierDlvDocNo: supplierDlvDocNo,
            VehicleNo: vehicleNo,
            BatchNo: `${batchNo[1]}${batchNo[2]}`,
            Information: information,
            PrintCounter: printCounter,
            PrintedBy: printedBy,
            PrintedDate: printedDate,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });

        if (GoodReceiptd && Array.isArray(GoodReceiptd)) {
            await Promise.all(
                GoodReceiptd.map(async (detail) => {
                    const { Number, MaterialCode, Info, Location, Unit, Qty } = detail;

                    const getPurchaseOrdedQty = await purchaseOrderd.findOne({
                        where: {
                            DocNo: PODocNo,
                            Number: Number
                        },
                    })

                    await goodsReceiptDetails.create({
                        DocNo: DocNo,
                        Number: Number,
                        MaterialCode: MaterialCode,
                        Info: Info,
                        Location: Location,
                        Unit: Unit,
                        Qty: Qty,
                    });
                    await purchaseOrderd.update(
                        { QtyReceived: parseFloat(getPurchaseOrdedQty.QtyReceived) + Qty },
                        {
                            where: {
                                DocNo: PODocNo,
                                Number: Number
                            }
                        })
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
                msg: error.message
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
