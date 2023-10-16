import APSettlement from "../../../models/Transaction/AP/APSettlement.js";
import CashierPaymentH from '../../../models/Transaction/BKK/CashierPaymentH.js';
import DebtPaymentH from '../../../models/Transaction/AP/DebtPaymentH.js'
import APReceiptListH from '../../../models/Transaction/AP/AR_ReceiptListh.js'
import { Sequelize, Op } from 'sequelize';

export const createAPSettlement = async (req, res) => {
    const { series, docDate, apReqListNo, supplierCode, totalValue, information, status, createdBy, changedBy, generateDocDate } = req.body;
    try {
        const existingHeader = await APSettlement.findOne({
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

        const createdAPSettlements = await APSettlement.create({
            DocNo: DocNo,
            Series: series,
            DocDate: docDate,
            APReqListNo: apReqListNo,
            SupplierCode: supplierCode,
            TotalValue: totalValue,
            Information: information,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy,
        });

        const response = await DebtPaymentH.findOne({
            where: {
                APReqListNo: apReqListNo,
                Status: "OPEN"
            },
            attributes: ["DocNo", "Series", "TotalPayment", "Status"]
        });
        const response2 = await CashierPaymentH.findOne({
            where: {
                APReqListNo: apReqListNo,
                Status: "PRINTED"
            },
            attributes: ["DocNo", "Series", "ARReqListNo", "TotalGiro", "Status"]
        })

        await DebtPaymentH.update(
            { Status: "SETTLED" },
            { where: { DocNo: response?.DocNo } }
        )
        await CashierPaymentH.update(
            { Status: "SETTLED" },
            { where: { DocNo: response2?.DocNo } }
        )
        await APReceiptListH.update(
            { Status: "SETTLED" },
            { where: { DocNo: response2?.ARReqListNo } }
        )


        return res.status(201).json({ msg: 'APSettlement berhasil dibuat', data: createdAPSettlements });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const getAPSEttlement = async (req, res) => {
    try {
        const response = await APSettlement.findAll({
            attributes: ["DocNo"]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getAPSettlementData = async (req, res) => {
    try {
        const response = await DebtPaymentH.findOne({
            where: {
                APReqListNo: req.params.id,
                Status: "OPEN"
            },
            attributes: ["DocNo", "Series", "TotalPayment", "Status"]
        });
        const response2 = await CashierPaymentH.findOne({
            where: {
                APReqListNo: req.params.id,
                Status: "PRINTED"
            },
            attributes: ["DocNo", "Series", "ARReqListNo", "TotalDebet", "Status"]
        })

        return res.json({ settle: response, banding: response2 });
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
};

export const deleteAPSettlement = async (req, res) => {
    try {

        const response = await APSettlement.findOne({
            where: {
                DocNo: req.params.id
            },
        })

        await DebtPaymentH.update(
            { Status: "OPEN" },
            { where: { APReqListNo: response?.APReqListNo } }
        )
        await CashierPaymentH.update(
            { Status: "PRINTED" },
            { where: { APReqListNo: response?.APReqListNo } }
        )
        await APReceiptListH.update(
            { Status: "USED" },
            { where: { DocNo: response?.APReqListNo } }
        )
        await APSettlement.update(
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