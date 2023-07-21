import masterPrice from "../../models/Master/MasterPrice.js";

export const getAllPrice = async (req, res) => {
	try {
		const response = await masterPrice.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.json({ msg: error.message, statusCode: 500 });
	}
}

export const createPrice = async (req, res) => {
	const { begDa, endDa, priceListType, materialCode, currency, unit, minQty, maxQty, price, percentDisc, valueDisc, createdBy, createdDate, changedBy, changeDate } = req.body;

	const codeCheck = masterPrice.findOne({
		where: {
			begDa
		}
	})
if (codeCheck.value) return res.status(400).json({ message: "code udah ada" })
    try {
        await masterPrice.create({
            BegDa: begDa,
            EndDa: endDa,
            PriceListType: priceListType,
            MaterialCode: materialCode,
            Currency: currency,
            Unit: unit,
            MinQty: minQty, 
            MaxQty: maxQty,
            Price: price,
            PercentDisc: percentDisc,
            ValueDisc: valueDisc,
            CreatedBy: createdBy,
            CreatedDate: createdDate,
            ChangedBy: changedBy, 
            ChangedDate: changedDate
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deletePrice = async (req, res) => {
    const begDa = await masterPrice.findOne({
        where: {
            BegDa: req.params.id
        }
    });
    if (!begDa) return res.json({ msg: "code tidak ditemukan" });
    try {
        await masterPrice.destroy({
            where: {
                BegDa: begDa.BegDa
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const getPricebyCode = async (req, res) => {
    try {
        const response = await masterPrice.findOne({
            where: {
                BegDa: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updatePrice = async (req, res) => {
    const { begDa, endDa, priceListType, materialCode, currency, unit, minQty, maxQty, price, percentDisc, valueDisc, createdBy, createdDate, changedBy, changeDate } = req.body;
    const codeCheck = await masterPrice.findOne({
        where: {
            BegDa: req.params.id
        }
    });
    if (!codeCheck) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await masterPrice.update({
            BegDa: begDa,
            EndDa: endDa,
            PriceListType: priceListType,
            MaterialCode: materialCode,
            Currency: currency,
            Unit: unit,
            MinQty: minQty, 
            MaxQty: maxQty,
            Price: price,
            PercentDisc: percentDisc,
            ValueDisc: valueDisc,
            CreatedBy: createdBy,
            CreatedDate: createdDate,
            ChangedBy: changedBy, 
            ChangedDate: changedDate
        }, {
            where: {
                BegDa: codeCheck.BegDa
            }
        });
        res.status(200).json({ msg: "update berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}