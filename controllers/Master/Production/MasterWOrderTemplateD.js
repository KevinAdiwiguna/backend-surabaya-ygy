import WOrderTemplated from "../../../models/Master/Production/MasterWOrderTemplateD.js";

export const getAllWOrderTemplated = async (req, res) => {
	try{
		const response = await WOrderTemplated.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}

export const createWOrderTemplated = async (req, res) => {
	const { code, number, formula, materialCode, unit, qty, series, department, location, information } = req.body;
	const create = await WOrderTemplated.findOne({
		where: {
			Code: code
		}
	});
	if (create) return res.status(400).json({ msg: "data udah ada" });
	try{
		await WOrderTemplated.create({
			Code: code, 
			Number: number, 
			Formula: formula, 
			MaterialCode: materialCode,
			Unit: unit,
			Qty: qty,
			Series: series,
			Department: department,
			Location: location,
			Information: information
		});
		res.status(201).json({ msg: "data Created" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}

export const deleteWOrderTemplated = async (req, res) => {
    const del = await WOrderTemplated.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!del) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await WOrderTemplated.destroy({
            where: {
                Code: del.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getWOrderTemplatedByCode = async (req, res) => {
	try{
		const response = await WOrderTemplated.findOne({
			where: {
				Code: req.params.id
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ msg: "data tidak ditemukan" });
	}
}

export const updateWOrderTemplated = async (req, res) => {
	const { code, number, formula, materialCode, unit, qty, series, department, location, information } = req.body;
	const update = await WOrderTemplated.findOne({
		where: {
			Code: req.params.id
		}
	});
	if (!update) return res.status(400).json({ msg: "data tidak ditemukan" });
	try{
		await WOrderTemplated.update({
			Number: number,
			Formula: formula,
			MaterialCode: materialCode,
			Unit: unit,
			Qty: qty,
			Series: series,
			Department: department,
			Location: location,
			Information: information
		}, {
			where: {
				Code: update.Code
			}
		});
		res.status(200).json({ msg: "data Updated" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
}

