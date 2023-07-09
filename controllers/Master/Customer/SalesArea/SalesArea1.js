import salesArea1 from "../../../../models/Master/Costumer/SalesArea/SalesArea1.js";

export const getSalesArea1 = async (req, res) => {
    try {
        const response = await salesArea1.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createSalesArea1 = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;

    const check = await salesArea1.findOne({
        where: {
            Code: code
        }
    });
    if (check) return res.status(400).json({ msg: "data sudah ada" });

    try {
        await salesArea1.create({
            Name: name,
            Code: code,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message});
    }
}

export const updateSalesArea1 = async (req, res) => {
    const { name, changedBy } = req.body;
    const codeCheck = await salesArea1.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await salesArea1.update({
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


export const deleteSalesArea1 = async (req, res) => {
    const codeCheck = await salesArea1.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await salesArea1.destroy({
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
        const response = await salesArea1.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
}