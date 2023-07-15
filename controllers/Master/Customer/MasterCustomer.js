import mastercustomer from "../../../models/Master/Costumer/MasterCustomer.js";

export const getCustomerGroup = async (req, res) => {
    try {
        const response = await mastercustomer.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
}


export const updateCustomerGroup = async (req, res) => {
    const { name, address, address2, city, country, phone, fax, email, contact, mobile, taxNumber, customerGroup, priceListType, salesArea1, salesArea2, salesArea3, top, currency, limit, transactionType, transactionType2, cutPph, isBlackList, isDeleted, information, changedBy } = req.body;
    const user = await mastercustomer.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!user) return res.json({ msg: "data tidak ditemukan" });
    try {
        await mastercustomer.update({
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
            CustomerGroup: customerGroup,
            PriceListType: priceListType,
            SalesArea1: salesArea1,
            SalesArea2: salesArea2,
            SalesArea3: salesArea3,
            TOP: top,
            Currency: currency,
            Limit: limit,
            TransactionType: transactionType,
            TransactionType2: transactionType2,
            CutPph: cutPph,
            IsBlackList: isBlackList,
            IsDeleted: isDeleted,
            Information: information,
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


export const createCustomerGroup = async (req, res) => {
    const { code, name, address, address2, city, country, phone, fax, email, contact, mobile, taxNumber, customerGroup, priceListType, salesArea1, salesArea2, salesArea3, top, currency, limit, transactionType, transactionType2, cutPph, isBlackList, isDeleted, infromation, createdBy, changedBy } = req.body;
    const user = await mastercustomer.findOne({
        where: {
            Code: code
        }
    });
    if (user) return res.status(400).json({ msg: "data sudah ada" });
    try {
        await mastercustomer.create({
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
            CustomerGroup: customerGroup,
            PriceListType: priceListType,
            SalesArea1: salesArea1,
            SalesArea2: salesArea2,
            SalesArea3: salesArea3,
            TOP: top,
            Currency: currency,
            Limit: limit,
            TransactionType: transactionType,
            TransactionType2: transactionType2,
            CutPph: cutPph,
            IsBlackList: isBlackList,
            IsDeleted: isDeleted,
            Information: information,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message});
    }
}


export const deleteCustomerGroup = async (req, res) => {
    const user = await mastercustomer.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!user) return res.json({ msg: "data tidak ditemukan" });
    try {
        await mastercustomer.destroy({
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
        const response = await mastercustomer.findOne({
            where: {
                Code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}