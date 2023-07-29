import MasterApproval from "../../models/Master/MasterApproval.js";
import { Op } from "sequelize";

export const getAllMasterApproval = async (req, res) => {
    try {
        const masterApproval = await MasterApproval.findAll();
        res.status(200).json({ masterApproval });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createMasterApproval = async (req, res) => {
    const { series, minValue, maxValue, users, createdBy, changedBy } = req.body;
    const validation = await MasterApproval.findOne({
        where: {
            [Op.and]: [
                { Series: series },
                { MinValue: minValue },
                { MaxValue: maxValue }
            ]
        }
    })
    if (validation) return res.status(400).json({ msg: "Approval udah ada" })
    try {
        await MasterApproval.create({
            Series: series,
            MinValue: minValue,
            MaxValue: maxValue,
            Users: `<${users}>`,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}    