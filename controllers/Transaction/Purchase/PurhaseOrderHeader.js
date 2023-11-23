// import purchaseOrderHeader from '../../../../models/Transaction/Purchase/PurchaseOrderHeader.js'
import purchaseOrderHeader from '../../../models/Transaction/Purchase/PurchaseOrder/PurchaseOrderHeader.js'
import purchaseOrderDetails from '../../../models/Transaction/Purchase/PurchaseOrder/PurchaseOrderDetail.js'
import masterApproval from '../../../models/Master/MasterApproval.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'
import db from '../../../config/Database.js'


export const approvePurchaseOrder = async (req, res) => {
    try {
        const getMasterApproval = await masterApproval.findOne({
            where: {
                Series: req.params.id2
            }
        })
        const regexPattern = new RegExp(`<${req.params.id5}>`);

        if (!getMasterApproval) return res.status(403).json({ msg: 'harap membuat approval dulu di master approval' })
        if (Math.floor(getMasterApproval.MinValue) > req.params.id3) return res.status(400).json({ msg: "value tidak beleh kurang dari MinValue" })
        if (Math.floor(getMasterApproval.MaxValue) < req.params.id4) return res.status(400).json({ msg: "value tidak boleh lebih dari MaxValue" })
        if (!regexPattern.test(getMasterApproval.Users)) return res.status(404).json({ msg: "user anda tidak terdaftar dalam approval" })

        await purchaseOrderHeader.update(
            { Status: "APROVED" },
            {
                where: {
                    DocNo: req.params.id1
                }
            })
        res.status(200).json({ msg: "APPROVED" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
export const getAllpurchaseOrderHeader = async (req, res) => {
    try {
        const purchaseOrderH = await purchaseOrderHeader.findAll()
        res.status(200).json(purchaseOrderH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
export const getPurchaseRequestByCode = async (req, res) => {
    const getPurchaseOrderH = await purchaseOrderHeader.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!getPurchaseOrderH) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getPurchaseOrderH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
export const getPurchaseOrderByPrinted = async (req, res) => {
    const getPurchaseOrderH = await purchaseOrderHeader.findAll({
        where: {
            Status: 'PRINTED'
        }
    })
    if (!getPurchaseOrderH) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getPurchaseOrderH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
export const printInvoice = async (req, res) => {
    const data = await purchaseOrderHeader.findOne({
        where: {
            DocNo: req.params.id,
        },
    });
    if (!data) return res.status(404).json({ msg: "data tidak ada" });
    if (!data.Status !== "APPROVED") return res.status(403).json({ msg: "data harus di approve terlebih dahulu" })

    let count;
    try {
        if (data.PrintCounter < 1 || data.PrintCounter == undefined) {
            count = 1;
        } else {
            count = data.PrintCounter + 1;
        }

        await purchaseOrderHeader.update(
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
export const updatePurchaseRequest = async (req, res) => {
    const t = await db.transaction();
    try {
        const { details, transactionType, docDate, supplierCode, deliveryDate, TOP, discPercent, taxStatus, taxPercent, currency, exchangeRate, JODocNo, trip, SIDocNo, totalGross, totalDisc, taxValue, totalNetto, sendTo, information, status, isApproved, approvedBy, approvedDate, printCounter, printedBy, printedDate, isSalesReturn, createdBy, changedBy } = req.body
        const updPurchaseOrderH = await purchaseOrderHeader.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!updPurchaseOrderH) return res.status(400).json({ msg: "data tidak ditemukan" })
        if (updPurchaseOrderH.Status == "PRINTED") return res.json(400).json({ msg: "cannot update in status printed" })
        if (details && Array.isArray(details)) {
            await Promise.all(

                details.map(async (details) => {
                    const {
                        MaterialCode,
                        Info,
                        Unit,
                        Qty,
                        Price,
                        DiscPercent,
                        DiscPercent2,
                        DiscPercent3,
                        DiscValue,
                        QtyReceived,
                        Number,
                        Gross,
                        Netto
                    } = details;

                    await purchaseOrderDetails.update({
                        MaterialCode: MaterialCode,
                        Info: Info,
                        Unit: Unit,
                        Qty: Qty,
                        Price: Price,
                        DiscPercent: DiscPercent,
                        DiscPercent2: DiscPercent2,
                        DiscPercent3: DiscPercent3,
                        DiscValue: DiscValue,
                        QtyReceived: QtyReceived,
                        Gross: Gross,
                        Netto: Netto
                    }, {
                        where: {
                            DocNo: req.params.id,
                            Number: Number
                        }
                    }, { transaction: t });
                })
            );
        }


        await purchaseOrderHeader.update({
            TransactionType: transactionType || updPurchaseOrderH.TransactionType,
            DocDate: docDate || updPurchaseOrderH.DocDate,
            SupplierCode: supplierCode || updPurchaseOrderH.SupplierCode,
            DeliveryDate: deliveryDate || updPurchaseOrderH.DeliveryDate,
            TOP: TOP || updPurchaseOrderH.TOP,
            DiscPercent: discPercent || updPurchaseOrderH.DiscPercent,
            TaxStatus: taxStatus || updPurchaseOrderH.TaxStatus,
            TaxPercent: taxPercent || updPurchaseOrderH.TaxPercent,
            Currency: currency || updPurchaseOrderH.Currency,
            ExchangeRate: exchangeRate || updPurchaseOrderH.ExchangeRate,
            JODocNo: JODocNo || updPurchaseOrderH.JODocNo,
            Trip: trip || updPurchaseOrderH.Trip,
            SIDocNo: SIDocNo || updPurchaseOrderH.SIDocNo,
            TotalGross: totalGross || updPurchaseOrderH.TotalGross,
            TotalDisc: totalDisc || updPurchaseOrderH.TotalDisc,
            TaxValue: taxValue || updPurchaseOrderH.TaxValue,
            TotalNetto: totalNetto || updPurchaseOrderH.TotalNetto,
            SendTo: sendTo || updPurchaseOrderH.SendTo,
            IsApproved: isApproved || updPurchaseOrderH.IsApproved,
            ApprovedBy: approvedBy || updPurchaseOrderH.ApprovedBy,
            ApprovedDate: approvedDate || updPurchaseOrderH.ApprovedDate,
            PrintCounter: printCounter || updPurchaseOrderH.PrintCounter,
            PrintedBy: printedBy || updPurchaseOrderH.PrintedBy,
            PrintedDate: printedDate || updPurchaseOrderH.PrintedDate,
            IsSalesReturn: isSalesReturn || updPurchaseOrderH.IsSalesReturn,
            Information: information || updPurchaseOrderH.Information,
            Status: status || updPurchaseOrderH.Status,
            CreatedBy: createdBy || updPurchaseOrderH.CreatedBy,
            ChangedBy: changedBy || updPurchaseOrderH.ChangedBy

        }, {
            where: {
                DocNo: updPurchaseOrderH.DocNo
            }
        }, { returning: true })

        await t.commit();
        res.status(200).json({ msg: "Update successful" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createPurchaseRequestH = async (req, res) => {
    const {
        generateDocDate,
        series,
        transactionType,
        docDate,
        supplierCode,
        deliveryDate,
        TOP,
        trip,
        discPercent,
        taxStatus,
        taxPercent,
        currency,
        exchangeRate,
        JODocNo,
        SIDocNo,
        totalGross,
        totalDisc,
        taxValue,
        totalNetto,
        sendTo,
        isApproved,
        approvedBy,
        approvedDate,
        printCounter,
        printedBy,
        printedDate,
        isSalesReturn,
        status,
        information,
        createdBy,
        changedBy,
        PurchaseOrderd
    } = req.body;

    try {
        const existingHeader = await purchaseOrderHeader.findOne({
            attributes: ['DocNo'],
            where: {
                DocNo: {
                    [Op.like]: `${series}-${generateDocDate}-%`,
                },
            },
            order: [
                [sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), 'DESC'],
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



        await purchaseOrderHeader.create({
            DocNo: DocNo,
            Series: series,
            TransactionType: transactionType,
            DocDate: docDate,
            SupplierCode: supplierCode,
            DeliveryDate: deliveryDate,
            TOP: TOP,
            DiscPercent: discPercent,
            TaxStatus: taxStatus,
            TaxPercent: taxPercent,
            Currency: currency,
            ExchangeRate: exchangeRate,
            JODocNo: JODocNo,
            Trip: trip,
            SIDocNo: SIDocNo,
            TotalGross: totalGross,
            TotalDisc: totalDisc,
            TaxValue: taxValue,
            TotalNetto: totalNetto,
            SendTo: sendTo,
            IsApproved: isApproved,
            ApprovedBy: approvedBy,
            // ApprovedDate: approvedDate,
            PrintCounter: printCounter,
            // PrintedBy: printedBy,
            // PrintedDate: printedDate,
            IsSalesReturn: isSalesReturn,
            Information: information,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy

        });

        if (PurchaseOrderd && Array.isArray(PurchaseOrderd)) {
            await Promise.all(
                PurchaseOrderd.map(async (detail) => {
                    const {
                        number,
                        materialCode,
                        info,
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
                        qtyReceived
                    } = detail;

                    await purchaseOrderDetails.create({
                        DocNo: DocNo,
                        Number: number,
                        MaterialCode: materialCode,
                        Info: info,
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
                        QtyReceived: qtyReceived
                    });
                })
            );
        }

        const responseObject = {
            DocNo: DocNo,
            Series: series,
            TransactionType: transactionType,
            DocDate: docDate,
            SupplierCode: supplierCode,
            DeliveryDate: deliveryDate,
            TOP: TOP,
            DiscPercent: discPercent,
            TaxStatus: taxStatus,
            TaxPercent: taxPercent,
            Currency: currency,
            ExchangeRate: exchangeRate,
            JODocNo: JODocNo,
            Trip: trip,
            SIDocNo: SIDocNo,
            TotalGross: totalGross,
            TotalDisc: totalDisc,
            TaxValue: taxValue,
            TotalNetto: totalNetto,
            SendTo: sendTo,
            IsApproved: isApproved,
            ApprovedBy: approvedBy,
            ApprovedDate: approvedDate,
            PrintCounter: printCounter,
            PrintedBy: printedBy,
            PrintedDate: printedDate,
            IsSalesReturn: isSalesReturn,
            Information: information,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy,
            PurchaseOrderd: PurchaseOrderd
        };

        res.status(200).json(responseObject);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Failed to create Purchase Order Header', error: error.message });
    }
};
export const deletePurchaseOrderHeader = async (req, res) => {
    try {
        const delPurchaseOrderH = await purchaseOrderHeader.findOne({

            where: {
                DocNo: req.params.id
            }
        })
        if (!delPurchaseOrderH) return res.status(400).json({ msg: "data tidak ditemukan" })

        await purchaseOrderHeader.update(
            { Status: "DELETED" },
            {
                where: {
                    DocNo: delPurchaseOrderH.DocNo
                }
            }
        );

        res.status(200).json({ msg: "data Deleted" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}