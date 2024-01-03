import MasterUnitConversion from "../../../models/Master/Material/MasterUnitConversion.js";

export const getAllUnitConversion = async (req, res) => {
    try {
        const response = await MasterUnitConversion.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUnitConversion = async (req, res) => {
    const { materialCode, unit, content, createdBy, changedBy } = req.body;
    const codeCheck = await MasterUnitConversion.findOne({
        where: {
            MaterialCode: materialCode
        }
    });
    if (codeCheck) return res.json({ msg: "data sudah ada" });
    try {
        await MasterUnitConversion.create({
            MaterialCode: materialCode,
            Unit: unit,
            Content: content,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUnitConversion = async (req, res) => {
    const codeCheck = await MasterUnitConversion.findOne({
        where: {
            MaterialCode: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await MasterUnitConversion.destroy({
            where: {
                MaterialCode: codeCheck.MaterialCode    
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getUnitConversionByMaterialCode = async (req, res) => {
    try {
        const response = await MasterUnitConversion.findOne({
            where: {
                MaterialCode: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateUnitConversion = async (req, res) => {
    const { materialCode, content, createdBy, changedBy } = req.body;
    const codeCheck = await MasterUnitConversion.findOne({
        where: {
            MaterialCode: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await MasterUnitConversion.update({
            Content: content,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        }, {
            where: {
                MaterialCode: req.params.id
            }
        });
        res.status(200).json({ msg: "update Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}