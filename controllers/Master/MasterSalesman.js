import masterSales from "../../models/Master/MasterSalesman.js";

export const getAllSalesman = async (req, res) => {
    try {
        const response = await masterSales.findAll({});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createSalesman = async (req, res) => {
    const { code, name, address, city, phone, mobile, createdBy, changedBy } = req.body;

    const codeCheck = masterSales.findOne({
        where: {
            Code: code
        }
    })

    if (codeCheck.value) return res.status(400).json({ message: "code udah ada" })
    try {
        await masterSales.create({
            Code: code,
            Name: name,
            Address: address,
            City: city,
            Phone: phone,
            Mobile: mobile,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteSalesman = async (req, res) => {
    const code = await masterSales.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!code) return res.json({ msg: "code tidak ditemukan" });
    try {
        await masterSales.destroy({
            where: {
                Code: code.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getSalesmanByCode = async (req, res) => {
    try {
        const response = await masterSales.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateSalesman = async (req, res) => {
    const { name, address, city, phone, mobile, createdBy, changedBy } = req.body;
    const codeCheck = await masterSales.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await masterSales.update({
            Name: name,
            Address: address,
            City: city,
            Phone: phone,
            Mobile: mobile,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        }, {
            where: {
                Code: codeCheck.Code
            }
        });
        res.status(200).json({ msg: "update berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
