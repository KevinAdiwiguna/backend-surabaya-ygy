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

    const codeCheck = await masterLocationModel.findOne({
        where: {
            Code: code
        }
    })
    if (codeCheck) return res.status(400).json({ msg: "code udah ada" })

    
    try {
        await masterLocationModel.create({
            Code: code,
            Name: name,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteLocation = async (req, res) => {
    const code = await masterLocationModel.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!code) return res.json({ msg: "code tidak ditemukan" });
    try {
        await masterLocationModel.destroy({
            where: {
                Code: code.Code
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
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateLocation = async (req, res) => {
    const { name, changedBy } = req.body;
    const codeCheck = await masterLocationModel.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await masterLocationModel.update({
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