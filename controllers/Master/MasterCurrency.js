import currencyModel from "../../models/Master/MasterCurrencyModel.js";

export const getCurrency = async (req, res) => {
    try {
        const response = await currencyModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createCurrency = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;
    if (!code) return res.json({ message: "input code" })
    if (!name) return res.json({ message: "input name" })
    try {
        await currencyModel.create({
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


export const deleteCurrency = async (req, res) => {
    const user = await currencyModel.findOne({
        where: {
            code: req.params.id
        }
    });
    if (!user) return res.json({ msg: "data tidak ditemukan" });
    try {
        await currencyModel.destroy({
            where: {
                code: user.code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getCurrencyById = async (req, res) => {
    try {
        const response = await currencyModel.findOne({
            where: {
                code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}