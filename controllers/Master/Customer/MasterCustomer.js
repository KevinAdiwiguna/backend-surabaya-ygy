import mastercustomer from "../../../models/Master/Costumer/MasterCustomer.js";

export const getCustomerGroup = async (req, res) => {
    try {
        const response = await mastercustomer.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}

export const createCustomerGroup = async (req, res) => {
    const { code, name, address, address2, city, country, phone, fax, email, contact, mobile, taxNumber, customerGroup, priceListType, salesArea1, salesArea2, salesArea3, top, currency, limit, transactionType, transactionType2, cutPph, isBlackList, isDeleted, infromation, createdBy, changedBy } = req.body;
    if (!code) return res.json({ message: "input code" })
    if (!name) return res.json({ message: "input name" })
    
    try {
        await mastercustomer.create({
            code: code,
            name: name,
            address: address,
            address2: address2,
            city: city,
            country: country,
            phone: phone,
            fax: fax,
            email: email,
            contact: contact,
            mobile: mobile,
            taxNumber: taxNumber,
            customerGroup: customerGroup,
            priceListType: priceListType,
            salesArea1: salesArea1,
            salesArea2: salesArea2,
            salesArea3: salesArea3,
            top: top,
            currency: currency,
            limit: limit,
            transactionType: transactionType,
            transactionType2: transactionType2,
            cutPph: cutPph,
            isBlackList: isBlackList,
            isDeleted: isDeleted,
            infromation: infromation,
            createdBy: createdBy,
            changedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.json({ msg: error.message, statusCode: 400 });
    }
}


export const deleteCustomerGroup = async (req, res) => {
    const user = await mastercustomer.findOne({
        where: {
            code: req.params.id
        }
    });
    if (!user) return res.json({ msg: "data tidak ditemukan" });
    try {
        await mastercustomer.destroy({
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
        const response = await mastercustomer.findOne({
            where: {
                code: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.json({ msg: error.message, statusCode: 500 });
    }
}