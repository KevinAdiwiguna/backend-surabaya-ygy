import GoodIssueh from '../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js'
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

export const createGoodIssue = async (req, res) => {
    const { series, generateDocDate, docDate, soDocNo, customerCode, shipCode, poNo, vehicleNo, parkingListNo, information, status, printCounter, printedBy, printedDate, createdBy, changedBy } = req.body
    const existingHeader = await SalesOrderHeader.findOne({
        attributes: ['DocNo'],
        where: {
            DocNo: {
                [Op.like]: `${series}-${generateDocDate}-%`,
            },
        },
        order: [
            [sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), 'DESC'],
        ],
        raw: true,
        limit: 1,
    });


    let DocNo;
    if (existingHeader) {
        const Series = parseInt(existingHeader.DocNo.split('-')[2], 10) + 1;
        DocNo = `${series}-${generateDocDate}-${Series.toString().padStart(4, '0')}`;
    } else {
        DocNo = `${series}-${generateDocDate}-0001`;
    }

    try {
        const response = await GoodIssueh.create({
            DocNo: DocNo,
            DocDate: docDate,
            SODocNo: soDocNo,
            CustomerCode: customerCode,
            ShipCode: shipCode,
            PoNo: poNo,
            VehicleNo: vehicleNo,
            ParkingListNo: parkingListNo,
            Information: information,
            Status: status,
            PrintCounter: printCounter,
            PrintedBy: printedBy,
            PrintedDate: printedDate,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        })
        return res.status(200).json(response)
    } catch (error) {
            res.status(500).json({ msg: error.message })        
    }

}

