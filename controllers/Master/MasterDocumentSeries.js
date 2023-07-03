import documentSeriesModel from "../../models/Master/MasterDocumentSeries.js";

export const getAllSeries = async (req, res) => {
    try {
        const response = await documentSeriesModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createDocumentSeries = async (req, res) => {
    const { document, series, users, needQC, autoTaxNo, iso, createdBy, changedBy } = req.body;
    const documentCheck = documentSeriesModel.findOne({
        where: {
            document: document
        }
    })
    const seriesCheck = documentSeriesModel.findOne({
        where: {
            series: series
        }
    })
    if (!documentCheck) return res.status(400).json({ message: "document udah ada" })
    if (!seriesCheck) return res.status(400).json({ message: "series udah ada" })
    try {
        await documentSeriesModel.create({
            document: document,
            series: series,
            users: users,
            needQC: needQC,
            autoTaxNo: autoTaxNo,
            iso: iso,
            createdBy: createdBy,
            changedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.json({ msg: error.message, statusCode: 400 });
    }
}

export const deleteSeriesModel = async (req, res) => {
    const document = await documentSeriesModel.findOne({
        where: {
            series: req.params.id
        }
    });
    if (!document) return res.json({ msg: "data tidak ditemukan" });
    try {
        await documentSeriesModel.destroy({
            where: {
                series: document.series
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getDocumentSeriesById = async (req, res) => {
    try {
        const response = await documentSeriesModel.findOne({
            where: {
                series: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}