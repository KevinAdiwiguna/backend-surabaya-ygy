import supplierPartner from "../../models/Master/MasterSupplierPartner.js";
import { Op } from "sequelize";

export const getSuppPart = async (req, res) => {
	try {
		const response = await supplierPartner.findAll();
		res.status(200).json(response);
	} catch (error){
		res.status(500).json({ msg: error.message});
	}
}

export const createSuppPart = async (req, res) => {
	const { supplierCode, partnerFunc, partnerCode } = req.body;
	const valid = await supplierPartner.findOne({
		where: {
			[Op.and]: [
				{ SupplierCode: supplierCode },
				{ partnerFunc: partnerFunc },
				{ PartnerCode: partnerCode}
			]
		}
	})
	if (valid) return res.status(400).json({ msg: 'data Udah ada'});
	try{
		await supplierPartner.create({
			SupplierCode: supplierCode,
			PartnerFunc: partnerFunc,
			PartnerCode: partnerCode
		});
		res.status(201).json({ msg: 'create Berhasil' });
	} catch (error){
		res.status(500).json({ msg: error.message });
	}
}


export const deleteSuppPart = async (req, res) => {
	const del = await supplierPartner.findOne({
		where: {
			[Op.and]: [
				{ SupplierCode: req.params.id },
				{ PartnerFunc: req.params.id2 },
				{ PartnerCode: req.params.id3}
			]
		}
	});
	if (!del) return res.status(400).json({ msg: "data tidak ditemukan"});
	try{
		await supplierPartner.destroy({
			where: {
				[Op.and]: [
					{ SupplierCode: del.SupplierCode },
					{ PartnerFunc: del.PartnerFunc },
					{ PartnerCode: del.PartnerCode}
				]
			}
		});
		res.status(200).json({ msg: "data Deleted" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}

export const getSuppPartByCode = async (req, res) => {
	try{
		const response = await supplierPartner.findOne({
			where: {
				[Op.and]: [
					{ SupplierCode: req.params.id },
					{ PartnerFunc: req.params.id2 },
					{ PartnerCode: req.params.id3}
				]
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
}



