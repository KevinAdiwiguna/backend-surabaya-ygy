import Cashflowd from "../../../models/Master/GL/MasterCashflowd.js";
import { Op } from "sequelize";

export const getCashflowd = async (req, res) => {
	try{
		const response = await Cashflowd.findAll();
		res.status(200).json(response);
	} catch (error){
		res.status(500).json({ msg: error.message })
	}
}

export const createCashflowd = async (req, res) => {
	const { cashflowGroup, number, accountNo } = req.body;
	const valid = await Cashflowd.findOne({
		where: {
			[Op.and]: [
				{ CashflowGroup: cashflowGroup },
				{ Number: number },
				{ AccountNo: accountNo}
			]
		}
	})
	if (valid) return res.status(400).json({ msg: 'data Udah ada'});
	try{
		await Cashflowd.create({
			CashflowGroup: cashflowGroup,
			Number: number,
			AccountNo: accountNo
		});
		res.status(201).json({ msg: 'create Berhasil' });
	} catch (error){
		res.status(500).json({ msg: error.message });
	}
}


export const deleteCashflowd = async (req, res) => {
	const del = await Cashflowd.findOne({
		where: {
			[Op.and]: [
				{ CashflowGroup: req.params.id },
				{ Number: req.params.id2 },
				{ AccountNo: req.params.id3 }
			]
		}
	});
	if (!del) return res.status(400).json({ msg: "data tidak ditemukan"});
	try{
		await Cashflowd.destroy({
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


export const getCashflowdByCode = async (req, res) => {
	try{
		const response = await Cashflowd.findOne({
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

export const updateCashflowd = async (req, res) => {
	const { cashflowGroup, number, accountNo } = req.body;
    const updt = await Cashflowd.findOne({
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
        await Cashflowd.update({
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