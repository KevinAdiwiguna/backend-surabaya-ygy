import ARRequestListh from '../../../models/Transaction/Account Receivable/ARRequestListHeader.js'
import ARRequestlistds from '../../../models/Transaction/Account Receivable/ARRequestListDetail.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getAllARrequestlishh = async (req, res) => {
    try {
        const requestlisth = await ARRequestListh.findAll()
        res.status(200).json(requestlisth)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getrequestlisthByCode = async (req, res) => {
    const requestListh = await ARRequestListh.findAll({
        where: {
            DocNo: req.params.id
        }
    })
    if (!requestListh) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(requestListh)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updateRequestListh = async (req, res) => {
    try {

        const { docNo, series, docDate, collectorCode, customerGroup, salesArea1, salesArea2, salesArea3, currency, totalCustomer, totalDocument, totalValue, information, status, printCounter, printedBy, printedDate, createdBy, changedBy } = req.body

        const requestListh = await ARRequestListh.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!requestListh) return res.status(400).json({ msg: "data tidak ditemukan" })


        const updateHeader = await ARRequestListh.update({

            DocNo: docNo || requestListh.DocNo,
            Series: series || requestListh.Series,
            DocDate: docDate || requestListh.DocDate,
            CollectorCode: collectorCode || requestListh.CollectorCode,
            CustomerGroup: customerGroup || requestListh.CustomerGroup,
            SalesArea1: salesArea1 || requestListh.SalesArea1,
            SalesArea2: salesArea2 || requestListh.SalesArea2,
            SalesArea3: salesArea3 || requestListh.SalesArea3,
            Currency: currency || requestListh.Currency,
            TotalCustomer: totalCustomer || requestListh.TotalCustomer,
            TotalDocument: totalDocument || requestListh.TotalDocument,
            TotalValue: totalValue || requestListh.TotalValue,
            PrintCounter: printCounter || requestListh.PrintCounter,
            PrintedBy: printedBy || requestListh.PrintedBy,
            PrintedDate: printedDate || requestListh.PrintedDate,
            Information: information || requestListh.Information,
            Status: status || requestListh.Status,
            CreatedBy: createdBy || requestListh.CreatedBy,
            ChangedBy: changedBy || requestListh.ChangedBy
        }, {
            where: {
                DocNo: requestListh.DocNo
            }
        })
        res.status(200).json({ msg: "update berhasiil" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}


export const createPurchaseRequestH = async (req, res) => {
    const {
        generateDocDate,
        series, docDate, collectorCode, customerGroup, salesArea1, salesArea2, salesArea3, currency, totalCustomer, totalDocument, totalValue, information, status, printCounter, printedBy, printedDate, createdBy, changedBy,
        RequestListD
    } = req.body;

    try {
        const existingHeader = await ARRequestListh.findOne({
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

        const createHeader = await ARRequestListh.create({
            DocNo: DocNo,
            Series: series,
            DocDate: docDate,
            CollectorCode: collectorCode,
            CustomerGroup: customerGroup,
            SalesArea1: salesArea1,
            SalesArea2: salesArea2,
            SalesArea3: salesArea3,
            Currency: currency,
            TotalCustomer: totalCustomer,
            TotalDocument: totalDocument,
            TotalValue: totalValue,
            Information: information,
            Status: status,
            PrintCounter: printCounter,
            PrintedBy: printedBy,
            PrintedDate: printedDate,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });

        if (RequestListD && Array.isArray(RequestListD)) {
            await Promise.all(
                RequestListD.map(async (detail) => {
                    const {
                        materialCode,
                        info,
                        unit,
                        qty,
                        qtyPO,
                        requiredDate,
                    } = detail;

                    await ARRequestlistds.create({
                        DocNo: DocNo,
                        MaterialCode: materialCode,
                        Info: info,
                        Unit: unit,
                        Qty: qty,
                        QtyPO: qtyPO,
                        RequiredDate: requiredDate
                    });
                })
            );
        }

        const responseObject = {
            DocNo: DocNo,
            series: series,
            docDate: docDate,
            JODoNo: JODoNo,
            trip: trip,
            department: department,
            information: information,
            status: status,
            createdBy: createdBy,
            changedBy: changedBy,
            PurchaseRequestd: PurchaseRequestd
        };

        res.status(200).json(responseObject);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Failed to create Sales Order Header', error: error.message });
    }
};

export const deletePurchaseRequesth = async (req, res) => {
    try {
    const purchaseRequesth = await PurchaseRequesth.findOne({
        where: {
            DocNo: req.params.id
        }
    });
    if (!purchaseRequesth) return res.status(400).json({ msg: "data tidak ditemukan" })
    
        await PurchaseRequesth.update(
            { Status: "DELETED" },
            {
                where: {
                    DocNo: purchaseRequesth.DocNo
                }
            }
        );

        res.status(200).json({ msg: "Data deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


