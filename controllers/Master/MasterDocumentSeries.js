import documentSeriesModel from "../../models/Master/MasterDocumentSeries.js";

export const getAllSeries = async (req, res) => {
    try {
        const response = await documentSeriesModel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createDocumentSeries = async (req, res) => {
    const {
        document,
        series,
        users,
        needQC,
        autoTaxNo,
        iso,
        createdBy,
        changedBy,
    } = req.body;

    const seriesCheck = await documentSeriesModel.findOne({
        where: {
            Series: series,
        },
    });
    if (seriesCheck) return res.status(400).json({ message: "series udah ada" });
    try {
        await documentSeriesModel.create({
            Document: document,
            Series: series,
            Users: users,
            NeedQC: needQC,
            AutoTaxNo: autoTaxNo,
            Iso: iso,
            CreatedBy: createdBy,
            ChangedBy: changedBy,
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteSeriesModel = async (req, res) => {
    const document = await documentSeriesModel.findOne({
        where: {
            Series: req.params.id,
        },
    });
    if (!document) return res.json({ msg: "data tidak ditemukan" });
    try {
        await documentSeriesModel.destroy({
            where: {
                Series: document.Series,
            },
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const getDocumentSeriesById = async (req, res) => {
    try {
        const response = await documentSeriesModel.findOne({
            where: {
                Series: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateDocumentSeries = async (req, res) => {
    const { users, needQC, autoTaxNo, iso, changedBy } = req.body;

    const seriesCheck = await documentSeriesModel.findOne({
        where: {
            Series: req.params.id,
        },
    });
    if (!seriesCheck) return res.status(400).json({ msg: "series tidak ada" });

    try {
        await documentSeriesModel.update(
            {
                Users: users,
                NeedQC: needQC,
                AutoTaxNo: autoTaxNo,
                Iso: iso,
                ChangedBy: changedBy,
            },
            {
                where: {
                    Series: seriesCheck.Series,
                },
            }
        );
        res.status(201).json({ msg: "update Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const getSeriesByDocument = async (req, res) => {
    const DocCheck = await documentSeriesModel.findOne({
        where: {
            Document: req.params.id,
        },
    });
    if (!DocCheck) return res.status(400).json({ msg: "document tidak ada" });
    try {
        const salesOrderHeader = await documentSeriesModel.findAll({
            where: {
                Document: req.params.id,
            },
        });
        res.status(200).json(salesOrderHeader);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getSeriesPrice = async(req, res) => {
    const DocCheck = await documentSeriesModel.findOne({
        where: {
            Document: req.params.id,
        },
    });
    if (!DocCheck) return res.status(400).json({ msg: "document tidak ada" });
    try {
        const salesOrderHeader = await documentSeriesModel.findAll({
            where: {
                Document: DocCheck.Document
            },
        });
        res.status(200).json(salesOrderHeader);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}