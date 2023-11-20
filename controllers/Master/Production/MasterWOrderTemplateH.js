import WOrderTemplateH from "../../../models/Master/Production/MasterWOrderTemplateH.js";

export const getAllWOrderTemplateh = async (req, res) => {
	try{
		const response = await WOrderTemplateH.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}

export const createWOrderTemplateh = async (req, res) => {
	const { code, formula, materialCode, unit, qty, checkQtyOutput, information, createdBy, changedBy } = req.body;
	const create = await WOrderTemplateH.findOne({
		where: {
			Code: code
		}
	});
	if (create) return res.status(400).json({ msg: "data udah ada" });
	try{
		await WOrderTemplateH.create({
			Code: code, 
			Formula: formula, 
			MaterialCode: materialCode,
			Unit: unit,
			Qty: qty,
			CheckQtyOutput: checkQtyOutput,
			Information: information,
			CreatedBy: createdBy,
			ChangedBy: changedBy
		});
		res.status(201).json({ msg: "data Created" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}

export const deleteWOrderTemplateh = async (req, res) => {
    const del = await WOrderTemplateH.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!del) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await WOrderTemplateH.destroy({
            where: {
                Code: del.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const 	getWOrderTemplatehByCode = async (req, res) => {
	try{
		const response = await WOrderTemplateH.findOne({
			where: {
				Code: req.params.id
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ msg: "data tidak ditemukan" });
	}
}

export const updateWOrderTemplateh = async (req, res) => {
	const { code, formula, materialCode, unit, qty, checkQtyOutput, information, createdBy, changedBy } = req.body;
	const update = await WOrderTemplated.findOne({
		where: {
			Code: req.params.id
		}
	});
	if (!update) return res.status(400).json({ msg: "data tidak ditemukan" });
	try{
		await WOrderTemplateH.update({
			Code: code, 
			Formula: formula, 
			MaterialCode: materialCode,
			Unit: unit,
			Qty: qty,
			CheckQtyOutput: checkQtyOutput,
			Information: information,
			CreatedBy: createdBy,
			ChangedBy: changedBy
		}, {
			where: {
				Code: update.Code
			}
		});
		res.status(200).json({ msg: "data Updated" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
}

