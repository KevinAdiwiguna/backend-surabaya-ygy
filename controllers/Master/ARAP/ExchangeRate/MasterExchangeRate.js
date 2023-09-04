import exchangeRateModal from "../../../../models/Master/ARAP/ExchangeRate/MasterExchangeRate.js";

export const getAllExchangeRate = async (req, res) => {
  try {
    const response = await exchangeRateModal.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteExchangeRate = async (req, res) => {
  try {
    await exchangeRateModal.destroy({
      where: req.params.id,
    });
  } catch (error) {
    res.status(200).json({ msg: error.message });
  }
};

export const getExchangeRate = async (req, res) => {
  try {
    const periode = new Date(req.params.id1);
    if (isNaN(periode)) {
      return res.status(400).json({ msg: "Invalid date format" });
    }
    const response = await exchangeRateModal.findOne({
      where: {
        Periode: periode,
        Currency: req.params.id2,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateExchangeRate = async (req, res) => {
  let { exchangeRate, createdBy, changedBy } = req.body;

  const periode = new Date(req.params.id1);
  if (isNaN(periode)) {
    return res.status(400).json({ msg: "Invalid date format" });
  }
  try {
    const response = await exchangeRateModal.findOne({
      where: {
        Periode: periode,
        Currency: req.params.id2,
      },
    });
    if (!response) return res.status(400).json({ msg: "data tidak ada" });

    await exchangeRateModal.update(
      {
        ExchangeRate: exchangeRate,
        CreatedBy: createdBy,
        ChangedBy: changedBy,
      },
      {
        where: {
          Periode: periode,
          Currency: req.params.id2,
        },
      }
    );

    res.status(200).json({ msg: "update berhasil berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getExhangeRateByPeriode = async (req, res) => {
  try {
    const periode = new Date(req.params.id);
    if (isNaN(periode)) {
      return res.status(400).json({ msg: "Invalid date format" });
    }

    const response = await exchangeRateModal.findAll({
      where: {
        Periode: periode,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getExhangeRateByCurrency = async (req, res) => {
  try {
    const response = await exchangeRateModal.findAll({
      where: {
        Currency: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createExchangeRateByCurrency = async (req, res) => {
  let { currency, exchangeRate, createdBy, changedBy } = req.body;

  const periode = new Date(req.body.periode);
  if (isNaN(periode)) {
    return res.status(400).json({ msg: "Invalid date format" });
  }

  try {
    const response = await exchangeRateModal.findOne({
      where: {
        Periode: periode,
        Currency: currency,
      },
    });
    if (response) return res.status(400).json({ msg: "data sudah ada" });

    await exchangeRateModal.create({
      Periode: periode,
      Currency: currency,
      ExchangeRate: exchangeRate,
      CreatedBy: createdBy,
      ChangedBy: changedBy,
    });

    res.status(200).json({ msg: "create berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
