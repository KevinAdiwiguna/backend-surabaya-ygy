import masterCollector from "../../../../models/Master/ARAP/Collector/Collector.js";

export const getAllCollector = async (req, res) => {
  try {
    const response = await masterCollector.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getCollectorByCode = async (req, res) => {
  try {
    const response = await masterCollector.findOne({
      where: {
        Code: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createCollector = async (req, res) => {
  const { code, phone, name, address, city, mobile, createdBy, changedBy } = req.body;
  try {
    const data = await masterCollector.findOne({
      where: {
        Code: code,
      },
    });
    if (data) return res.status(400).json({ msg: "data sudah ada" });
    await masterCollector.create({
      Code: code,
      Name: name,
      Address: address,
      Phone: phone,
      City: city,
      Mobile: mobile,
      CreatedBy: createdBy,
      ChangedBy: changedBy,
    });
    return res.status(200).json({ msg: "berhasil create" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteCollector = async (req, res) => {
  try {
    const response = await masterCollector.findOne({
      where: {
        Code: req.params.id,
      },
    });
    if (!response) return req.status(404).json("data tidak ada");
    await masterCollector.destroy({
      where: {
        Code: req.params.id,
      },
    });

    res.status(200).json({ msg: "berhasil menghapus data" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateCollector = async (req, res) => {
  const { code, phone, name, address, city, mobile,  changedBy } = req.body;
  try {
    const data = await masterCollector.findOne({
      where: {
        Code: code,
      },
    });
    if (!data) return res.json({ msg: "data tidak ada" });


    await masterCollector.update(
      {
        Name: name || data.Name,
        Address: address || data.Address,
        Phone: phone || data.Phone,
        City: city || data.City,
        Mobile: mobile || data.Mobile,
        ChangedBy: changedBy || data.ChangedBy,
      },
      {
        where: {
          Code: data.Code,
        },
      }
    );

    res.status(200).json({ msg: "update berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
