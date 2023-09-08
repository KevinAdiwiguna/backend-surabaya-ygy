// import purchaseOrderHeader from '../../../../models/Transaction/Purchase/PurchaseOrderHeader.js'
import purchaseReturnH from '../../../models/Transaction/Purchase/PurchaseReturnHeader.js'
import purchaseReturnDetails from '../../../models/Transaction/Purchase/PurchaseReturnDetail.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getAllpurchaseReturnH = async (req, res) => {
    try {
        const purchasereturnH = await purchaseReturnH.findAll()
        res.status(200).json(goodreceiptH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getpurchaseReturnByCode = async (req, res) => {
    const getPurchaseReturnH = await purchaseReturnH.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!getPurchaseReturnH) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getPurchaseReturnH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatePurchaseReturnH = async (req, res) => {
    const { docNo, series, docDate, SODocNo, GIDocNo, supplierCode, supplierTaxTo , supplierDocNo, taxNo, taxDate, currency, exchangeRate, taxStatus, taxPercent, taxPrefix, discPercent, totalGross, totalDisc, taxValue, taxValueInTaxCur, totalNetto, totalCost, information, status, printCounter, printedBy, printedDate, createdBy, changedBy } = req.body

    const updPurchaseReturnH = await purchaseReturnH.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!updPurchaseReturnH) return res.status(400).json({ msg: "data tidak ditemukan" })

    try {
        await purchaseReturnH.update({

            DocNo: docNo || updPurchaseReturnH.DocNo,
            Series: series || updPurchaseReturnH.Series,
            DocDate: docDate || updPurchaseReturnH.DocDate,
            SODocNo: SODocNo || updPurchaseReturnH.SODocNo,
            GIDocNo: GIDocNo || updPurchaseReturnH.GIDocNo,
            SupplierCode: supplierCode || updGoodReceiptH.SupplierCode,
            SupplierTaxTo: supplierTaxTo || updPurchaseReturnH.SupplierTaxTo,
            SupplierDocNo: supplierDocNo || updPurchaseReturnH.SupplierDocNo,
            TaxNo: taxNo || updPurchaseReturnH.TaxNo,
            TaxDate: taxDate || updPurchaseReturnH.TaxDate,
            Currency: currency || updPurchaseReturnH.Currency,
            ExchangeRate: exchangeRate || updPurchaseReturnH.ExchangeRate,
            TaxStatus: taxStatus || updPurchaseReturnH.TaxStatus,
            TaxPercent: taxPercent || updPurchaseReturnH.TaxPercent,
            TaxPrefix: taxPrefix || updPurchaseReturnH.TaxPrefix,
            DiscPercent: discPercent || updPurchaseReturnH.DiscPercent,
            TotalGross: totalGross || updPurchaseReturnH.TotalGross,
            TotalDisc: totalDisc || updPurchaseReturnH.TotalDisc,
            TaxValue: taxValue || updPurchaseReturnH.TaxValue,
            TaxValueInTaxCur: taxValueInTaxCur || updPurchaseReturnH.TaxValueInTaxCur,
            TotalNetto: totalNetto || updPurchaseReturnH.TotalNetto,
            TotalCost: totalCost || updPurchaseReturnH.TotalCost,
            Information: information || updGoodReceiptH.Information,
            PrintCounter: printCounter || updGoodReceiptH.PrintCounter,
            PrintedBy: printedBy || updGoodReceiptH.PrintedBy,
            PrintedDate: printedDate || updGoodReceiptH.PrintedDate,
            Status: status || updPurchaseCostH.Status,
            CreatedBy: createdBy || updPurchaseCostH.CreatedBy,
            ChangedBy: changedBy || updPurchaseCostH.ChangedBy


        }, {
            where: {
                DocNo: updPurchaseReturnH.DocNo
            }
        })
        res.status(200).json({ msg: "update berhasiil" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

export const createPurchaseReturnH = async (req, res) => {
    const {
            generateDocDate,
            series,
            docDate,
            SODocNo,
            GIDocNo,
            supplierCode,
            supplierTaxTo,
            supplierDocNo,
            taxNo,
            taxDate,
            currency,
            exchangeRate,
            taxStatus,
            taxPercent,
            taxPrefix,
            discPercent,
            totalGross,
            totalDisc,
            taxValue,
            taxValueInTaxCur,
            totalNetto,
            totalCost,
            information,
            status,
            printCounter,
            printedBy,
            printedDate,
            createdBy,
            changedBy,
            PurchaseReturnD } = req.body;

            try {
                const existingHeader = await goodsReceiptH.findOne({
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
        
                const createHeader = await purchaseReturnH.create({
                    DocNo: DocNo,
                    Series: series,
                    DocDate: docDate,
                    SODocNo: SODocNo,
                    GIDocNo: GIDocNo,
                    SupplierCode: supplierCode,
                    SupplierTaxTo: supplierTaxTo,
                    SupplierDocNo: supplierDocNo,
                    TaxNo: taxNo,
                    TaxDate: taxDate,
                    Currency: currency,
                    ExchangeRate: exchangeRate,
                    TaxStatus: taxStatus,
                    TaxPercent: taxPercent,
                    TaxPrefix: taxPrefix,
                    DiscPercent: discPercent,
                    TotalDisc: totalDisc,
                    TaxValue: taxValue,
                    TaxValueInTaxCur: taxValueInTaxCur,
                    TotalNetto: totalNetto,
                    TotalCost: totalCost,
                    Information: information,
                    PrintCounter: printCounter,
                    PrintedBy: printedBy,
                    PrintedDate: printedDate,
                    Status: status,
                    CreatedBy: createdBy,
                    ChangedBy: changedBy
                });
        
                if (PurchaseReturnD && Array.isArray(PurchaseReturnD)) {
                    await Promise.all(
                        PurchaseReturnD.map(async (detail) => {
                            const {
                                materialCode, 
                                info, 
                                location, 
                                batchNo, 
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
                                cost
                            } = detail;
        
                            await purchaseReturnDetails.create({
                                DocNo: DocNo,
                                Number: number, 
                                MaterialCode: materialCode, 
                                Info: info,
                                Location: location,
                                BatchNo: batchNo,
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
                                Cost: cost
                            });
                        })
                    );
                }
        
                const responseObject = {
                    DocNo: DocNo,
                    Series: series,
                    DocDate: docDate,
                    SODocNo: SODocNo,
                    GIDocNo: GIDocNo,
                    SupplierCode: supplierCode,
                    SupplierTaxTo: supplierTaxTo,
                    SupplierDocNo: supplierDocNo,
                    TaxNo: taxNo,
                    TaxDate: taxDate,
                    Currency: currency,
                    ExchangeRate: exchangeRate,
                    TaxStatus: taxStatus,
                    TaxPercent: taxPercent,
                    TaxPrefix: taxPrefix,
                    DiscPercent: discPercent,
                    TotalDisc: totalDisc,
                    TaxValue: taxValue,
                    TaxValueInTaxCur: taxValueInTaxCur,
                    TotalNetto: totalNetto,
                    TotalCost: totalCost,
                    Information: information,
                    PrintCounter: printCounter,
                    PrintedBy: printedBy,
                    PrintedDate: printedDate,
                    Status: status,
                    CreatedBy: createdBy,
                    ChangedBy: changedBy,
                    GoodReceiptd: GoodReceiptd
                };
        
                res.status(200).json(responseObject);
        
            } catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Failed to create Sales Order Header', error: error.message });
            }
        };


    export const deletePurchaseReturnH = async (req, res) => {
        try {
        const delpurchasereturnh = await purchaseReturnH.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!delpurchasereturnh) return res.status(400).json({ msg: "data tidak ditemukan" })
        
        await purchaseReturnH.update(
            { Status: "DELETED" },
            {
                where: {
                    DocNo: delpurchasereturnh.DocNo
                }
            }
        );
            res.status(200).json({ msg: "data Deleted" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }


 