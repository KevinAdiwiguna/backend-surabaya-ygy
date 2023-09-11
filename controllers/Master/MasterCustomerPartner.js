import MasterCustomerPartner from "../../models/Master/MasterCustomerPartner.js";

export const createCustomerPartner = async (req, res) => {
  const { customerCode, partnerFunc, partnerCode } = req.body;
  try {
    const check = await MasterCustomerPartner.findOne({
      where: {
        CustomerCode: customerCode,
        partnerFunc: partnerFunc,
        partnerCode: partnerCode,
      },
    });
    if (check) return res.status(400).json({ msg: "data sudah tersedia" });
    await MasterCustomerPartner.create({
      CustomerCode: customerCode,
      PartnerFunc: partnerFunc,
      PartnerCode: !partnerCode ? customerCode : partnerCode,
    });
    res.status(200).json({ msg: "create berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllCustomerPartner = async (req, res) => {
  try {
    const response = await MasterCustomerPartner.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCustomerPartnerByCustomerCode = async (req, res) => {
  try {
    const response = await MasterCustomerPartner.findAll({
      where: {
        CustomerCode: req.params.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getCustomerPartnerByCode = async (req, res) => {
  try {
    const response = await MasterCustomerPartner.findAll({
      where: {
        CustomerCode: req.params.id,
        PartnerFunc: req.params.id2,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
