import masterMaterial from "../../../models/Master/Material/MasterMaterial.js";

export const getAllMasterMaterial = async (req, res) => {
    try {
        const material = await masterMaterial.findAll({});
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const createMaterial = async (req, res) => {
    const { code, name, nameInPO, smallestUnit, soldUnit, skuUnit, group1, group2, group3, type, isBatch, isService, isAsset, mass, volume, hs, barcode, minStock, maxStock, currency, defaultPrice, transactionType1, transactionType2, transactionType3, transactionType4, info, createdBy, changedBy } = req.body;
    const codeCheck = await masterMaterial.findOne({
        where: {
            Code: code
        }
    });
    if (codeCheck) return res.json({ msg: "data sudah ada" });

    try {
        await masterMaterial.create({
            Code: code,
            Name: name,
            NameInPO: nameInPO,
            SmallestUnit: smallestUnit,
            SoldUnit: soldUnit,
            SKUUnit: skuUnit,
            Group1: group1,
            Group2: group2,
            Group3: group3,
            Type: type,
            IsBatch: isBatch,
            IsService: isService,
            IsAsset: isAsset,
            Mass: mass,
            Volume: volume,
            HS: hs,
            Barcode: barcode,
            MinStock: minStock,
            MaxStock: maxStock,
            Currency: currency,
            DefaultPrice: defaultPrice,
            TransactionType1: transactionType1,
            TransactionType2: transactionType2,
            TransactionType3: transactionType3,
            TransactionType4: transactionType4,
            Info: info,
            CreatedBy: createdBy,
            ChangedBy: changedBy,
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteMaterial = async (req, res) => {
    const codeCheck = await masterMaterial.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await masterMaterial.destroy({
            where: {
                Code: codeCheck.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getMaterialByCode = async (req, res) => {
    try {
        const response = await masterMaterial.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateMaterial = async (req, res) => {
    const { name, nameInPO, smallestUnit, soldUnit, skuUnit, group1, group2, group3, type, isBatch, isService, isAsset, mass, volume, hs, barcode, minStock, maxStock, currency, defaultPrice, transactionType1, transactionType2, transactionType3, transactionType4, info, changedBy } = req.body;
    const codeCheck = await masterMaterial.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.json({ msg: "data tidak ditemukan" });
    try {
        await masterMaterial.update({
            Name: name,
            NameInPO: nameInPO,
            SmallestUnit: smallestUnit,
            SoldUnit: soldUnit,
            SKUUnit: skuUnit,
            Group1: group1,
            Group2: group2,
            Group3: group3,
            Type: type,
            IsBatch: isBatch,
            IsService: isService,
            IsAsset: isAsset,
            Mass: mass,
            Volume: volume,
            HS: hs,
            Barcode: barcode,
            MinStock: minStock,
            MaxStock: maxStock,
            Currency: currency,
            DefaultPrice: defaultPrice,
            TransactionType1: transactionType1,
            TransactionType2: transactionType2,
            TransactionType3: transactionType3,
            TransactionType4: transactionType4,
            Info: info,
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