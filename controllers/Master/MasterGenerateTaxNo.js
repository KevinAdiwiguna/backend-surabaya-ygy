import generateTaxNo from "../../models/Master/MasterGenerateTaxNo.js";
import sequelize from 'sequelize'

export const getAllGenerateTaxNo = async (req, res) => {
	try {
		const response = await generateTaxNo.findAll({
			where: {
				taxno: {
					[sequelize.Op.between]: [req.params.id, req.params.id2],
				},
			},
		});
		res.status(200).json(response);
	} catch (error) {
		res.json({ msg: error.message, statusCode: 500 });
	}
};

export const createGenerateTaxNo = async (req, res) => {
	const { taxNo, docNo } = req.body;
	if (taxNo.length < 13) return res.status(400).json({ msg: "Start harus 13 digit" })
	if (docNo.length < 13) return res.status(400).json({ msg: "Start harus 13 digit" })

	const create = await generateTaxNo.findOne({
		where: {
			TaxNo: taxNo
		}
	})
	if (create) return res.status(400).json({ msg: "code Sudah ada" });

	try {
		const startNo = parseInt(taxNo);
		const endNo = parseInt(docNo);

		if (isNaN(startNo) || isNaN(endNo)) {
			return res.status(400).json({ msg: "input tidak valid" });
		}

		for (let i = startNo; i <= endNo; i++) {
			await generateTaxNo.create({
				TaxNo: i.toString(),
				DocNo: docNo
			});
		}

		res.status(201).json({ msg: "data Created" });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
}

export const deleteGenerateTaxNo = async (req, res) => {
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