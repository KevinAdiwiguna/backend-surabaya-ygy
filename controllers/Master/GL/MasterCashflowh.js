import Cashflowh from "../../../models/Master/GL/MasterCashflowh.js";
import { Op } from "sequelize";

export const getCashflowh = async (req, res) => {
	try{
		const response = await Cashflowh.findAll();
		res.status(200).json(response);
	} catch (error){
		res.status(500).json({ msg: error.message })
	}
}

export const createCashflowh = async (req, res) => {
	const { cashflowGroup, number, itemText, createdBy, changedBy } = req.body;
	const valid = await Cashflowh.findOne({
		where: {
			[Op.and]: [
				{ CashflowGroup: cashflowGroup },
				{ Number: number }
			]
		}
	})
	if (valid) return res.status(400).json({ msg: 'data Udah ada'});
	try{
		await Cashflowh.create({
			CashflowGroup: cashflowGroup,
			Number: number,
			ItemText: itemText,
			CreatedBy: createdBy,
			ChangedBy: changedBy
		});
		res.status(201).json({ msg: 'create Berhasil' });
	} catch (error){
		res.status(500).json({ msg: error.message });
	}
}


export const deleteCashflowh = async (req, res) => {
	const del = await Cashflowh.findOne({
		where: {
			[Op.and]: [
				{ CashflowGroup: req.params.id },
				{ Number: req.params.id2 },
			]
		}
	});
	if (!del) return res.status(400).json({ msg: "data tidak ditemukan"});
	try{
		await Cashflowh.destroy({
			where: {
				[Op.and]: [
					{ CashflowGroup: del.CashflowGroup },
					{ Number: del.Number },
					{ AccountNo: del.AccountNo}
				]
			}
		});
		res.status(200).json({ msg: "data Deleted" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}


export const getCashflowhByCode = async (req, res) => {
	try{
		const response = await Cashflowh.findOne({
			where: {
				[Op.and]: [
					{ CashflowGroup: req.params.id },
					{ Number: req.params.id2 },
					{ AccountNo: req.params.id3 }
				]
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
}

export const updateCashflowh = async (req, res) => {
	const { cashflowGroup, number, itemText, createdBy, changedBy } = req.body;
    const updt = await Cashflowh.findOne({
        where: {
            [Op.and]: [
            	{ CashflowGroup: req.params.id },
            	{ Number: req.params.id2 },
            	{ AccountNo: req.params.id3 }
            ]
        }
    });
    if (!updt) return res.json({ msg: "data tidak ditemukan" });
    try {
        await Cashflowh.update({
            CashflowGroup: cashflowGroup,
            Number: number,
            AccountNo: accountNo
        }, {
            where: {
                CashflowGroup: updt.CashflowGroup,
                Number: updt.Number,
                AccountNo: updt.AccountNo
            }
        });

        res.status(200).json({ msg: "data Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}