import PurchaseRequestd from '../../../models/Transaction/Purchase/PurchaseRequestDetail.js'

export const getAllpurchaseRequestd = async (req, res) => {
    try {
        const response = await PurchaseRequestd.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getPurchaseRequestByCode = async (req, res) => {
    const purchaseRequestd = await PurchaseRequestd.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!purchaseRequestd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(purchaseRequestd)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatePurchaseRequest = async (req, res) => {
    const { docNo, materialCode, info, unit, qty, qtyPO, requiredDate, createdBy, changedBy } = req.body

    const purchaseRequesth = await PurchaseRequesth.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!purchaseRequesth) return res.status(400).json({ msg: "data tidak ditemukan" })

    try {
        await PurchaseRequesth.update({

            DocNo: docNo,
            MaterialCode: materialCode,
            Info: info,
            Unit: unit,
            Qty: qty,
            QtyPO: qtyPO,
            RequiredDate: requiredDate,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        }, {
            where: {
                DocNo: purchaseRequesth.DocNo
            }
        })
        res.status(200).json({ msg: "update berhasiil" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

export const createPurchaseRequestD = async (req, res) => {
    const {
        docNo,
        materialCode,
        info,
        unit,
        qty,
        qtyPO,
        requiredDate,
        createdBy,
        changedBy } = req.body
    }

    export const deletePurchaseRequestd = async (req, res) => {
        const purchaseRequestd = await PurchaseRequestd.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!PurchaseRequestd) return res.status(400).json({ msg: "data tidak ditemukan" })
        try {
            await PurchaseRequestd.destroy({
                where: {
                    DocNo: purchaseRequestd.DocNo
                }
            })
            res.status(200).json({ msg: "data Deleted" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }




