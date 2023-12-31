import masterPrice from "../../models/Master/MasterPrice.js";

export const getAllPrice = async (req, res) => {
  try {
    const response = await masterPrice.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.json({ msg: error.message, statusCode: 500 });
  }
};

export const getPriceByMaterial = async (req, res) => {
  try {
    const response = await masterPrice.findAll({
      where: {
        MaterialCode: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.json({ msg: error.message, statusCode: 500 });
  }
};

export const createPrice = async (req, res) => {
  const { begDa, endDa, priceListType, materialCode, currency, unit, minQty, maxQty, price, percentDisc, valueDisc, createdBy, changedBy } = req.body;

  const validation = await masterPrice.findOne({
    where: {
      Begda: begDa,
      PriceListType: priceListType,
      MaterialCode: materialCode,
      Currency: currency,
      Unit: unit,
      MinQty: minQty,
    },
  });
  if (validation) return res.status(400).json({ message: "code udah ada" });
  try {
    await masterPrice.create({
      Begda: begDa,
      Endda: endDa,
      PriceListType: priceListType,
      MaterialCode: materialCode,
      Currency: currency,
      Unit: unit,
      MinQty: minQty,
      MaxQty: maxQty,
      Price: price,
      PercentDisc: percentDisc ? percentDisc : 0,
      ValueDisc: valueDisc ? valueDisc : 0,
      CreatedBy: createdBy,
      ChangedBy: changedBy,
    });
    res.status(201).json({ msg: "create Berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePrice = async (req, res) => {
  const price = await masterPrice.findOne({
    where: {
      Begda: req.params.id,
      PriceListType: req.params.id2,
      MaterialCode: req.params.id3,
      Currency: req.params.id4,
      Unit: req.params.id5,
      MinQty: req.params.id6,
    },
  });

  if (!price) return res.json({ msg: "code tidak ditemukan" });

  try {
    await masterPrice.destroy({
      where: {
        Begda: price.Begda,
        PriceListType: price.PriceListType,
        MaterialCode: price.MaterialCode,
        Currency: price.Currency,
        Unit: price.Unit,
        MinQty: price.MinQty,
      },
    });
    res.status(200).json({ msg: "data Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getPriceByCode = async (req, res) => {
  try {
    const response = await masterPrice.findOne({
      where: {
        Begda: req.params.id,
        PriceListType: req.params.id2,
        MaterialCode: req.params.id3,
        Currency: req.params.id4,
        Unit: req.params.id5,
        MinQty: req.params.id6,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePrice = async (req, res) => {
  const { endDa, maxQty, price, percentDisc, valueDisc, createdBy, changedBy } = req.body;

  const codeCheck = await masterPrice.findOne({
    where: {
      Begda: req.params.id,
      PriceListType: req.params.id2,
      MaterialCode: req.params.id3,
      Currency: req.params.id4,
      Unit: req.params.id5,
      MinQty: req.params.id6,
    },
  });
  if (!codeCheck) return res.status(400).json({ msg: "data tidak ditemukan" });
  try {
    await masterPrice.update(
      {
        Endda: endDa,
        MaxQty: maxQty,
        Price: price,
        PercentDisc: percentDisc,
        ValueDisc: valueDisc,
        CreatedBy: createdBy,
        ChangedBy: changedBy,
      },
      {
        where: {
          Begda: codeCheck.Begda,
          PriceListType: codeCheck.PriceListType,
          MaterialCode: codeCheck.MaterialCode,
          Currency: codeCheck.Currency,
          Unit: codeCheck.Unit,
          MinQty: codeCheck.MinQty,
        },
      }
    );
    res.status(200).json({ msg: "data Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
