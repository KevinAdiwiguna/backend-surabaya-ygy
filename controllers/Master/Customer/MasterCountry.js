import mastercountry from "../../../models/Master/Costumer/MasterCountry.js";

export const getCountry = async (req, res) => {
    try {
        const response = await mastercountry.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createCountry = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;

    const check = await mastercountry.findOne({
        where: {
            Code: code
        }
    });
    if (check) return res.status(400).json({ msg: "data sudah ada" });

    try {
        await mastercountry.create({
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

export const updateCountry = async (req, res) => {
    const { name, changedBy } = req.body;
    const codeCheck = await mastercountry.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await mastercountry.update({
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


export const deleteCountry = async (req, res) => {
    const codeCheck = await mastercountry.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await mastercountry.destroy({
            where: {
                Code: codeCheck.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getCountryByCode = async (req, res) => {
    try {
        const response = await mastercountry.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}