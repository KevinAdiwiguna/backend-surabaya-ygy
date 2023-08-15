import masterBomh from "../../../models/Master/Production/BOM/MasterBomhModels.js"
// import { Op } from "sequelize";

export const getAllBomh = async (req, res) => {
    try {
        const response = await masterBomh.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createBomh = async (req, res) => {
    const { formula, materialCode, unit, qty, isAverageCOGM, createdBy, changedBy } = req.body;
    const user = await masterBomh.findOne({
        where: {
            Formula: formula
        }
    });
    if (user) return res.status(400).json({ msg: "data sudah ada" });
    try {
        await masterBomh.create({
            Formula: formula, 
			MaterialCode: materialCode, 
			Unit: unit, 
			Qty: qty, 
			IsAverageCOGM: isAverageCOGM, 
			CreatedBy: createdBy, 
			ChangedBy: changedBy
        });
        res.status(201).json({ msg: "create Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message});
    }
}

export const deleteBomh = async (req, res) => {
	const del = await masterBomh.findOne({
		where: {
			Formula: req.params.id
		}
	});
	if (!del) return res.status(400).json({ msg: 'data Tidak ditemukan'});
	try {
		await masterBomh.destroy({
			where: {
				Formula: del.Formula
			}
		});
		res.status(200).json({ msg: 'data Deleted' })
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}

export const getBomhByCode = async (req, res) => {
	try {
		const response = await masterBomh.findOne({
			where: {
				Formula: req.params.id
			}
		});
		res.status(200).json(response);
	} catch (error){
		res.status(400).json({ msg: error.message});
	}
}

export const updateBomh = async (req, res) => {
	const { materialCode, unit, qty, isAverageCOGM, createdBy, changedBy} = req.body;
	const update = await masterBomh.findOne({
		where: {
			Formula: req.params.id
		}
	});
	if (!update) return res.status(400).json({ msg: 'data Tidak ditemukan'});
	try{
		await masterBomh.update({
			MaterialCode: materialCode,
			Unit: unit,
			Qty: qty,
			IsAverageCOGM: isAverageCOGM,
			CreatedBy: createdBy,
			ChangedBy: changedBy
		}, {
			where: {
				Formula: update.Formula
			}
		});
		res.status(200).json({ msg: 'data Updated'})
	} catch (error){
		res.status(400).json({ msg: error.message})
	}
}






