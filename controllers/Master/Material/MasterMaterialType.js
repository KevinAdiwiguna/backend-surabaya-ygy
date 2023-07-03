import materialType from "../../../models/Master/Material/MasterMaterialType.js";

export const getAllMaterialType = async (req, res) => {
    try {
        const response = await materialType.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createMaterialType = async (req, res) => {
    const { code, name, isWaste, createdBy, changedBy } = req.body;

    const codeCheck = materialType.findOne({
        where: {
            code: code
        }
    })
    if (!codeCheck) return res.status(400).json({ message: "code udah ada" })

    try {
        await materialType.create({
            name: name,
            code: code,
            isWaste: isWaste,
            createdBy: createdBy,
            changedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.json({ msg: error.message, statusCode: 400 });
    }
}

export const deleteMaterialType = async (req, res) => {
    const codeCheck = await materialType.findOne({
        where: {
            code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await materialType.destroy({
            where: {
                code: codeCheck.code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getMaterialTypeByCode = async (req, res) => {
    try {
        const response = await materialType.findOne({
            where: {
                code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}