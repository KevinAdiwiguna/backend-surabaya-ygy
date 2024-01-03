import PurchaseCostD from '../../../models/Transaction/Purchase/PurchaseCostDetail.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getAllpurchaseCostD = async (req, res) => {
    try {
        const response = await PurchaseCostD.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getPurchaseRequestByCode = async (req, res) => {
    const getpurchasecostd = await PurchaseCostD.findAll({
        where: {
            DocNo: req.params.id,
        }
    })
    if (!getpurchasecostd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(purchaseRequestd)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatePurchaseRequest = async (req, res) => {
    const { docNo, description, cost} = req.body

    if (!req.params.id1 || !req.params.id2) {
        return res
            .status(400)
            .json({ msg: "Invalid parameters. Both id1 and id2 are required." });
    }

    try {
        const updpurchasecostd = await PurchaseCostD.findOne({
            where: {
                DocNo: req.params.id1,
                Description: req.params.id2
            },
        });

        if (!updpurchasecostd) return res.status(400).json({ msg: "data tidak ditemukan" })

        const updatedData = {
            Cost: cost || PurchaseCostD.Cost,

        };

        const [numUpdatedRows, updatedRows] = await PurchaseCostD.update(
            updatedData,
            {
                where: {
                    DocNo: req.params.id1,
                    Description: req.params.id2
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


export const createPurchaseCostD = async (req, res) => {
    const crepurchaseCost = req.body;

    try {
        // Check if the purchase request exists first
        const purchaseCost = await PurchaseCostD.findOne({
            where: {
                DocNo: req.params.id
            }
        });

        if (!purchaseCost) {
            return res.status(404).json({ msg: "Purchase request not found" });
        }

        const createPurchaseCostDetails = await Promise.all(
            crepurchaseCost.map(async (detail) => {
                const {
                    description,
                    cost
                } = detail;

                const response = await PurchaseCostD.create({
                    DocNo: req.params.id,
                    Description: description,
                    Cost: cost,
                });

                return response;
            })
        );

        return res.status(201).json(createPurchaseCostDetails);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



export const deletePurchaseCostd = async (req, res) => {
    const delpurchaseCostd = await PurchaseCostD.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!delpurchaseCostd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        await delpurchaseCostd.destroy({
            where: {
                DocNo: PurchaseCostD.DocNo
            }
        })
        res.status(200).json({ msg: "data Deleted" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}




