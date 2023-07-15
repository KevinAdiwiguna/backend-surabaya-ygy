import SalesOrderDetail from '../../models/Transaction/SalesOrderDetail.js'

export const getAllSalesOrderDetail = async (req, res) => {
    try {
        const response = await SalesOrderDetail.findAll()
        res.status(200).json(salesOrderHeader)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


export const createSalesOrderDetail = async (req, res) => {
    const { docNo, number, materialCode, info, unit, qty, price, gross, discPercent, discPercent2, discPercent3, discValue, discNominal, netto, qtyDelivered, qtyWo } = req.body

    const DocCheck = await SalesOrderDetail.findOne({
        where: {
            DocNo: docNo
        }
    })
    if (DocCheck) return res.status(400).json({ msg: "Doc Sudah Ada" })
    try {
        await SalesOrderDetail.create({
            DocNo: docNo,
            Number: number,
            MaterialCode: materialCode,
            Info: info,
            Unit: unit,
            Qty: qty,
            Price: price,
            Gross: gross,
            DiscPercent: discPercent,
            DiscPercent2: discPercent2,
            DiscPercent3: discPercent3,
            DiscValue: discValue,
            DiscNominal: discNominal,
            Netto: netto,
            QtyDelivered: qtyDelivered,
            QtyWo: qtyWo
        })
        res.status(200).json({ msg: "create Berhasil" })
    } catch (error) {
        console.log(error)
    }

}

export const updateSalesOrderDetail = async (req, res) => {
    const { docNo, number, materialCode, info, unit, qty, price, gross, discPercent, discPercent2, discPercent3, discValue, discNominal, netto, qtyDelivered, qtyWo } = req.body

    const DocCheck = await SalesOrderDetail.findOne({
        where: {
            DocNo: req.params.id
        }
    })

    if (!DocCheck) return res.status(400).json({ msg: "Doc Tidak Ada" })

    try {
        await SalesOrderDetail.update({
            Number: number,
            MaterialCode: materialCode,
            Info: info,
            Unit: unit,
            Qty: qty,
            Price: price,
            Gross: gross,
            DiscPercent: discPercent,
            DiscPercent2: discPercent2,
            DiscPercent3: discPercent3,
            DiscValue: discValue,
            DiscNominal: discNominal,
            Netto: netto,
            QtyDelivered: qtyDelivered,
            QtyWo: qtyWo
        }, {
            where: {
                DocNo: DocCheck.DocNo
            }
        })
        res.status(200).json({ msg: "update Berhasil" })
    } catch (error) {
        console.log(error)
    }
}

export const deleteSalesOrderDetail = async (req, res) => {
    const DocCheck = await SalesOrderDetail.findOne({
        where: {
            DocNo: req.params.id
        }
    })

    if (!DocCheck) return res.status(400).json({ msg: "Doc Tidak Ada" })

    try {
        await SalesOrderDetail.destroy({
            where: {
                DocNo: DocCheck.DocNo
            }
        })
        res.status(200).json({ msg: "delete Berhasil" })
    } catch (error) {
        console.log(error)
    }
}

