import ARSettlement from "../../../../models/Transaction/Account Receivable/ARSettlement/ARSettlement.js";
import CashierReceiptH from '../../../../models/Transaction/BKM/CashierReceiptH.js';
import CustomerPaymentH from '../../../../models/Transaction/Account Receivable/CustomerPayment/CustomerPaymentH.js'

import { Sequelize, Op } from 'sequelize';

export const createARSettlement = async (req, res) => {
    const arSettlementDataArray = req.body;
    try {
        const createdARSettlements = await Promise.all(arSettlementDataArray.map(async (arSettlementData) => {
            const { series, docDate, arReqListNo, totalValue, information, Status, CreatedBy, ChangedBy, generateDocDate } = arSettlementData;

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

            try {
                const newARSettlement = await ARSettlement.create({
                    DocNo,
                    series,
                    docDate,
                    arReqListNo,
                    totalValue,
                    information,
                    Status,
                    CreatedBy,
                    ChangedBy,
                    generateDocDate
                });
                return newARSettlement;
            } catch (error) {
                // Tangkap kesalahan saat penciptaan ARSettlement
                throw new Error(`Gagal membuat ARSettlement: ${error.message}`);
            }
        }));

        return res.status(201).json({ msg: 'ARSettlement berhasil dibuat', data: createdARSettlements });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const getARSEttlement = async (req, res) => {
    try {
        const response = await ARSettlement.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getARSettlementData = async (req, res) => {
    try {
        const response = await CustomerPaymentH.findOne({
            where: {
                ARReqListNo: req.params.id,
                Status: "OPEN"
            },
            attributes: ["DocNo", "Series", "TotalPayment"]
        });
        const response2 = await CashierReceiptH.findOne({
            where: {
                ARReqListNo: req.params.id,
                Status: "PRINTED"
            },
            attributes: ["DocNo", "Series", "ARReqListNo", "TotalGiro"]
        })



        return res.json({ settle: response, banding: response2 });
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
};
