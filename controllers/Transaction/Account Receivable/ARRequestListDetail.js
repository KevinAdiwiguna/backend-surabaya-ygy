import ARRequestListd from '../../../models/Transaction/Account Receivable/ARRequestListDetail.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getAllrequestListd = async (req, res) => {
    try {
        const response = await ARRequestListd.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getRequestListByCode = async (req, res) => {
    const getrequestlistd = await ARRequestListd.findAll({
        where: {
            DocNo: req.params.id,
        }
    })
    if (!getrequestlistd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getrequestlistd)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updaterequestListD = async (req, res) => {
    const { docNo, customerCode, ARDocNo, cost, materialCode, info, location, unit, qty} = req.body

    if (!req.params.id1 || !req.params.id2) {
        return res
            .status(400)
            .json({ msg: "Invalid parameters. Both id1 and id2 are required." });
    }

    try {
        const updrequestlistd = await ARRequestListd.findOne({
            where: {
                DocNo: req.params.id1,
                CustomerCode: req.params.id2,
                ARDocNo: req.params.id3
            },
        });

        if (!updrequestlistd) return res.status(400).json({ msg: "data tidak ditemukan" })

        const updatedData = {
            Cost: cost || updpurchasecostd.Cost,
            MaterialCode: materialCode || updpurchasecostd.MaterialCode,
            Info: info || updpurchasecostd.Info,
            Location: location || updpurchasecostd.Location,
            Unit: unit || updpurchasecostd.Unit,
            Qty: qty || updpurchasecostd.Qty,
        };

        const [numUpdatedRows, updatedRows] = await ARRequestListd.update(
            updatedData,
            {
                where: {
                    DocNo: req.params.id1,
                    CustomerCode: req.params.id2,
                    ARDocNo: req.params.id3
                },
                returning: true,
            }
        );

        if (numUpdatedRows === 0) {
            return res.status(200).json({ msg: "No changes to update" });
        }

        res.status(200).json(updatedRows);
    } catch (error) {
        res.status(500).json({ msg: "An error occurred while updating the data" });
    }
};


export const createRequestListD = async (req, res) => {
    const crerequestListD = req.body;

    try {
        // Check if the purchase request exists first
        const requestlistd = await ARRequestListd.findOne({
            where: {
                DocNo: req.params.id
            }
        });

        if (!requestlistd) {
            return res.status(404).json({ msg: "Purchase request not found" });
        }

        const createGoodReceiptDetails = await Promise.all(
            crerequestListD.map(async (detail) => {
                const {
                    number,
                    materialCode,
                    info,
                    location,
                    unit,
                    qty
                } = detail;

                const response = await ARRequestListd.create({
                    DocNo: req.params.id,
                    Number: number,
                    MaterialCode: materialCode,
                    Info: info,
                    Location: location,
                    Unit: unit,
                    Qty: qty


                });

                return response;
            })
        );

        return res.status(201).json(createPurchaseCostDetails);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



export const deletegoodReceiptd = async (req, res) => {
    const delgoodreceiptd = await ARRequestListd.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!delgoodreceiptd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        await delgoodreceiptd.destroy({
            where: {
                DocNo: ARRequestListd.DocNo
            }
        })
        res.status(200).json({ msg: "data Deleted" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}