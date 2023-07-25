// import purchaseOrderHeader from '../../../../models/Transaction/Purchase/PurchaseOrderHeader.js'
import purchaseCostHeader from '../../../models/Transaction/Purchase/PurchaseCostHeader.js'

export const getAllpurchaseCostHeader = async (req, res) => {
    try {
        const purchaseCostH = await purchaseCostHeader.findAll()
        res.status(200).json(purchaseCostH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getPurchaseCostByCode = async (req, res) => {
    const getPurchaseCostH = await purchaseCostHeader.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!getPurchaseCostH) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getPurchaseCostH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatePurchaseCostH = async (req, res) => {
    const { docNo, series, docDate, transactionType, supplierCode, supplierTaxTo, supplierInvNo, TOP, taxStatus, taxPercent, taxPrefix, taxNo, currency, exchangeRate, totalCost, taxValue, taxValueInTaxCur, totalNetto, information, invoiceDocNo, status, createdBy, changedBy } = req.body

    const updPurchaseCostH = await purchaseCostHeader.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!updPurchaseCostH) return res.status(400).json({ msg: "data tidak ditemukan" })

    try {
        await purchaseOrderDetail.update({

            DocNo: docNo,
            Series: series,
            DocDate: docDate,
            TransactionType: transactionType,
            SupplierCode: supplierCode,
            SupplierTaxTo: supplierTaxTo,
            SupplierInvNo: supplierInvNo,
            TOP: TOP,
            TaxStatus: taxStatus,
            TaxPercent: taxPercent,
            TaxPrefix: taxPrefix,
            TaxNo: taxNo,
            Currency: currency,
            ExchangeRate: exchangeRate,
            TotalCost: totalCost,
            TaxValue: taxValue,
            TaxValueInTaxCur: taxValueInTaxCur,
            TotalNetto: totalNetto,
            Information: information,
            InvoiceDocNo: invoiceDocNo,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy


        }, {
            where: {
                DocNo: updPurchaseCostH.DocNo
            }
        })
        res.status(200).json({ msg: "update berhasiil" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

export const createPurchaseCostH = async (req, res) => {
    const {
            docNo,
            series,
            docDate,
            transactionType,
            supplierCode,
            supplierTaxTo,
            supplierInvNo,
            TOP,
            taxStatus,
            taxPercent,
            taxPrefix,
            taxNo,
            currency,
            exchangeRate,
            totalCost,
            taxValue,
            taxValueInTaxCur,
            totalNetto,
            information,
            invoiceDocNo,
            status,
            createdBy,
            changedBy } = req.body
    }

    export const deletePurchaseCostHeader = async (req, res) => {
        const delPurchaseCostH = await purchaseCostHeader.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!delPurchaseCostH) return res.status(400).json({ msg: "data tidak ditemukan" })
        try {
            await purchaseCostHeader.destroy({
                where: {
                    DocNo: delPurchaseCostH.DocNo
                }
            })
            res.status(200).json({ msg: "data Deleted" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }


