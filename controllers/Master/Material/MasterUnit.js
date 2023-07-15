import MasterUnitModel from "../../../models/Master/Material/MasterUnit.js";

export const getAllUnit = async (req, res) => {
    try {
        const response = await MasterUnitModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUnit = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;
    const codeCheck = await MasterUnitModel.findOne({
        where: {
            Code: code
        }
    });
    if (codeCheck) return res.json({ msg: "data sudah ada" });
    try {
        await MasterUnitModel.create({
            Name: name,
            Code: code,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUnit = async (req, res) => {
    const codeCheck = await MasterUnitModel.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await MasterUnitModel.destroy({
            where: {
                Code: codeCheck.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getUnitByCode = async (req, res) => {
    try {
        const response = await MasterUnitModel.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateUnit = async (req, res) => {
    const { name, changedBy } = req.body;
    const codeCheck = await MasterUnitModel.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await MasterUnitModel.update({
            Name: name,
            ChangedBy: changedBy
        }, {
            where: {
                Code: codeCheck.Code
            }
        });
        res.status(200).json({ msg: "data updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}