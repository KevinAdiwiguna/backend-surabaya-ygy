// import masterBillofMaterial from "../../../models/Master/Production/MasterBillofMaterial.js";
import table1 from "../../../models/Master/Production/BOM/Table1.js";
import table2 from "../../../models/Master/Production/BOM/Table2.js";
import table3 from "../../../models/Master/Production/BOM/Table3.js";
import { Op } from "sequelize";


// async function getAllBom(req, res) {
// 	try {
// 		const combinedData = await table1.findAll({
// 			include: [
// 			{
// 				model: table1, 
// 				as: 'table1'
// 			},
// 			{
// 				model: table2,
// 				as: 'table2'
// 			}
// 			]
// 		});
// 		res.status(200).json({combinedData});
// 	} catch (error){
// 		res.status(500).json({msg: error.message})
// 	}
// }
 

export const getAllBom = async (req, res) => {
	try {
		const combinedData = await table1.findAll({
			include: [
			{
				model: table1, 
				as: 'table1'
			},
			{
				model: table2,
				as: 'table2'
			}
			]
		});
		res.status(200).json({combinedData});
	} catch (error) {
		res.status(500).json({msg: error.message});
	}
}

// export const createBillofMaterial = async (req, res) => {
// 	const { formula, materialCode, unit, qty, percentValue } = req.body;
// 	const validation = await masterBillofMaterial.findOne({
// 		where: {
// 			[Op.and]: [
// 				{Formula: formula},
// 				{MaterialCode: materialCode}
// 			]
// 		}
// 	})
// 	if (validation) return res.status(400).json({ msg: 'data udah ada' })
// 		try{
// 			await masterBillofMaterial.create({
// 				Formula: formula, 
// 				MaterialCode: materialCode, 
// 				Unit: unit, 
// 				Qty: qty, 
// 				PercentValue: percentValue
// 			});
// 			res.status(201).json({ msg: 'data Created'});
// 		} catch (error) {
// 			res.status(400).json({ msg: error.message });
// 		}
// }

// export const deleteBillofMaterial = async (req, res) => {
// 	const del = await masterBillofMaterial.destroy({
// 		where: {
// 			[Op.and]: [
// 				{Formula: formula},
// 				{MaterialCode: materialCode}
// 			]
// 		}
// 	})
// }

// export const updateBillofMaterial = async (req, res) => {
// 	const { formula, materialCode, unit, qty, percentValue }	
// }
