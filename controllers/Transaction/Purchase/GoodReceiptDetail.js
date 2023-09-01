import GoodReceiptD from '../../../models/Transaction/Purchase/GoodReceiptDetail.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getAllgoodReceiptd = async (req, res) => {
    try {
        const response = await GoodReceiptD.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getGoodReceiptByCode = async (req, res) => {
    const getgoodreceiptd = await GoodReceiptD.findAll({
        where: {
            DocNo: req.params.id,
        }
    })
    if (!getgoodreceiptd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getgoodreceiptd)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updategoodReceiptD = async (req, res) => {
    const { docNo, number, cost, materialCode, info, location, unit, qty} = req.body

    if (!req.params.id1 || !req.params.id2) {
        return res
            .status(400)
            .json({ msg: "Invalid parameters. Both id1 and id2 are required." });
    }

    try {
        const updpurchasecostd = await GoodReceiptD.findOne({
            where: {
                DocNo: req.params.id1,
                Number: req.params.id2
            },
        });

        if (!updpurchasecostd) return res.status(400).json({ msg: "data tidak ditemukan" })

        const updatedData = {
            Cost: cost || GoodReceiptD.Cost,
            MaterialCode: materialCode || GoodReceiptD.MaterialCode,
            Info: info || GoodReceiptD.Info,
            Location: location || GoodReceiptD.Location,
            Unit: unit || GoodReceiptD.Unit,
            Qty: qty || GoodReceiptD.Qty,
        };

        const [numUpdatedRows, updatedRows] = await GoodReceiptD.update(
            updatedData,
            {
                where: {
                    DocNo: req.params.id1,
                    Number: req.params.id2
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


export const createGoodReceiptD = async (req, res) => {
    const cregoodReceiptD = req.body;

    try {
        // Check if the purchase request exists first
        const goodreceiptd = await GoodReceiptD.findOne({
            where: {
                DocNo: req.params.id
            }
        });

        if (!goodreceiptd) {
            return res.status(404).json({ msg: "Purchase request not found" });
        }

        const createGoodReceiptDetails = await Promise.all(
            cregoodReceiptD.map(async (detail) => {
                const {
                    number,
                    materialCode,
                    info,
                    location,
                    unit,
                    qty
                } = detail;

                const response = await GoodReceiptD.create({
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
    const delgoodreceiptd = await GoodReceiptD.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!delgoodreceiptd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        await delgoodreceiptd.destroy({
            where: {
                DocNo: GoodReceiptD.DocNo
            }
        })
        res.status(200).json({ msg: "data Deleted" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}