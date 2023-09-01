import generateTaxNo from "../../models/Master/MasterGenerateTaxNo.js";

export const getAllGenerateTaxNo = async (req, res) => {
	try {
		const response = await generateTaxNo.findAll();
		res.status(200).json(response);
	} catch {
		res.json({ msg: error.message, statusCode: 500});
	}
}


export const createGenerateTaxNo = async (req, res) => {
	const { field1, field2 } = req.body;

	
}