import salesArea2 from "../../../../models/Master/Costumer/SalesArea/SalesArea2.js";


export const getSalesArea2 = async (req, res) => {
    try {
        const response = await salesArea2.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const updateSalesArea2 = async (req, res) => {
    const { name, area1, changedBy } = req.body;
    const codeCheck = await salesArea2.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await salesArea2.update({
            Name: name,
            Area1: area1,
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


export const createSalesArea2 = async (req, res) => {
    const { code, area1, name, createdBy, changedBy } = req.body;

    const check = await salesArea2.findOne({
        where: {
            Code: code
        }
    })
    if (check) return res.status(400).json({ msg: "data sudah ada" });

    try {
        await salesArea2.create({
            Name: name,
            Area1: area1,
            Code: code,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: "data sudah ada" });
    }
}

export const deleteSalesArea2 = async (req, res) => {
    const codeCheck = await salesArea2.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await salesArea2.destroy({
            where: {
                Code: codeCheck.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getAreaById = async (req, res) => {
    try {
        const response = await salesArea2.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}