import GoodIssueh from '../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js'
import GoodIssued from '../../../../models/Transaction/Sales/GoodIssue/GoodIssued.js'
import SalesOrderd from '../../../../models/Transaction/Sales/SalesOrder/SalesOrderDetail.js'
import sequelize from 'sequelize'
import { Op } from 'sequelize'


export const getGoodsIssue = async (req, res) => {
	const goodsIssueh = await GoodIssueh.findOne({
		where: {
			DocNo: req.params.id
		}
	})
	const goodsIssued = await GoodIssued.findAll({
		where: {
			DocNo: req.params.id
		}
	})
	return res.status(200).json({ goodsIssueh, goodsIssued})
}