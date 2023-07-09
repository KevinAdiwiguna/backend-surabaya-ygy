import mastercustomergroup from "../../../models/Master/Costumer/MasterCustomerGroup.js";

export const getCustomerGroup = async (req, res) => {
    try {
        const response = await mastercustomergroup.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createCustomerGroup = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;

    const user = await mastercustomergroup.findOne({
        where: {
            Code: code
        }
    });
    if (user) return res.status(400).json({ msg: "data sudah ada" });

    try {
        await mastercustomergroup.create({
            Code: code,
            Name: name,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateCustomerGroup = async (req, res) => {
    const { name, changedBy } = req.body;
    const user = await mastercustomergroup.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!user) return res.json({ msg: "data tidak ditemukan" });
    try {
        await mastercustomergroup.update({
            Name: name,
            ChangedBy: changedBy
        }, {
            where: {
                Code: user.Code
            }
        });

        res.status(200).json({ msg: "data Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}




export const deleteCustomerGroup = async (req, res) => {
    const user = await mastercustomergroup.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!user) return res.json({ msg: "data tidak ditemukan" });
    try {
        await mastercustomergroup.destroy({
            where: {
                Code: user.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getCustomerGroupByCode = async (req, res) => {
    try {
        const response = await mastercustomergroup.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}