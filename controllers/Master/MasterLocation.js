import masterLocationModel from "../../models/Master/MasterLocationModel.js";

export const getAllLocation = async (req, res) => {
    try {
        const response = await masterLocationModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createLocation = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;
    const codeCheck = masterLocationModel.findOne({
        where: {
            code: code
        }
    })
   
    if (!codeCheck) return res.status(400).json({ message: "code udah ada" })
    try {
        await masterLocationModel.create({
            code: code,
            name: name,
            createdBy: createdBy,
            changedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.json({ msg: error.message, statusCode: 400 });
    }
}

export const deleteLocation = async (req, res) => {
    const code = await masterLocationModel.findOne({
        where: {
            code: req.params.id
        }
    });
    if (!code) return res.json({ msg: "code tidak ditemukan" });
    try {
        await masterLocationModel.destroy({
            where: {
                code: code.code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getLocationByCode = async (req, res) => {
    try {
        const response = await masterLocationModel.findOne({
            where: {
                code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}