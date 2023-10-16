// import purchaseOrderHeader from '../../../../models/Transaction/Purchase/PurchaseOrderHeader.js'
import purchaseCostHeader from '../../../models/Transaction/Purchase/PurchaseCostHeader.js'
import purchaseCostDetail from '../../../models/Transaction/Purchase/PurchaseCostDetail.js'
import GenerateTaxNo from '../../../models/Master/MasterGenerateTaxNo.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'


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
        await purchaseCostHeader.update({

            DocNo: docNo || updPurchaseCostH.DocNo,
            Series: series || updPurchaseCostH.Series,
            DocDate: docDate || updPurchaseCostH.DocDate,
            TransactionType: transactionType || updPurchaseCostH.TransactionType,
            SupplierCode: supplierCode || updPurchaseCostH.SupplierCode,
            SupplierTaxTo: supplierTaxTo || updPurchaseCostH.SupplierTaxTo,
            SupplierInvNo: supplierInvNo || updPurchaseCostH.SupplierInvNo,
            TOP: TOP || updPurchaseCostH.TOP,
            TaxStatus: taxStatus || updPurchaseCostH.TaxStatus,
            TaxPercent: taxPercent || updPurchaseCostH.TaxPercent,
            TaxPrefix: taxPrefix || updPurchaseCostH.TaxPrefix,
            TaxNo: taxNo || updPurchaseCostH.TaxNo,
            Currency: currency || updPurchaseCostH.Currency,
            ExchangeRate: exchangeRate || updPurchaseCostH.ExchangeRate,
            TotalCost: totalCost || updPurchaseCostH.TotalCost,
            TaxValue: taxValue || updPurchaseCostH.TaxValue,
            TaxValueInTaxCur: taxValueInTaxCur || updPurchaseCostH.TaxValueInTaxCur,
            TotalNetto: totalNetto || updPurchaseCostH.TotalNetto,
            Information: information || updPurchaseCostH.Information,
            InvoiceDocNo: invoiceDocNo || updPurchaseCostH.InvoiceDocNo,
            Status: status || updPurchaseCostH.Status,
            CreatedBy: createdBy || updPurchaseCostH.CreatedBy,
            ChangedBy: changedBy || updPurchaseCostH.ChangedBy


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
        generateDocDate,
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
        changedBy,
        PurchaseCostd } = req.body;


    try {
        if (taxStatus !== "No") {
            const response = await GenerateTaxNo.findOne({
                where: {
                    TaxNo: taxNo,
                },
            });
            if (!response) return res.status(404).json({ msg: "tax no tidak ada" });
            if (!response.TaxNo) return res.status(404).json({ msg: "tax no tidak ada" });
            if (response.DocNo) return res.status(400).json({ msg: "tax sudah di gunakan" })

            await GenerateTaxNo.update({
                DocNo: DocNo,
            }, {
                where: {
                    TaxNo: taxNo
                }
            });
        }


        const existingHeader = await purchaseCostHeader.findOne({
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

        await purchaseCostHeader.create({
            DocNo: DocNo,
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
        });

        if (PurchaseCostd && Array.isArray(PurchaseCostd)) {
            await Promise.all(
                PurchaseCostd.map(async (detail) => {
                    const {
                        description,
                        cost
                    } = detail;

                    await purchaseCostDetail.create({
                        DocNo: DocNo,
                        Description: description,
                        Cost: cost
                    });
                })
            );
        }

        const responseObject = {
            DocNo: DocNo,
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
            ChangedBy: changedBy,
            PurchaseCostd: PurchaseCostd
        };

        res.status(200).json(responseObject);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};







export const deletePurchaseCostHeader = async (req, res) => {
    try {
        const delPurchaseCostH = await purchaseCostHeader.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!delPurchaseCostH) return res.status(400).json({ msg: "data tidak ditemukan" })

        await purchaseCostHeader.update(
            { Status: "DELETED" },
            {
                where: {
                    DocNo: delPurchaseCostH.DocNo
                }
            }
        );
        res.status(200).json({ msg: "data Deleted" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


