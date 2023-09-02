import generateTaxNo from "../../models/Master/MasterGenerateTaxNo.js";

export const getAllGenerateTaxNo = async (req, res) => {
	try {
		const response = await generateTaxNo.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.json({ msg: error.message, statusCode: 500});
	}
};

export const createGenerateTaxNo = async (req, res) => {
	const{ taxNo, docNo } = req.body;

	const create = await generateTaxNo.findOne({
		where: {
			TaxNo: taxNo
		}
	})
	if (create) return res.status(400).json({ msg: "code Sudah ada" });

	try{
		const startNo = parseInt(taxNo);
		const endNo = parseInt(docNo);

		if (isNaN(startNo) || isNaN(endNo)){
			return res.status(400).json({ msg: "input tidak valid" });
		}

		for (let i = startNo; i <= endNo; i++){
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
    const del = await masterLocationModel.findOne({
        where: {
            TaxNo: req.params.id
        }
    });
    if (!del) return res.json({ msg: "code tidak ditemukan" });
    try {
        await masterLocationModel.destroy({
            where: {
                TaxNo: del.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}