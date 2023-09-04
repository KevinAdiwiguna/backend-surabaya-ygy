import Account from "../../../models/Master/GL/MasterAccount.js";

export const getAccount = async (req, res) => {
    try {
        const response = await Account.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
}

export const createAccount = async (req, res) => {
    const { accountNo, name, level, accountGroup, parentNo, isJournal, department, currency, createdBy, changedBy } = req.body;
    const check = await Account.findOne({
        where: {
            AccountNo: accountNo
        }
    });
    if (check) return res.status(400).json({ msg: "data sudah ada" });
    try {
        await Account.create({
            AccountNo: accountNo, 
            Name: name, 
            Level: level, 
            AccountGroup: accountGroup, 
            ParentNo:parentNo, 
            IsJournal: isJournal, 
            Department: department, 
            Currency: currency, 
            CreatedBy: createdBy, 
            ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message});
    }
}


export const deleteAccount = async (req, res) => {
    const del = await Account.findOne({
        where: {
            AccountNo: req.params.id
        }
    });
    if (!del) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await Account.destroy({
            where: {
                AccountNo: del.AccountNo
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getAccountByCode = async (req, res) => {
    try {
        const response = await Account.findOne({
            Where: {
                AccountNo: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateAccount = async (req, res) => {
    const { accountNo, name, level, accountGroup, parentNo, isJournal, department, currency, createdBy, changedBy } = req.body;
    const updt = await Account.findOne({
        where: {
            AccountNo: req.params.id
        }
    });
    if (!updt) return res.json({ msg: "data tidak ditemukan" });
    try {
        await Account.update({
            Name: name, 
            Level: level, 
            AccountGroup: accountGroup, 
            ParentNo:parentNo, 
            IsJournal: isJournal, 
            Department: department, 
            Currency: currency, 
            CreatedBy: createdBy, 
            ChangedBy: changedBy
        }, {
            where: {
                AccountNo: updt.AccountNo
            }
        });

        res.status(200).json({ msg: "data Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}