import generateTaxNo from "../../models/Master/MasterGenerateTaxNo.js";

export const getAllGenerateTaxNo = async (req, res) => {
	try {
		const response = await generateTaxNo.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.json({ msg: error.message, statusCode: 500});
	}
};
