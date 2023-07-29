import masterDepartment from "../../models/Master/MasterDepartmentModel.js";

export const getAllDepartment = async (req, res) => {
    try {
        const response = await masterDepartment.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
}

export const createDepartment = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;
    const user = await masterDepartment.findOne({
        where: {
            Code: code
        }
    });
    if (user) return res.status(400).json({ msg: "data sudah ada" });
    try {
        await masterDepartment.create({
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


export const deleteDepartment = async (req, res) => {
    const user = await masterDepartment.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!user) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await masterDepartment.destroy({
            where: {
                Code: user.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getDepartmentByCode = async (req, res) => {
    try {
        const response = await masterDepartment.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updateDepartment = async (req, res) => {
    const { code, name, createdBy, changedBy } = req.body;
    const codeCheck = await masterDepartment.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await masterDepartment.update({ 
            Name: name,
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