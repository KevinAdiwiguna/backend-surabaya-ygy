// import purchaseOrderHeader from '../../../../models/Transaction/Purchase/PurchaseOrderHeader.js'
import purchaseOrderHeader from '../../../models/Transaction/Purchase/PurchaseOrderHeader.js'

export const getAllpurchaseOrderHeader = async (req, res) => {
    try {
        const purchaseOrderH = await purchaseOrderHeader.findAll()
        res.status(200).json(purchaseOrderH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getPurchaseRequestByCode = async (req, res) => {
    const getPurchaseOrderH = await purchaseOrderHeader.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!getPurchaseOrderH) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getPurchaseOrderH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatePurchaseRequest = async (req, res) => {
    const { docNo, series, transactionType, docDate, supplierCode, deliveryDate, TOP, discPercent, taxStatus, taxPercent, currency, exchangeRate, JODocNo, trip, SIDocNo, totalGross, totalDisc, taxValue, totalNetto, sendTo, information, status, isApproved, approvedBy, approvedDate, printCounter, printedBy, printedDate, isSalesReturn, createdBy, changedBy } = req.body

    const updPurchaseOrderH = await purchaseOrderHeader.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!updPurchaseOrderH) return res.status(400).json({ msg: "data tidak ditemukan" })

    try {
        await purchaseOrderHeader.update({

            DocNo: docNo,
            Series: series,
            TransactionType: transactionType,
            DocDate: docDate,
            supplierCode: supplierCode,
            deliveryDate: deliveryDate,
            TOP: TOP,
            DiscPercent: discPercent,
            TaxStatus: taxStatus,
            TaxPercent: taxPercent,
            Currency: currency, 
            ExchangeRate: exchangeRate,
            JODocNo: JODocNo,
            Trip: trip,
            SIDocNo: SIDocNo,
            TotalGross: totalGross,
            TotalDisc: totalDisc,
            TaxValue: taxValue,
            TotalNetto: totalNetto,
            SendTo: sendTo,
            IsApproved: isApproved,
            ApprovedBy: approvedBy,
            ApprovedDate: approvedDate,
            PrintCounter: printCounter,
            PrintedBy: printedBy,
            PrintedDate: printedDate,
            IsSalesReturn: isSalesReturn,
            Information: information,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        }, {
            where: {
                DocNo: updPurchaseOrderH.DocNo
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
        transactionType,
        docDate,
        supplierCode,
        deliveryDate,
        TOP,
        discPercent,
        taxStatus,
        taxPercent,
        currency,
        exchangeRate,
        JODocNo,
        SIDocNo,
        totalGross,
        totalDisc,
        taxValue,
        totalNetto,
        sendTo,
        isApproved,
        approvedBy,
        approvedDate,
        printCounter,
        printedBy,
        printedDate,
        isSalesReturn,
        status,
        information,
        createdBy,
        changedBy } = req.body
    }

    export const deletePurchaseOrderHeader = async (req, res) => {
        const delPurchaseOrderH = await purchaseOrderHeader.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!delPurchaseOrderH) return res.status(400).json({ msg: "data tidak ditemukan" })
        try {
            await purchaseOrderHeader.destroy({
                where: {
                    DocNo: delPurchaseOrderH.DocNo
                }
            })
            res.status(200).json({ msg: "data Deleted" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }


