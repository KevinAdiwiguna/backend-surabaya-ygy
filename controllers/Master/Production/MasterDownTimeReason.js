import downTimeReason from "../../../models/Master/Production/MasterDownTimeReasonModels.js";

export const getAllDownTimeReason = async (req, res) => {
	try{
		const response = await downTimeReason.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}

export const createDownTimeReason = async (req, res) => {
	const { code, description, createdBy, changedBy } = req.body;
	const create = await downTimeReason.findOne({
		where: {
			Code: code
		}
	});
	if (create) return res.status(400).json({ msg: "data udah ada" });
	try{
		await downTimeReason.create({
			Code: code,
			Description: description,
			CreatedBy: createdBy,
			ChangedBy: changedBy
		});
		res.status(201).json({ msg: "data Created" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}

export const deleteDownTimeReason = async (req, res) => {
	const del = await downTimeReason.findOne({
		where: {
			Code: req.params.id
		}
	});
	if (!del) return res.status(400).json({ msg: 'data tidak ditemukan'});
	try{
		await downTimeReason.destroy({
			Code: del.Code
		});
		res.status(200).json({ msg: "data Deleted" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}

export const getDownTimeReasonByCode = async (req, res) => {
	try{
		const response = await downTimeReason.findOne({
			where: {
				Code: req.params.id
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ msg: "data tidak ditemukan" });
	}
}

export const updateDownTimeReason = async (req, res) => {
	const { code, description, createdBy, changedBy } = req.body;
	const update = await downTimeReason.findOne({
		where: {
			Code: req.params.id
		}
	});
	if (!update) return res.status(400).json({ msg: "data tidak ditemukan" });
	try{
		await downTimeReason.update({
			Description: description,
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

