import masterBomd from "../../../../models/Master/Production/BOM/MasterBomdModels.js"
import { Op } from "sequelize";

export const getAllBomd = async (req, res) => {
	try {
		const response = await masterBomd.findAll();
		res.status(200).json(response);
	} catch (error){
		res.status(500).json({ msg: error.message});
	}
}

export const createBomd = async (req, res) => {
	const { formula, materialCode, unit, qty } = req.body;
	const valid = await masterBomd.findOne({
		where: {
			[Op.and]: [
				{ Formula: formula },
				{ MaterialCode: materialCode }
			]
		}
	})
	if (valid) return res.status(400).json({ msg: 'data Udah ada'});
	try{
		await masterBomd.create({
			Formula: formula,
			MaterialCode: materialCode,
			Unit: unit,
			Qty: qty
		});
		res.status(201).json({ msg: 'create Berhasil' });
	} catch (error){
		res.status(500).json({ msg: error.message });
	}
}


export const deleteBomd = async (req, res) => {
	const del = await masterBomd.findOne({
		where: {
			[Op.and]: [
				{ Formula: req.params.id },
				{ MaterialCode: req.params.id2 }
			]
		}
	});
	if (!del) return res.status(400).json({ msg: "data tidak ditemukan"});
	try{
		await masterBomd.destroy({
			where: {
				[Op.and]: [
					{ Formula: del.Formula },
					{ MaterialCode: del.MaterialCode }
				]
			}
		});
		res.status(200).json({ msg: "data Deleted" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}

export const getBomdByCode = async (req, res) => {
	try{
		const response = await masterBomd.findOne({
			where: {
				[Op.and]: [
					{ Formula: req.params.id },
					{ MaterialCode: req.params.id2 }
				]
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
}


export const updateBomd = async (req, res) => {
	const { formula, materialCode, unit, qty} = req.body;
	const update = await masterBomd.findOne({
		where: {
			[Op.and]: [
				{ Formula: req.params.id },
				{ MaterialCode: req.params.id2 }
			]
		}
	});
	if (!update) return res.status(400).json({ msg: "code tidak ditemukan"});
	try{
		await masterBomd.update({
			Unit: unit,
			Qty: qty
		}, {
			where: {
				Formula: update.Formula,
				MaterialCode: update.MaterialCode
			}
		});
		res.status(200).json({ msg: "data Updated" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
}

