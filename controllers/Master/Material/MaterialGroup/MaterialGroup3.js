import MaterialGroup from "../../../../models/Master/Material/MaterialGroup/MaterialGroup3.js";

export const getAllMaterialGroup = async (req, res) => {
    try {
        const response = await MaterialGroup.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createMaterialGroup = async (req, res) => {
    const { code, name, group1, group2, createdBy, changedBy } = req.body;

    const codeCheck = MaterialGroup.findOne({
        where: {
            code: code
        }
    })
    if (!codeCheck) return res.status(400).json({ message: "code udah ada" })

    try {
        await MaterialGroup.create({
            code: code,
            group1: group1,
            group2: group2,
            name: name,
            createdBy: createdBy,
            changedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.json({ msg: error.message, statusCode: 400 });
    }
}

export const deleteMaterialGroup = async (req, res) => {
    const codeCheck = await MaterialGroup.findOne({
        where: {
            code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await MaterialGroup.destroy({
            where: {
                code: codeCheck.code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getMaterialGroupByCode = async (req, res) => {
    try {
        const response = await MaterialGroup.findOne({
            where: {
                code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}