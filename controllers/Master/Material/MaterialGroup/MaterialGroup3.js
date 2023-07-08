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
    if (codeCheck) return res.json({ msg: "Code sudah ada" });
    const group1Check = await MaterialGroup.findOne({
        where: {
            Group1: group1
        }
    });
    if (group1Check) return res.json({ msg: "Group1 sudah ada" });
    const group2Check = await MaterialGroup.findOne({
        where: {
            Group2: group2
        }
    });
    if (group2Check) return res.json({ msg: "Group2 sudah ada" });

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