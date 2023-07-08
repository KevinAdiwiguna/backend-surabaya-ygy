import salesArea3 from "../../../../models/Master/Costumer/SalesArea/SalesArea3.js";


export const getSalesArea3 = async (req, res) => {
    try {
        const response = await salesArea3.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createSalesArea3 = async (req, res) => {
    const { code, area1, area2, name, createdBy, changedBy } = req.body;

    const check = await salesArea3.findOne({
        where: {
            Code: code
        }
    })
    if (check) return res.status(400).json({ msg: "data sudah ada" });

    try {
        await salesArea3.create({
            Area1: area1,
            Area2: area2,
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

export const deleteSalesArea3 = async (req, res) => {
    const codeCheck = await salesArea3.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await salesArea3.destroy({
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
        const response = await salesArea3.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}