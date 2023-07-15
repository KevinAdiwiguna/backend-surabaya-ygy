import materialType from "../../../models/Master/Material/MasterMaterialType.js";

export const getAllMaterialType = async (req, res) => {
    try {
        const response = await materialType.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
}

export const createMaterialType = async (req, res) => {
    const { code, name, isWaste, createdBy, changedBy } = req.body;
    const codeCheck = await materialType.findOne({
        where: {
            Code: code
        }
    });
    if (codeCheck) return res.json({ msg: "data sudah ada" });
    try {
        await materialType.create({
            Name: name,
            Code: code,
            IsWaste: isWaste,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}

export const deleteMaterialType = async (req, res) => {
    const codeCheck = await materialType.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await materialType.destroy({
            where: {
                Code: codeCheck.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getMaterialTypeByCode = async (req, res) => {
    try {
        const response = await materialType.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
}

export const updateMaterialType = async (req, res) => {
    const {name, isWaste, changedBy } = req.body;
    const codeCheck = await materialType.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await materialType.update({
            Name: name,
            IsWaste: isWaste,
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