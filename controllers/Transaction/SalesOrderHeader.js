import SalesOrderHeader from '../../models/Transaction/SalesOrderHeader.js'
import SalesOrderDetail from '../../models/Transaction/SalesOrderDetail.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'
import salesOrderDetail from '../../models/Transaction/SalesOrderDetail.js'

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
    try {
        const {
            series,
            docDate,
            customerCode,
            shipToCode,
            taxToCode,
            salesCode,
            deliveryDate,
            poNo,
            top,
            discPercent,
            taxStatus,
            taxPercent,
            currency,
            exchangeRate,
            totalGross,
            totalDisc,
            taxValue,
            totalNetto,
            information,
            status,
            isPurchaseReturn,
            createdBy,
            changedBy,
            salesOrderDetail,
        } = req.body;

        const existingHeader = await SalesOrderHeader.findOne({
            attributes: ['DocNo'],
            where: {
                DocNo: {
                    [Op.like]: `${series}-${docDate}-%`,
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
            let Series = parseInt(existingHeader.DocNo.split('-')[2], 10);
            Series = (Series + 1).toString();
            Series = Series.padStart(4, '0');
            DocNo = `${series}-${docDate}-${Series}`;
        } else {
            DocNo = `${series}-${docDate}-0001`;
        }

        const createdHeader = await SalesOrderHeader.create({
            DocNo: DocNo,
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
            ChangedBy: changedBy,
        });

        if (salesOrderDetail && Array.isArray(salesOrderDetail)) {
            await Promise.all(
                salesOrderDetail.map(async (detail) => {
                    const {
                        number,
                        materialCode,
                        info,
                        unit,
                        qty,
                        price,
                        gross,
                        discPercent1,
                        discPercent2,
                        discPercent3,
                        discValue,
                        discNominal,
                        netto,
                        qtyDelivered,
                        qtyWO,
                    } = detail;

                    await SalesOrderDetail.create({
                        DocNo: DocNo,
                        Number: number,
                        MaterialCode: materialCode,
                        Info: info,
                        Unit: unit,
                        Qty: qty,
                        Price: price,
                        Gross: gross,
                        DiscPercent: discPercent1,
                        DiscPercent2: discPercent2,
                        DiscPercent3: discPercent3,
                        DiscValue: discValue,
                        DiscNominal: discNominal,
                        Netto: netto,
                        QtyDelivered: qtyDelivered,
                        QtyWO: qtyWO,
                    });
                })
            );
        }

        res.status(200).json(createdHeader);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Failed to create Sales Order Header', error: error.message });
    }
};



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