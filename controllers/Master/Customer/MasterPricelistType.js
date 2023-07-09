import pricelistModel from "../../../models/Master/Costumer/MasterPricelistType.js";

export const getAllPriceModel = async (req, res) => {
    try {
        const response = await pricelistModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updatePriceModel = async (req, res) => {
    const { name, changedBy } = req.body;
    const codeCheck = await pricelistModel.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await pricelistModel.update({
            Name: name,
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

export const createPriceModel = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;
    const user = await pricelistModel.findOne({
        where: {
            Code: code
        }
    });
    if (user) return res.status(400).json({ msg: "data sudah ada" });

    try {
        await pricelistModel.create({
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

export const deletePriceModel = async (req, res) => {
    const codeCheck = await pricelistModel.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await pricelistModel.destroy({
            where: {
                Code: codeCheck.Code
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
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}