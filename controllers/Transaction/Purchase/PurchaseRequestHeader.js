import PurchaseRequesth from '../../../models/Transaction/Purchase/PurchaseRequestHeader.js'

export const getAllpurchaseRequesth = async (req, res) => {
    try {
        const purchaseRequesth = await PurchaseRequesth.findAll()
        res.status(200).json(purchaseRequesth)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getPurchaseRequestByCode = async (req, res) => {
    const purchaseRequesth = await PurchaseRequesth.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!purchaseRequesth) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(purchaseRequesth)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatePurchaseRequest = async (req, res) => {
    const { series, docNo, docDate, information, status, createdBy, changedBy } = req.body

    const purchaseRequesth = await PurchaseRequesth.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!purchaseRequesth) return res.status(400).json({ msg: "data tidak ditemukan" })

    try {
        await PurchaseRequesth.update({

            DocNo: docNo,
            Series: series,
            DocDate: docDate,
            JODocNo: JODoNo,
            Trip: trip,
            Department: department,
            Information: information,
            Status: status,
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

export const createPurchaseRequestH = async (req, res) => {
    const {
        docNo,
        series,
        docDate,
        JODoNo,
        trip,
        department,
        information,
        status,
        createdBy,
        changedBy } = req.body
    }

    export const deletePurchaseRequesth = async (req, res) => {
        const purchaseRequesth = await PurchaseRequesth.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!purchaseRequesth) return res.status(400).json({ msg: "data tidak ditemukan" })
        try {
            await PurchaseRequesth.destroy({
                where: {
                    DocNo: purchaseRequesth.DocNo
                }
            })
            res.status(200).json({ msg: "data Deleted" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }


