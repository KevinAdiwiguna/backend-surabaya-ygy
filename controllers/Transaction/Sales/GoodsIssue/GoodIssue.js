import GoodIssueh from "../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js"
import GoodIssued from "../../../../models/Transaction/Sales/GoodIssue/GoodIssued.js"
import SalesOrdersch from "../../../../models/Transaction/Sales/SalesOrder/SalesOrdersch.js"
import sequelize from "sequelize"
import { Op } from "sequelize";

export const getGoodsIssue = async (req, res) => {
	try {
		const salesordersch = await SalesOrdersch.findAll({
			where: {
				DocNo: req.params.id,
			},
			attributes: ["Qty", "Number"],
		})

		const goodsissueh = await GoodIssueh.findAll({
			where: {
				SODocNo: req.params.id,
			},
			attributes: ["DocNo"],
		})

		const docNosArray = goodsissueh.map((g) => g.DocNo)

		const goodsissued = await GoodIssued.findAll({
			where: {
				DocNo: {
					[Op.in]: docNosArray,
				},
			},
		})

		const qtyTotalByNumber = {}

		goodsissued.forEach((item) => {
			if (qtyTotalByNumber[item.Number]) {
				qtyTotalByNumber[item.Number] += parseFloat(item.Qty)
			} else {
				qtyTotalByNumber[item.Number] = parseFloat(item.Qty)
			}
		})

		const result = salesordersch.map((item) => {
			const number = item.Number.toString()
			const qtyFromGoodsIssued = qtyTotalByNumber[number] || 0

			const qtyDifference = parseFloat(item.Qty) - qtyFromGoodsIssued

			return {[number]: qtyDifference}
		})

		return res.json(result)
	} catch (error) {
		return res.json(error.message)
	}
}

export const createGoodsIssue = async (req, res) => {
	const {series, soDocNo, customerCode, shiptoCode, poNo, vehicleNo, parkingListNo, information, status, printCounter, printedBy, printedDate, changedBy, createdBy, DocDate, goodissued, generateDocDate} = req.body

	try {
		const existingHeader = await GoodIssueh.findOne({
			attributes: ["DocNo"],
			where: {
				DocNo: {
					[Op.like]: `${series}-${generateDocDate}-%`,
				},
			},
			order: [[sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), "DESC"]],
			raw: true,
			limit: 1,
		})

		let DocNo
		if (!existingHeader) {
			DocNo = `${series}-${generateDocDate}-0001`
		} else {
			const Series = parseInt(existingHeader.DocNo.split("-")[2], 10) + 1
			DocNo = `${series}-${generateDocDate}-${Series.toString().padStart(4, "0")}`
		}

		await GoodIssueh.create({
			DocNo: DocNo,
			Series: series,
			DocDate: DocDate,
			SODocNo: soDocNo,
			CustomerCode: customerCode,
			ShipToCode: shiptoCode,
			PONo: poNo,
			VehicleNo: vehicleNo,
			PackingListNo: parkingListNo,
			Information: information,
			Status: status,
			PrintCounter: printCounter,
			PrintedBy: printedBy,
			PrintedDate: printedDate,
			CreatedBy: createdBy,
			ChangedBy: changedBy,
		})

		if (goodissued && Array.isArray(goodissued)) {
			await Promise.all(
				goodissued.map(async (detail) => {
					const {number, materialCode, info, location, batchNo, unit, qty, qtyReturn, qtyNetto} = detail
					try {
						await GoodIssued.create({
							DocNo: DocNo,
							Location: location,
							Number: number,
							MaterialCode: materialCode,
							Info: info,
							BatchNo: batchNo,
							Unit: unit,
							Qty: qty,
							QtyReturn: qtyReturn,
							QtyNetto: qtyNetto,
						})
					} catch (error) {
						console.error("Error while saving GoodIssued detail:", error)
					}
				}),
			)
		}
		return res.status(200).json({msg: "data saved", DocNo: DocNo})
	} catch (error) {
		res.status(200).json({msg: error.message})
	}
}
export const getDetailDocNo = async (req, res) => {
	try {
		const goodsissueh = await GoodIssueh.findOne({
			where: {
				DocNo: req.params.id,
			},
		})
		const goodsissued = await GoodIssued.findAll({
			where: {
				DocNo: req.params.id,
			},
		})

		res.status(200).json({goodsissueh: goodsissueh, goodsissued: goodsissued})
	} catch (error) {
		res.status(500).json({msg: error.message})
	}
}

export const getAllDocNo = async (req, res) => {
	try {
		const response = await GoodIssueh.findAll({
			attributes: ["DocNo"],
			where: {
				status: {
					[Op.ne]: "deleted",
				},
			},
		})
		res.status(200).json({response})
	} catch (error) {
		res.status(500).json({msg: error.message})
	}
}
export const updateHeader = async (req, res) => {
	try {
		const {poNo, vehicleNo, information, changedBy} = req.body

		const response = await GoodIssueh.findOne({
			where: {
				DocNo: req.params.id,
			},
		})
		if (!response) return res.status(400).json({msg: "Data tidak ditemukan"})

		const updatedHeader = await GoodIssueh.update(
			{
				PONo: poNo || response.PONo,
				VehicleNo: vehicleNo || response.VehicleNo,
				Information: information || response.Information,
				ChangedBy: changedBy || response.ChangedBy,
			},
			{
				where: {
					DocNo: req.params.id,
				},
			},
		)
		res.status(200).json(updatedHeader)
	} catch (error) {
		console.log(error)
		res.status(500).json({msg: "Gagal memperbarui Sales Order Header", error: error.message})
	}
}

export const updateDetail = async (req, res) => {
	try {
		const {batchNo, docNo, information, location, materialCode, number, qty, qtyNetto, qtyReturn, unit} = req.body

		const response = await GoodIssued.findOne({
			where: {
				DocNo: req.params.id1,
				Number: req.params.id2,
			},
		})

		if (!response) {
			return res.status(400).json({msg: "Data not found"})
		}

		const updatedHeader = await GoodIssued.update(
			{
				BatchNo: batchNo || res.BatchNo,
				DocNo: docNo || res.DocNo,
				Info: information || res.Info,
				Location: location || res.Location,
				MaterialCode: materialCode || res.MaterialCode,
				Number: number || res.Number,
				Qty: qty || res.Qty,
				QtyNetto: qtyNetto || res.QtyNetto,
				QtyReturn: qtyReturn || res.QtyNetto,
				Unit: unit || res.Unit,
			},
			{
				where: {
					DocNo: req.params.id1,
					Number: req.params.id2,
				},
			},
		)

		// if (updatedHeader > 0) {
		// 	return res.status(200).json({msg: "Data updated successfully", updatedRows: updatedHeader})
		// } else {
		// 	return res.status(400).json({msg: "No rows were updated"})
		// }
		res.status(200).json({msg: "Data updated successfully", updatedRows: updatedHeader})
	} catch (error) {
		res.status(500).json({msg: "Failed to update data", error: error.message})
	}
}

export const deleteHeader = async (req, res) => {
	try {
		await GoodIssueh.update(
			{Status: "DELETED"},

			{
				where: {
					DocNo: req.params.id,
				},
			},
		)
		return res.status(200).json({msg: "Data Deleted"})
	} catch (error) {
		res.status(500).json({msg: error.message})
	}
}
export const getTotalQty = async (req, res) => {
	try {
		const response = await SalesOrdersch.findAll({
			where: {
				DocNo: req.params.id,
			},
			attributes: ["Qty", "Number"],
		})
		res.status(200).json(response)
	} catch (error) {
		res.status(500).json({msg: error.message})
	}
}
