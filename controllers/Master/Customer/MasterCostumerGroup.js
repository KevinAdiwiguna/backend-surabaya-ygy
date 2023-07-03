import mastercustomergroup from "../../../models/Master/Costumer/MasterCustomerGroup.js";

export const getCustomerGroup = async (req, res) => {
    try {
        const response = await mastercustomergroup.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createCustomerGroup = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;
    if (!code) return res.json({ message: "input code" })
    if (!name) return res.json({ message: "input name" })
    try {
        await mastercustomergroup.create({
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


export const deleteCustomerGroup = async (req, res) => {
    const user = await mastercustomergroup.findOne({
        where: {
            code: req.params.id
        }
    });
    if (!user) return res.json({ msg: "data tidak ditemukan" });
    try {
        await mastercustomergroup.destroy({
            where: {
                code: user.code
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
                code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}