import PurchaseRequesth from '../../../models/Transaction/Purchase/PurchaseRequestHeader.js'
import PurchaseRequestds from '../../../models/Transaction/Purchase/PurchaseRequestDetail.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'

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
    try {

        const { series, docNo, docDate, information, department, trip, JODocNo, status, createdBy, changedBy } = req.body

        const purchaseRequesth = await PurchaseRequesth.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!purchaseRequesth) return res.status(400).json({ msg: "data tidak ditemukan" })


        const updateHeader = await PurchaseRequesth.update({

            DocNo: docNo || purchaseRequesth.DocNo,
            Series: series || purchaseRequesth.Series,
            DocDate: docDate || purchaseRequesth.DocDate,
            JODocNo: JODocNo || purchaseRequesth.JODocNo,
            Trip: trip || purchaseRequesth.Trip,
            Department: department || purchaseRequesth.Department,
            Information: information || purchaseRequesth.Information,
            Status: status || purchaseRequesth.Status,
            CreatedBy: createdBy || purchaseRequesth.CreatedBy,
            ChangedBy: changedBy || purchaseRequesth.ChangedBy
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
        generateDocDate,
        series,
        docDate,
        JODoNo,
        trip,
        department,
        information,
        status,
        createdBy,
        changedBy,
        PurchaseRequestd
    } = req.body;

    try {
        const existingHeader = await PurchaseRequesth.findOne({
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

        const createHeader = await PurchaseRequesth.create({
            DocNo: DocNo,
            Series: series,
            DocDate: docDate,
            JODocNo: JODoNo,
            Trip: trip,
            Department: department,
            Information: information,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });

        if (PurchaseRequestd && Array.isArray(PurchaseRequestd)) {
            await Promise.all(
                PurchaseRequestd.map(async (detail) => {
                    const {
                        materialCode,
                        info,
                        unit,
                        qty,
                        qtyPO,
                        requiredDate,
                    } = detail;

                    await PurchaseRequestds.create({
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


