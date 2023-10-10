import ARSettlement from "../../../../models/Transaction/Account Receivable/ARSettlement/ARSettlement.js";
import ARRequestListH from '../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListHeader.js'
import ARRequestListD from '../../../../models/Transaction/Account Receivable/AR_RequestList/ARRequestListDetail.js'
import CashierReceiptH from '../../../../models/Transaction/BKM/CashierReceiptH.js';

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

export const getARSettlementData = async (req, res) => {
    try {
        const response = await ARRequestListH.findOne({
            where: {
                DocNo: req.params.id,
                Status: "USED"
            },
            attributes: ["DocNo", "Series", "TotalValue"]
        });

        const response2 = await ARRequestListD.findAll({
            attributes: ["ARDocNo"]
        });
        const cashierReceiptH = await CashierReceiptH.findOne({
            where: {
                ARReqListNo: req.params.id
            }
        })
        if (!cashierReceiptH) return res.status(400).json({ msg: "data banding tidak ada" })

        const response3 = { ...response.dataValues, ...response2[0].dataValues };

        return res.json({ sattle: response3, banding: response3 });
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
};
