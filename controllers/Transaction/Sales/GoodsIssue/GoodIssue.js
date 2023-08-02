import GoodIssueh from '../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js'
import GoodIssued from '../../../../models/Transaction/Sales/GoodIssue/GoodIssued.js'
import sequelize from 'sequelize'
import { Op } from 'sequelize'
import SalesOrderd from '../../../../models/Transaction/Sales/SalesOrder/SalesOrderDetail.js'

export const getGoodsIssue = async (req, res) => {
	const goodsIssueh = await GoodIssueh.findOne({
		where: {
			DocNo: req.params.id,
		},
	})
	const goodsIssued = await GoodIssued.findAll({
		where: {
			DocNo: req.params.id,
		},
	})
	return res.status(200).json({ goodsissueh: goodsIssueh, goodsissued: goodsIssued })
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

	const getDocNo = await SalesOrderd.findAll({
		where: {
			DocNo: soDocNo,
		},
	})

	return res.json(getDocNo)


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
