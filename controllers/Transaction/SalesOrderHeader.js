import SalesOrderHeader from '../../models/Transaction/SalesOrderHeader.js'

export const getAllSalesOrderHeader = async (req, res) => {
    try {
        const salesOrderHeader = await SalesOrderHeader.findAll()
        res.status(200).json(salesOrderHeader)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getSalesOrderByCode = async (req, res) => {
    const salesOrderHeader = await SalesOrderHeader.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!salesOrderHeader) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(salesOrderHeader)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


export const updateSalesOrderHeader = async (req, res) => {
    const { series, docDate, customerCode, shipToCode, taxToCode, salesCode, deliveryDate, poNo, top, discPercent, taxStatus, taxPercent, currency, exchangeRate, totalGross, totalDisc, taxValue, totalNetto, information, status, isPurchaseReturn, createdBy, changedBy } = req.body

    const salesOrderHeader = await SalesOrderHeader.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!salesOrderHeader) return res.status(400).json({ msg: "data tidak ditemukan" })


    try {
        await SalesOrderHeader.update({
            Series: series,
            DocDate: docDate,
            CustomerCode: customerCode,
            ShipToCode: shipToCode,
            TaxToCode: taxToCode,
            SalesCode: salesCode,
            DeliveryDate: deliveryDate,
            PONo: poNo,
            TOP: top,
            DiscPercent: discPercent,
            TaxStatus: taxStatus,
            TaxPercent: taxPercent,
            Currency: currency,
            ExchangeRate: exchangeRate,
            TotalGross: totalGross,
            TotalDisc: totalDisc,
            TaxValue: taxValue,
            TotalNetto: totalNetto,
            Information: information,
            Status: status,
            IsPurchaseReturn: isPurchaseReturn,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        }, {
            where: {
                DocNo: salesOrderHeader.DocNo
            }
        })
        res.status(200).json({ msg: "update berhasiil" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

export const createSalesOrderHeader = async (req, res) => {
    const { docNo, series, docDate, customerCode, shipToCode, taxToCode, salesCode, deliveryDate, poNo, top, discPercent, taxStatus, taxPercent, currency, exchangeRate, totalGross, totalDisc, taxValue, totalNetto, information, status, isPurchaseReturn, createdBy, changedBy } = req.body

    const DocCheck = await SalesOrderHeader.findOne({
        where: {
            DocNo: docNo
        }
    })

    if (DocCheck) return res.status(400).json({ msg: "Doc Sudah Ada" })
    try {
        const response = await SalesOrderHeader.create({
            DocNo: docNo,
            Series: series,
            DocDate: docDate,
            CustomerCode: customerCode,
            ShipToCode: shipToCode,
            TaxToCode: taxToCode,
            SalesCode: salesCode,
            DeliveryDate: deliveryDate,
            PONo: poNo,
            TOP: top,
            DiscPercent: discPercent,
            TaxStatus: taxStatus,
            TaxPercent: taxPercent,
            Currency: currency,
            ExchangeRate: exchangeRate,
            TotalGross: totalGross,
            TotalDisc: totalDisc,
            TaxValue: taxValue,
            TotalNetto: totalNetto,
            Information: information,
            Status: status,
            IsPurchaseReturn: isPurchaseReturn,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteSalesOrderHeader = async (req, res) => {
    const salesOrderHeader = await SalesOrderHeader.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!salesOrderHeader) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        await SalesOrderHeader.destroy({
            where: {
                DocNo: salesOrderHeader.DocNo
            }
        })
        res.status(200).json({ msg: "data Deleted" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}