import documentSeriesModel from "../../models/Master/MasterDocumentSeries.js";

export const getAllSeries = async (req, res) => {
    try {
        const response = await documentSeriesModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createDocumentSeries = async (req, res) => {
    const { document, series, users, needQC, autoTaxNo, iso, createdBy, changedBy } = req.body;
    const documentCheck = await documentSeriesModel.findOne({
        where: {
            Document: document
        }
    })
    const seriesCheck = await documentSeriesModel.findOne({
        where: {
            Series: series
        }
    })
    if (documentCheck) return res.status(400).json({ message: "document udah ada" })
    if (seriesCheck) return res.status(400).json({ message: "series udah ada" })
    try {
        await documentSeriesModel.create({
            Document: document,
            Series: series,
            Users: users,
            NeedQC: needQC,
            AutoTaxNo: autoTaxNo,
            ISO: iso,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteSeriesModel = async (req, res) => {
    const document = await documentSeriesModel.findOne({
        where: {
            Series: req.params.id
        }
    });
    if (!document) return res.json({ msg: "data tidak ditemukan" });
    try {
        await documentSeriesModel.destroy({
            where: {
                Series: document.Series
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
                Series: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const updateDocumentSeries = async (req, res) => {
    const { document, series, users, needQC, autoTaxNo, iso, createdBy, changedBy } = req.body;
    const documentCheck = await documentSeriesModel.findOne({
        where: {
            Document: document
        }
    })
    const seriesCheck = await documentSeriesModel.findOne({
        where: {
            Series: series
        }
    })
    if (!documentCheck) return res.status(400).json({ message: "document tidak ada" })
    if (!seriesCheck) return res.status(400).json({ message: "series tidak ada" })
    try {
        await documentSeriesModel.update({
            Document: document,
            Series: series,
            Users: users,
            NeedQC: needQC,
            AutoTaxNo: autoTaxNo,
            ISO: iso,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        }, {
            where: {
                Series: series
            }
        });
        res.status(201).json({ msg: "update Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}