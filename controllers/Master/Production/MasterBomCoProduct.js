import masterBomcoProduct from "../../../models/Master/Production/BOM/MasterBomCoProductModels.js"
import { Op } from "sequelize";

export const getAllBomcoProduct = async (req, res) => {
	try {
		const response = await masterBomcoProduct.findAll();
		res.status(200).json(response);
	} catch (error){
		res.status(500).json({ msg: error.message});
	}
}

export const createBomcoProduct = async (req, res) => {
	const { formula, materialCode, unit, qty, percentValue } = req.body;
	const valid = await masterBomcoProduct.findOne({
		where: {
			[Op.and]: [
				{ Formula: formula },
				{ MaterialCode: materialCode }
			]
		}
	})
	if (valid) return res.status(400).json({ msg: 'data Udah ada'});
	try{
		await masterBomcoProduct.create({
			Formula: formula,
			MaterialCode: materialCode,
			Unit: unit,
			Qty: qty,
			PercentValue: percentValue
		});
		res.status(201).json({ msg: 'create Berhasil' });
	} catch (error){
		res.status(500).json({ msg: error.message });
	}
}


export const deleteBomcoProduct = async (req, res) => {
	const del = await masterBomcoProduct.findOne({
		where: {
			[Op.and]: [
				{ Formula: req.params.id },
				{ MaterialCode: req.params.id2 }
			]
		}
	});
	if (!del) return res.status(400).json({ msg: "data tidak ditemukan"});
	try{
		await masterBomcoProduct.destroy({
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

export const getBomcoProductByCode = async (req, res) => {
	try{
		const response = await masterBomcoProduct.findOne({
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


export const updateBomcoProduct = async (req, res) => {
	const { formula, materialCode, unit, qty, percentValue} = req.body;
	const update = await masterBomcoProduct.findOne({
		where: {
			[Op.and]: [
				{ Formula: req.params.id },
				{ MaterialCode: req.params.id2 }
			]
		}
	});
	if (!update) return res.status(400).json({ msg: "code tidak ditemukan"});
	try{
		await masterBomcoProduct.update({
			Unit: unit,
			Qty: qty,
			PercentValue: percentValue

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

