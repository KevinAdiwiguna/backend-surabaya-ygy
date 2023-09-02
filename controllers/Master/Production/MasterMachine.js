import masterMachine from "../../../models/Master/Production/MasterMachine.js";

export const getAllMachIne = async (req, res) => {
	try{
		const response = await masterMachine.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}

export const createMachIne = async (req, res) => {
	const { code, description, department, capacityPerHour, unit, createdBy, changedBy } = req.body;
	const create = await masterMachine.findOne({
		where: {
			Code: code
		}
	});
	if (create) return res.status(400).json({ msg: "data udah ada" });
	try{
		await masterMachine.create({
			Code: code,
			Description: description,
			Department: department,
			CapacityPerHour: capacityPerHour,
			Unit: unit,
			CreatedBy: createdBy,
			ChangedBy: changedBy
		});
		res.status(201).json({ msg: "data Created" });
	} catch (error) {
		res.status(400).json({ msg: error.message })
	}
}

export const deleteMachIne = async (req, res) => {
    const del = await masterMachine.findOne({
        where: {
            Code: req.params.id
        }
    });
    if (!del) return res.status(400).json({ msg: "data tidak ditemukan" });
    try {
        await masterMachine.destroy({
            where: {
                Code: del.Code
            }
        });
        res.status(200).json({ msg: "data Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const getMachIneByCode = async (req, res) => {
	try{
		const response = await masterMachine.findOne({
			where: {
				Code: req.params.id
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ msg: "data tidak ditemukan" });
	}
}

export const updateMachIne = async (req, res) => {
	const { code, description, department, capacityPerHour, unit, createdBy, changedBy } = req.body;
	const update = await masterMachine.findOne({
		where: {
			Code: req.params.id
		}
	});
	if (!update) return res.status(400).json({ msg: "data tidak ditemukan" });
	try{
		await masterMachine.update({
			Description: description,
			Department: department,
			CapacityPerHour: capacityPerHour,
			Unit: unit,
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

