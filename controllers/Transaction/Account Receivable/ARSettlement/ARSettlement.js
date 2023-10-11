import ARSettlement from "../../../../models/Transaction/Account Receivable/ARSettlement/ARSettlement.js";
import CashierReceiptH from '../../../../models/Transaction/BKM/CashierReceiptH.js';
import CustomerPaymentH from '../../../../models/Transaction/Account Receivable/CustomerPayment/CustomerPaymentH.js'
import ARRequestListH from '../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListHeader.js'
import { Sequelize, Op } from 'sequelize';

export const createARSettlement = async (req, res) => {
    const { series, docDate, arReqListNo, totalValue, information, status, createdBy, changedBy, generateDocDate } = req.body;
    try {
        const existingHeader = await ARSettlement.findOne({
            attributes: ["DocNo"],
            where: {
                DocNo: {
                    [Op.like]: `${series}-${generateDocDate}-%`,
                },
            },
            order: [[Sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), "DESC"]],
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

        const createdARSettlements = await ARSettlement.create({
            DocNo,
            Series: series,
            DocDate: docDate,
            ARReqListNo: arReqListNo,
            TotalValue: totalValue,
            Information: information,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy,
        });

        const response = await CustomerPaymentH.findOne({
            where: {
                ARReqListNo: req.params.id,
                Status: "OPEN"
            },
            attributes: ["DocNo", "Series", "TotalPayment", "Status"]
        });
        const response2 = await CashierReceiptH.findOne({
            where: {
                ARReqListNo: req.params.id,
                Status: "PRINTED"
            },
            attributes: ["DocNo", "Series", "ARReqListNo", "TotalGiro", "Status"]
        })

        await CustomerPaymentH.update(
            { Status: "SETTLED" },
            { where: { DocNo: response?.ARReqListNo } }
        )
        await CashierReceiptH.update(
            { Status: "SETTLED" },
            { where: { DocNo: response2?.ARReqListNo } }
        )
        await ARRequestListH.update(
            { Status: "SETTLED" },
            { where: { DocNo: req.params.id } }
        )


        return res.status(201).json({ msg: 'ARSettlement berhasil dibuat', data: createdARSettlements });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const getARSEttlement = async (req, res) => {
    try {
        const response = await ARSettlement.findAll({
            attributes: ["DocNo"]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getARSettlementData = async (req, res) => {
    try {
        const response = await CustomerPaymentH.findOne({
            where: {
                ARReqListNo: req.params.id,
                Status: "OPEN"
            },
            attributes: ["DocNo", "Series", "TotalPayment", "Status"]
        });
        const response2 = await CashierReceiptH.findOne({
            where: {
                ARReqListNo: req.params.id,
                Status: "PRINTED"
            },
            attributes: ["DocNo", "Series", "ARReqListNo", "TotalGiro", "Status"]
        })

        return res.json({ settle: response, banding: response2 });
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
};

export const deleteARSettlement = async (req, res) => {
    try {

        const response = await ARSettlement.findOne({
            where: {
                DocNo: req.params.id
            },
        })

        await CustomerPaymentH.update(
            { Status: "OPEN" },
            { where: { ARReqListNo: response?.ARReqListNo } }
        )
        await CashierReceiptH.update(
            { Status: "PRINTED" },
            { where: { ARReqListNo: response?.ARReqListNo } }
        )
        await ARRequestListH.update(
            { Status: "USED" },
            { where: { DocNo: response?.ARReqListNo } }
        )
        await ARSettlement.update(
            { Status: "DELETED" },

            {
                where: {
                    DocNo: req.params.id
                },
            })

        res.status(200).json({ msg: "deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};