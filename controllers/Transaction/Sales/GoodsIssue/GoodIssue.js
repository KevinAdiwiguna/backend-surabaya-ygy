import GoodIssueh from '../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js'
import GoodIssued from '../../../../models/Transaction/Sales/GoodIssue/GoodIssued.js'
import SalesOrdersch from '../../../../models/Transaction/Sales/SalesOrder/SalesOrdersch.js'
import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getGoodsIssue = async (req, res) => {
	try {
		const salesordersch = await SalesOrdersch.findAll({
			where: {
				DocNo: req.params.id,
			},
			attributes: ['Qty', 'Number'],
		})

		const goodsissueh = await GoodIssueh.findAll({
			where: {
				SODocNo: req.params.id,
			},
			attributes: ['DocNo'],
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

		// Menghitung selisih antara salesordersch dan qtyTotalByNumber berdasarkan Number
		const result = salesordersch.map((item) => {
			const number = item.Number.toString()
			const qtyFromGoodsIssued = qtyTotalByNumber[number] || 0 // Jika tidak ada di qtyTotalByNumber, maka dianggap 0

			// Menghitung selisihnya
			const qtyDifference = parseFloat(item.Qty) - qtyFromGoodsIssued

			return { [number]: qtyDifference }
		})

		return res.json(result)
	} catch (error) {
		return res.json(error.message)
	}
}

export const createGoodsIssue = async (req, res) => {
	const { series, soDocNo, customerCode, shiptoCode, poNo, vehicleNo, parkingListNo, information, status, printCounter, printedBy, printedDate, changedBy, createdBy, DocDate, goodissued, generateDocDate } = req.body

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

	let DocNo
	if (!existingHeader) {
		DocNo = `${series}-${generateDocDate}-0001`
	} else {
		const Series = parseInt(existingHeader.DocNo.split('-')[2], 10) + 1
		DocNo = `${series}-${generateDocDate}-${Series.toString().padStart(4, '0')}`
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
				const { number, materialCode, info, location, batchNo, unit, qty, qtyReturn, qtyNetto } = detail

				await GoodIssued.create({
					DocNo: DocNo,
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
}
