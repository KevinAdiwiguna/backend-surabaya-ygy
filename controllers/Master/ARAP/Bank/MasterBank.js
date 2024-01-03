import masterBank from "../../../../models/Master/ARAP/Bank/MasterBank.js";

export const getAllMasterBank = async (req, res) => {
  try {
    const response = await masterBank.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMasterBank = async (req, res) => {
  const { code, name, createdBy, changedBy } = req.body;
  try {
    const data = await masterBank.findOne({
      where: {
        Code: code,
      },
    });
    if (data) return res.status(400).json({ msg: "data sudah ada" });
    await masterBank.create({
      Code: code,
      Name: name,
      CreatedBy: createdBy,
      ChangedBy: changedBy,
    });

    res.status(200).json({ msg: "berhasil create" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMasterBankByCode = async (req, res) => {
  try {
    const response = await masterBank.findOne({
      where: {
        Code: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateMasterBank = async (req, res) => {
  const { name, createdBy, changedBy } = req.body;

  try {
    const data = await masterBank.findOne({
      where: {
        Code: req.params.id,
      },
    });
    if (!data) return res.status(404).json({ msg: "data tidak ada" });

    await masterBank.update(
      {
        Name: name || data.Name,
        CreatedBy: createdBy || data.ChangedBy,
        ChangedBy: changedBy || data.ChangedBy,
      },
      {
        where: {
          Code: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "update berhasil" });
  } catch (error) {
    res.status(200).json({ msg: error.message });
  }
};

export const deleteMasterBank = async (req, res) => {
  try {
    await masterBank.destroy({
      where: {
        Code: req.params.id,
      },
    });
    res.status(200).json({ msg: "berhasil delete" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
