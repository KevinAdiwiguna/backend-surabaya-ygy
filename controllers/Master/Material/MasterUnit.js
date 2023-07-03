import MasterUnitModel from "../../../models/Master/Material/MasterUnit.js";

export const getAllUnit = async (req, res) => {
    try {
        const response = await MasterUnitModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createUnit = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;

    const codeCheck = MasterUnitModel.findOne({
        where: {
            code: code
        }
    })
    if (!codeCheck) return res.status(400).json({ message: "code udah ada" })

    try {
        await MasterUnitModel.create({
            name: name,
            code: code,
            createdBy: createdBy,
            changedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.json({ msg: error.message, statusCode: 400 });
    }
}

export const deleteUnit = async (req, res) => {
    const codeCheck = await MasterUnitModel.findOne({
        where: {
            code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await MasterUnitModel.destroy({
            where: {
                code: codeCheck.code    
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
                code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}