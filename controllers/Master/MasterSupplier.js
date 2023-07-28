import masterSupplier from "../../models/Master/MasterSupplierModel.js";

export const getAllSupplier = async (req, res) => {
	try {
		const response = await masterSupplier.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.json({ msg: error.message, statusCode: 500 });
	}
}

export const createSupplier = async (req, res) => {
    const { code, name, address, address2, city, country, phone, fax, email, contact, mobile, taxNumber, top, currency, limit, transactionType, transactionType2, cutPph, createdBy, changedBy } = req.body;

    const validation = await masterSupplier.findOne({
        where: {
            Code: code
        }
    })

    if (validation) return res.status(400).json({ message: "code udah ada" })
    try {
        await masterSupplier.create({
            Code: code, 
            Name: name, 
            Address: address, 
            Address2: address2, 
            City: city, 
            Country: country, 
            Phone: phone, 
            Fax: fax, 
            Email: email, 
            Contact: contact,
            Mobile: mobile, 
            TaxNumber: taxNumber,
            TOP: top, 
            Currency: currency, 
            Limit: limit, 
            TransactionType: transactionType, 
            TransactionType2: transactionType2, 
            CutPPh: cutPph, 
            CreatedBy: createdBy, 
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteSupplier = async (req, res) => {
    const code = await masterSupplier.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!code) return res.json({ msg: "code tidak ditemukan" });
    try {
        await masterSupplier.destroy({
            where: {
                Code: code.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getSupplierByCode = async (req, res) => {
    try {
        const response = await masterSupplier.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updateSupplier = async (req, res) => {
    const { code, name, address, address2, city, country, phone, fax, email, contact, mobile, taxNumber, top, currency, limit, transactionType, transactionType2, cutPph, createdBy, changedBy } = req.body;
    const codeCheck = await masterSupplier.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!codeCheck) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await masterSupplier.update({ 
            Name: name, 
            Address: address, 
            Address2: address2, 
            City: city, 
            Country: country, 
            Phone: phone, 
            Fax: fax, 
            Email: email, 
            Contact: contact,
            Mobile: mobile, 
            TaxNumber: taxNumber,
            TOP: top, 
            Currency: currency, 
            Limit: limit, 
            TransactionType: transactionType, 
            TransactionType2: transactionType2, 
            CutPPh: cutPph, 
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
