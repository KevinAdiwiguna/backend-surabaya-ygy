import PurchaseRequestd from '../../../models/Transaction/Purchase/PurchaseRequestDetail.js'

export const getAllpurchaseRequestd = async (req, res) => {
    try {
        const response = await PurchaseRequestd.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getPurchaseRequestByCode = async (req, res) => {
    const purchaseRequestd = await PurchaseRequestd.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!purchaseRequestd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(purchaseRequestd)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatePurchaseRequest = async (req, res) => {
    const { docNo, materialCode, info, unit, qty, qtyPO, requiredDate } = req.body
    
    if (!req.params.id) {
        return res
        .status(400)
        .json({ msg: "Invalid parameters. Both id1 and id2 are required." });
    }
    
    try{
    const purchaseRequestd = await PurchaseRequestd.findOne({
        where: {
            DocNo: req.params.id
        },
    });
    
    if (!purchaseRequestd) return res.status(400).json({ msg: "data tidak ditemukan" })

    const updatedData = {

            DocNo: docNo || purchaseRequestd.DocNo,
            MaterialCode: materialCode || purchaseRequestd.MaterialCode,
            Info: info || purchaseRequestd.Info,
            Unit: unit || purchaseRequestd.Unit,
            Qty: qty || purchaseRequestd.Qty,
            QtyPO: qtyPO || purchaseRequestd.QtyPO,
            RequiredDate: requiredDate || purchaseRequestd.RequiredDate

        };

        const [numUpdatedRows, updatedRows] = await PurchaseRequestd.update(
          updatedData,
          {
            where: {
              DocNo: req.params.id,
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
    

export const createPurchaseRequestD = async (req, res) => {
    const purchaseRequestDetails = req.body;

    try {

        const createPurchaseRequestDetails = await Promise.all(
            purchaseRequestDetails.map(async (detail) => {
                const {
                    docNo,
                    materialCode,
                    info,
                    unit,
                    qty,
                    qtyPO,
                    requiredDate } = detail;


                const response = await PurchaseRequestd.create({
                    DocNo: docNo,
                    MaterialCode: materialCode,
                    Info: info,
                    Unit: unit,
                    Qty: qty,
                    QtyPO: qtyPO,
                    RequiredDate: requiredDate
                });

                return response;
            })
        );

        return res.status(201).json(createdSalesOrderDetails);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const deletePurchaseRequestd = async (req, res) => {
    const purchaseRequestd = await PurchaseRequestd.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!PurchaseRequestd) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        await PurchaseRequestd.destroy({
            where: {
                DocNo: purchaseRequestd.DocNo
            }
        })
        res.status(200).json({ msg: "data Deleted" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}




