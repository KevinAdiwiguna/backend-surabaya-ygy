import transactionType from "../../../../models/Master/ARAP/TransactionType/MasterTransactionType.js";

export const getAllTransactionType = async (req, res) => {
  try {
    const response = await transactionType.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getTransactionTypeByPurpose = async (req, res) => {
  try {
    const response = await transactionType.findAll({
      where: {
        Purpose: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    req.status({ msg: error.message });
  }
};
export const createTransactionType = async (req, res) => {
  const { type, accountNo, description, purpose, createdBy, changedBy } = req.body;
  try {
    const dataCheck = await transactionType.findOne({
      where: {
        Type: type,
      },
    });
    if (dataCheck) return res.status(400).json({ msg: "data sudah ada" });
    await transactionType.create({
      Type: type,
      accountNo: accountNo,
      Description: description,
      Purpose: purpose,
      CreatedBy: createdBy,
      ChangedBy: changedBy,
    });
    res.status(200).json({ msg: "create berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateTransactionType = async (req, res) => {
  try {
    const { type, accountNo, description, purpose, createdBy, changedBy } = req.body;
    const data = await transactionType.findOne({
      where: {
        Type: type,
      },
    });

    if (!data) return res.status(404).json({ msg: "data tidak tersedia" });

    await transactionType.update(
      {
        accountNo: accountNo || data.accountNo,
        Description: description || data.Description,
        Purpose: purpose || data.Purpose,
        CreatedBy: createdBy || data.CreatedBy,
        ChangedBy: changedBy || data.ChangedBy,
      },
      {
        where: {
          Type: data.Type,
        },
      }
    );

    res.status(200).json("update berhasil");
  } catch (error) {
    res.status(500).jsonn({ msg: error.message });
  }
};

export const deleteTrnsactionType = async (req, res) => {
  try {
    const response = await transactionType.findOne({
      where: {
        Type: req.params.id,
      },
    });
    if (!response) return res.status(400).json({ msg: "data tidak tersedia" });

    await transactionType.destroy({
      where: {
        Type: req.params.id,
      },
    });
    res.status(200).json({ msg: "sukses delete" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
