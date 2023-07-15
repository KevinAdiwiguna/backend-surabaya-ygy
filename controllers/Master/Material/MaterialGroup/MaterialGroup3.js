import MaterialGroup from "../../../../models/Master/Material/MaterialGroup/MaterialGroup3.js";

export const getAllMaterialGroup = async (req, res) => {
    try {
        const response = await MaterialGroup.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createMaterialGroup = async (req, res) => {
    const { code, name, group1, group2, createdBy, changedBy } = req.body;
    const codeCheck = await MaterialGroup.findOne({
        where: {
            Code: code
        }
    });
    if (codeCheck) return res.json({ msg: "data sudah ada" });

    try {
        await MaterialGroup.create({
            Code: code,
            Group1: group1,
            Group2: group2,
            Name: name,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteMaterialGroup = async (req, res) => {
    const codeCheck = await MaterialGroup.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await MaterialGroup.destroy({
            where: {
                Code: codeCheck.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getMaterialGroupByCode = async (req, res) => {
    try {
        const response = await MaterialGroup.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateMaterialGroup = async (req, res) => {
    const { name, group1, group2, changedBy } = req.body;
    const codeCheck = await MaterialGroup.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await MaterialGroup.update({
            Name: name,
            Group1: group1,
            Group2: group2,
            ChangedBy: changedBy
        }, {
            where: {
                Code: codeCheck.Code
            }
        });
        res.status(200).json({ msg: "data Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getAllMaterialGroupByGroup2 = async (req, res) => {
    try {
        const response = await MaterialGroup.findAll({
            where: {
                Group2: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

