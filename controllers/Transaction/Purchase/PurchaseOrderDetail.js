// import purchaseOrderHeader from '../../../../models/Transaction/Purchase/PurchaseOrderHeader.js'
import purchaseOrderDetail from '../../../models/Transaction/Purchase/PurchaseOrderDetail.js'

export const getAllpurchaseOrderDetail = async (req, res) => {
    try {
        const purchaseOrderD = await purchaseOrderDetail.findAll()
        res.status(200).json(purchaseOrderD)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getPurchaseOrderByCode = async (req, res) => {
    const getPurchaseOrderD = await purchaseOrderDetail.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!getPurchaseOrderD) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getPurchaseOrderD)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatePurchaseRequest = async (req, res) => {
    const { docNo, number, materialCode, info, unit, qty, price, gross, discPercent, discPercent2, discPercent3, discValue, discNominal, netto, qtyReceived } = req.body

    const updPurchaseOrderD = await purchaseOrderDetail.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!updPurchaseOrderD) return res.status(400).json({ msg: "data tidak ditemukan" })

    try {
        await purchaseOrderDetail.update({

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
            QtyReceived: qtyReceived



        }, {
            where: {
                DocNo: updPurchaseOrderD.DocNo
            }
        })
        res.status(200).json({ msg: "update berhasiil" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

export const createPurchaseOrderD = async (req, res) => {
    const {
            docNo,
            number,
            materialCode,
            info,
            unit,
            qty,
            price,
            gross,
            discPercent,
            discPercent2,
            discPercent3,
            discValue,
            discNominal,
            netto,
            qtyReceived } = req.body
    }

    export const deletePurchaseOrderDetail = async (req, res) => {
        const delPurchaseOrderD = await purchaseOrderDetail.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!delPurchaseOrderD) return res.status(400).json({ msg: "data tidak ditemukan" })
        try {
            await purchaseOrderDetail.destroy({
                where: {
                    DocNo: delPurchaseOrderD.DocNo
                }
            })
            res.status(200).json({ msg: "data Deleted" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }


