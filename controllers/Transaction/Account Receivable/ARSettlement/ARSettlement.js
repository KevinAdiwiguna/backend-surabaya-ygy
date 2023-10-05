import ARSettlement from "../../../../models/Transaction/Account Receivable/ARSettlement/ARSettlement.js";
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
