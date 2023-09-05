import Budgeth from "../../../models/Master/GL/MasterBudgeth.js";
import { Op } from "sequelize";

export const getBudgeth = async (req, res) => {
	try{
		const response = await Budgeth.findAll();
		res.status(200).json(response);
	} catch (error){
		res.status(500).json({ msg: error.message })
	}
}

export const createBudgeth = async (req, res) => {
	const { code, year, name, createdBy, changedBy } = req.body;
	const valid = await Budgeth.findOne({
		where: {
			[Op.and]: [
				{ Code: code },
				{ Year: year }
			]
		}
	})
	if (valid) return res.status(400).json({ msg: 'data Udah ada'});
	try{
		await Budgeth.create({
			Code: code,
			Year: year,
			Name: name,
			CreatedBy: createdBy,
			ChangedBy: changedBy
		});
		res.status(201).json({ msg: 'create Berhasil' });
	} catch (error){
		res.status(500).json({ msg: error.message });
	}
}


export const deleteBudgeth = async (req, res) => {
	const del = await Budgeth.findOne({
		where: {
			[Op.and]: [
				{ Code: req.params.id },
				{ Year: req.params.id2 }
			]
		}
	});
	if (!del) return res.status(400).json({ msg: "data tidak ditemukan"});
	try{
		await Budgeth.destroy({
			where: {
				[Op.and]: [
					{ Code: del.Code },
					{ Year: del.Year }
				]
			}
		});
		res.status(200).json({ msg: "data Deleted" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}


export const getBudgethByCode = async (req, res) => {
	try{
		const response = await Budgeth.findOne({
			where: {
				[Op.and]: [
					{ Code: req.params.id },
					{ Year: req.params.id2 }
				]
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
}

export const updateBudgeth = async (req, res) => {
	const { code, year, accountNo, budget } = req.body;
    const updt = await Budgeth.findOne({
        where: {
            [Op.and]: [
            	{ Code: req.params.id },
				{ Year: req.params.id2 }
            ]
        }
    });
    if (!updt) return res.json({ msg: "data tidak ditemukan" });
    try {
        await Budgeth.update({
            Code: code,
            Year: year,
            Name: name,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        }, {
            where: {
                Code: updt.Code,
                Year: updt.Year
            }
        });

        res.status(200).json({ msg: "data Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}