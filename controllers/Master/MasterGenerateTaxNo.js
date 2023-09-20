import generateTaxNo from "../../models/Master/MasterGenerateTaxNo.js";
import sequelize, { Op } from 'sequelize'


export const getAllGenerateTaxNo = async (req, res) => {
	let data1 = parseInt(req.params.id, 10)
	let data2 = parseInt(req.params.id2, 10)
	try {
		const response = await generateTaxNo.findAll({
			where: {
				TaxNo: {
					[sequelize.Op.between]: [data1, data2],
				},
			},
		});
		res.status(200).json({ response });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

export const createGenerateTaxNo = async (req, res) => {
	const { start, end } = req.body;

	if (start.length !== 13 || end.length !== 13) {
		return res.status(400).json({ msg: "Start dan End harus memiliki panjang 13 digit" });
	}

	const startNo = BigInt(start); 
	const endNo = BigInt(end);

	try {
		const taxNumbers = [];
		for (let i = startNo; i <= endNo; i++) {
			taxNumbers.push(i.toString());
		}

		const existingTaxNumbers = await generateTaxNo.findAll({
			where: {
				TaxNo: {
					[Op.in]: taxNumbers,
				},
			},
		});

		const newTaxNumbers = taxNumbers.filter((num) => {
			return !existingTaxNumbers.some((existing) => existing.TaxNo === num);
		});

		const createdTaxNumbers = await generateTaxNo.bulkCreate(
			newTaxNumbers.map((num) => ({
				TaxNo: num,
				DocNo: "",
			}))
		);

		res.status(200).json({ msg: "Generate berhasil", data: createdTaxNumbers });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};


export const deleteGenerateTaxNo = async (req, res) => {
	console.log({ data1: req.params.id }, { data2: req.params.id2 })
	const del = await generateTaxNo.findOne({
		where: {
			TaxNo: req.params.id
		}
	});
	if (!del) return res.status(404).json({ msg: "code tidak ditemukan" });
	if (del.DocNo) return res.status(400).json({ msg: "data masih terisi" })
	try {
		await generateTaxNo.destroy({
			where: {
				TaxNo: del.Code
			}
		});
		res.status(200).json({ msg: "data Deleted" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
}