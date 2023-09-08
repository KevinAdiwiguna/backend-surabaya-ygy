import PurchaseReturnD from '../../../models/Transaction/Purchase/PurchaseReturnDetail.js'

import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const getAllpurchaseReturnd = async (req, res) => {
    try {
        const response = await PurchaseReturnD.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getPurchaseReturnByCode = async (req, res) => {
    const getpurchasereturnd = await PurchaseReturnD.findAll({
        where: {
            DocNo: req.params.id,
        }
    })
    if (!getpurchasereturnd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getpurchasereturnd)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatepurchaseReturnD = async (req, res) => {
    const { docNo, number, materialCode, info, location, batchNo , unit, qty, price, gross, discPercent, discPercent2, discPercent3, discValue, discNominal, netto, cost} = req.body

    if (!req.params.id1 || !req.params.id2) {
        return res
            .status(400)
            .json({ msg: "Invalid parameters. Both id1 and id2 are required." });
    }

    try {
        const updpurchasereturnd = await PurchaseReturnD.findOne({
            where: {
                DocNo: req.params.id1,
                Number: req.params.id2
            },
        });

        if (!updpurchasereturnd) return res.status(400).json({ msg: "data tidak ditemukan" })

        const updatedData = {
            MaterialCode: materialCode || updpurchasereturnd.MaterialCode,
            Info: info || updpurchasereturnd.Info,
            Location: location || updpurchasereturnd.Location,
            BatchNo: batchNo || updpurchasereturnd.BatchNo,
            Unit: unit || updpurchasereturnd.Unit,
            Qty: qty || updpurchasereturnd.Qty,
            Price: price || updpurchasereturnd.Price,
            Gross: gross || updpurchasereturnd.Gross,
            DiscPercent: discPercent || updpurchasereturnd.DiscPercent,
            DiscPercent2: discPercent2 || updpurchasereturnd.DiscPercent2,
            DiscPercent3: discPercent3 || updpurchasereturnd.DiscPercent3,
            DiscValue: discValue || updpurchasereturnd.DiscValue,
            DiscNominal: discNominal || updpurchasereturnd.DiscNominal,
            Netto: netto || updpurchasereturnd.Netto,
            Cost: cost || updpurchasereturnd.Cost,
        };

        const [numUpdatedRows, updatedRows] = await PurchaseReturnD.update(
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


export const createpurchaseReturnD = async (req, res) => {
    const crepurchaseReturnD = req.body;

    try {
        const existingNumber = await PurchaseReturnD.findOne({
          attributes: [[sequelize.fn("MAX", sequelize.col("Number")), "maxNumber"]],
          where: {
            DocNo: req.params.id,
          },
        });
    
        const maxNumber = existingNumber.getDataValue("maxNumber");
        let number = maxNumber !== null ? maxNumber + 1 : 1;
    
        const createdPurchaseReturnDetails = await Promise.all(
          purchaseOrderDcreate.map(async (detail) => {
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
                    cost} = detail;
    

                const response = await PurchaseReturnD.create({
                    DocNo: req.params.id,
                    number: number++, 
                    materialCode: materialCode, 
                    info: info,
                    location: location,
                    batchNo: batchNo,
                    unit: unit,
                    qty: qty,
                    price: price,
                    gross: gross,
                    discPercent: discPercent,
                    discPercent2: discPercent2,
                    discPercent3: discPercent3,
                    discValue: discValue,
                    discNominal: discNominal,
                    netto: netto,
                    cost: cost

                });

                return response;
            })
        );

        return res.status(201).json(createdPurchaseReturnDetails);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



export const deletepurchaseReturnd = async (req, res) => {
    const delpurchasereturnd = await PurchaseReturnD.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!delpurchasereturnd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        await delpurchasereturnd.destroy({
            where: {
                DocNo: PurchaseReturnD.DocNo
            }
        })
        res.status(200).json({ msg: "data Deleted" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}