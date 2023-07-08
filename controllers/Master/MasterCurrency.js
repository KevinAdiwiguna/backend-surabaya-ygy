import currencyModel from "../../models/Master/MasterCurrencyModel.js";

export const getCurrency = async (req, res) => {
    try {
        const response = await currencyModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
}

export const createCurrency = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;
    const user = await currencyModel.findOne({
        where: {
            Code: code
        }
    });
    if (user) return res.status(400).json({ msg: "data sudah ada" });
    try {
        await currencyModel.create({
            Code: code,
            Name: name,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message});
    }
}


export const deleteCurrency = async (req, res) => {
    const user = await currencyModel.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!user) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await currencyModel.destroy({
            where: {
                Code: user.Code
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
            Where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}