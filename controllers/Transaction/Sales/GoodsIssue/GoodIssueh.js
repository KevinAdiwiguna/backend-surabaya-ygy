import GoodIssueh from '../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js'
import GoodIssued from '../../../../models/Transaction/Sales/GoodIssue/GoodIssued.js'
import SalesOrderd from '../../../../models/Transaction/Sales/SalesOrder/SalesOrderDetail.js'
import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getAllGoodIssueh = async (req, res) => {
	try {
		const response = await GoodIssueh.findAll()
		return res.status(200).json(response)
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}

export const getGoodIssued = async (req, res) => {
	const response = await GoodIssued.findAll({
		where: {
			DocNo: req.params.id,
		},
	})
    res.json(response)
}

export const createGoodIssueh = async (req, res) => {
	// goodissueh
	const { goodsissued, generateDocDate, series, docDate, soDocNo, customerCode, shipToCode, poNo, vehicleNo, parkingListNo, information, status, printCounter, printedBy, printedDate, createdBy, changedBy } = req.body

	const existingHeader = await GoodIssueh.findOne({
		attributes: ['DocNo'],
		where: {
			DocNo: {
				[Op.like]: `${series}-${generateDocDate}-%`,
			},
		},
		order: [[sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), 'DESC']],
		raw: true,
		limit: 1,
	})

	let docNo
	if (existingHeader) {
		const Series = parseInt(existingHeader.DocNo.split('-')[2], 10) + 1
		docNo = `${series}-${generateDocDate}-${Series.toString().padStart(4, '0')}`
	} else {
		docNo = `${series}-${generateDocDate}-0001`
	}
	try {
		await GoodIssueh.create({
			DocNo: docNo,
			Series: series,
			DocDate: docDate,
			SODocNo: soDocNo,
			CustomerCode: customerCode,
			ShipToCode: shipToCode,
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

		if (goodsissued && Array.isArray(goodsissued)) {
			await Promise.all(
				goodsissued.map(async (detail) => {
					const { number, materialCode, info, unit, qty, location, batchNo, qtyReturn, qtyNetto } = detail

					await GoodIssued.create({
						DocNo: docNo,
						Number: number,
						MaterialCode: materialCode,
						Info: info,
						Location: location,
						BatchNo: batchNo,
						Unit: unit,
						Qty: qty,
						QtyReturn: qtyReturn,
						QtyNetto: qtyNetto,
					})
				})
			)
		}
		const responseObject = {
			DocNo: docNo,
			Series: series,
			DocDate: docDate,
			SODocNo: soDocNo,
			CustomerCode: customerCode,
			ShipToCode: shipToCode,
			PONo: poNo,
			VehicleNo: vehicleNo,
			ParkingListNo: parkingListNo,
			Information: information,
			Status: status,
			PrintCounter: printCounter,
			PrintedBy: printedBy,
			PrintedDate: printedDate,
			CreatedBy: createdBy,
			ChangedBy: changedBy,
			goodsissued: goodsissued,
		}

		res.status(201).json(responseObject)
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}
