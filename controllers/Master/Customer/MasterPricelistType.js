import pricelistModel from "../../../models/Master/Costumer/MasterPricelistType.js";

export const getAllPriceModel = async (req, res) => {
    try {
        const response = await pricelistModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createPriceModel = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;

    const codeCheck = pricelistModel.findOne({
        where: {
            code: code
        }
    })
    if (!codeCheck) return res.status(400).json({ message: "code udah ada" })

    try {
        await pricelistModel.create({
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

export const deletePriceModel = async (req, res) => {
    const codeCheck = await pricelistModel.findOne({
        where: {
            code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await pricelistModel.destroy({
            where: {
                code: codeCheck.code    
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getPriceById = async (req, res) => {
    try {
        const response = await pricelistModel.findOne({
            where: {
                code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}