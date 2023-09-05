import Budgetd from "../../../models/Master/GL/MasterBudgetd.js";
import { Op } from "sequelize";

export const getBudgetd = async (req, res) => {
	try{
		const response = await Budgetd.findAll();
		res.status(200).json(response);
	} catch (error){
		res.status(500).json({ msg: error.message })
	}
}

export const createBudgetd = async (req, res) => {
	const { code, year, accountNo, budget } = req.body;
	const valid = await Budgetd.findOne({
		where: {
			[Op.and]: [
				{ Code: code },
				{ Year: year },
				{ AccountNo: accountNo},
				{ Budget: budget}
			]
		}
	})
	if (valid) return res.status(400).json({ msg: 'data Udah ada'});
	try{
		await Budgetd.create({
			Code: code,
			Year: year,
			AccountNo: accountNo,
			Budget: budget
		});
		res.status(201).json({ msg: 'create Berhasil' });
	} catch (error){
		res.status(500).json({ msg: error.message });
	}
}


export const deleteBudgetd = async (req, res) => {
	const del = await Budgetd.findOne({
		where: {
			[Op.and]: [
				{ Code: req.params.id },
				{ Year: req.params.id2 },
				{ AccountNo: req.params.id3},
				{ Budget: req.params.id4}
			]
		}
	});
	if (!del) return res.status(400).json({ msg: "data tidak ditemukan"});
	try{
		await Budgetd.destroy({
			where: {
				[Op.and]: [
					{ Code: del.Code },
					{ Year: del.Year },
					{ AccountNo: del.AccountNo},
					{ Budget: del.Budget}
				]
			}
		});
		res.status(200).json({ msg: "data Deleted" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}


export const getBudgetdByCode = async (req, res) => {
	try{
		const response = await Budgetd.findOne({
			where: {
				[Op.and]: [
					{ Code: req.params.id },
					{ Year: req.params.id2 },
					{ AccountNo: req.params.id3},
					{ Budget: req.params.id4}
				]
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
}

export const updateBudgetd = async (req, res) => {
	const { code, year, accountNo, budget } = req.body;
    const updt = await Budgetd.findOne({
        where: {
            [Op.and]: [
            	{ Code: req.params.id },
				{ Year: req.params.id2 },
				{ AccountNo: req.params.id3},
				{ Budget: req.params.id4}
            ]
        }
    });
    if (!updt) return res.json({ msg: "data tidak ditemukan" });
    try {
        await Budgetd.update({
            Code: code,
            Year: year,
            AccountNo: accountNo,
            Budget: budget
        }, {
            where: {
                Code: updt.Code,
                Year: updt.Year,
                AccountNo: updt.AccountNo,
                Budget: updt.AccountNo
            }
        });

        res.status(200).json({ msg: "data Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}