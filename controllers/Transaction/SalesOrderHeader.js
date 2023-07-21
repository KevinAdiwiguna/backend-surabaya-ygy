
import SalesOrderDetail from '../../models/Transaction/SalesOrderDetail.js'
import SalesOrderHeader from '../../models/Transaction/SalesOrderHeader.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getAllSalesOrderHeader = async (req, res) => {
    try {
        const salesOrderHeader = await SalesOrderHeader.findAll({})
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
    try {
        const {
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
        } = req.body;

        const getDocNo = await SalesOrderHeader.findOne({
            where: {
                DocNo: req.params.id
            }
        });
        if (!getDocNo) return res.status(400).json({ msg: "Data tidak ditemukan" });

        const updatedHeader = await SalesOrderHeader.update({
            CustomerCode: customerCode || getDocNo.CustomerCode,
            ShipToCode: shipToCode || getDocNo.ShipToCode,
            TaxToCode: taxToCode || getDocNo.TaxToCode,
            SalesCode: salesCode || getDocNo.SalesCode,
            DeliveryDate: deliveryDate || getDocNo.DeliveryDate,
            PONo: poNo || getDocNo.PONo,
            TOP: top || getDocNo.TOP,
            DiscPercent: discPercent || getDocNo.DiscPercent,
            TaxStatus: taxStatus || getDocNo.TaxStatus,
            TaxPercent: taxPercent || getDocNo.TaxPercent,
            Currency: currency || getDocNo.Currency,
            ExchangeRate: exchangeRate || getDocNo.ExchangeRate,
            TotalGross: totalGross || getDocNo.TotalGross,
            TotalDisc: totalDisc || getDocNo.TotalDisc,
            TaxValue: taxValue || getDocNo.TaxValue,
            TotalNetto: totalNetto || getDocNo.TotalNetto,
            Information: information || getDocNo.Information,
            Status: status || getDocNo.Status,
            IsPurchaseReturn: isPurchaseReturn || getDocNo.IsPurchaseReturn,
            CreatedBy: createdBy || getDocNo.CreatedBy,
            ChangedBy: changedBy || getDocNo.ChangedBy,
        }, {
            where: {
                DocNo: req.params.id
            }
        });

        res.status(200).json(updatedHeader);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Gagal memperbarui Sales Order Header', error: error.message });
    }
};


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
            generateDocDate
        } = req.body;

        const existingHeader = await SalesOrderHeader.findOne({
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
    try {
        const salesOrderHeader = await SalesOrderHeader.findOne({
            where: {
                DocNo: req.params.id
            }
        });
        if (!salesOrderHeader) return res.status(400).json({ msg: "Data not found" });

        await SalesOrderHeader.update(
            { Status: "DELETED" },
            {
                where: {
                    DocNo: salesOrderHeader.DocNo
                }
            }
        );

        res.status(200).json({ msg: "Data deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};