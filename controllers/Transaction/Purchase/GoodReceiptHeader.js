// import purchaseOrderHeader from '../../../../models/Transaction/Purchase/PurchaseOrderHeader.js'
import goodsReceiptH from '../../../models/Transaction/Purchase/GoodReceiptHeader.js'
import goodsReceiptDetails from '../../../models/Transaction/Purchase/GoodReceiptDetail.js'

export const getAllgoodReceipt = async (req, res) => {
    try {
        const goodreceiptH = await goodsReceiptH.findAll()
        res.status(200).json(goodreceiptH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getgoodReceiptByCode = async (req, res) => {
    const getGoodReceiptH = await goodsReceiptH.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!getGoodReceiptH) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getGoodReceiptH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updateGoodReceiptH = async (req, res) => {
    const { docNo, series, docDate, supplierCode, PODocNo, batchNo , supplierDlvDocNo, vehicleNo, information, printCounter, printedBy, printedDate, status, createdBy, changedBy } = req.body

    const updGoodReceiptH = await goodsReceiptH.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!updGoodReceiptH) return res.status(400).json({ msg: "data tidak ditemukan" })
PrintedDate
    try {
        await goodsReceiptH.update({

            DocNo: docNo || updGoodReceiptH.DocNo,
            Series: series || updGoodReceiptH.Series,
            DocDate: docDate || updGoodReceiptH.DocDate,
            SupplierCode: supplierCode || updGoodReceiptH.SupplierCode,
            PODocNo: PODocNo || updGoodReceiptH.PODocNo,
            BatchNo: batchNo || updGoodReceiptH.BatchNO,
            SupplierDlvDocNo: supplierDlvDocNo || updGoodReceiptH.SupplierDlvDocNo,
            VehicleNo: vehicleNo || updGoodReceiptH.VehicleNo,
            Information: information || updGoodReceiptH.Information,
            PrintCounter: printCounter || updGoodReceiptH.PrintCounter,
            PrintedBy: printedBy || updGoodReceiptH.PrintedBy,
            PrintedDate: printedDate || updGoodReceiptH.PrintedDate,
            Status: status || updPurchaseCostH.Status,
            CreatedBy: createdBy || updPurchaseCostH.CreatedBy,
            ChangedBy: changedBy || updPurchaseCostH.ChangedBy


        }, {
            where: {
                DocNo: updGoodReceiptH.DocNo
            }
        })
        res.status(200).json({ msg: "update berhasiil" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

export const createPurchaseCostH = async (req, res) => {
    const {
            generateDocDate,
            series,
            docDate,
            supplierCode,
            PODocNo,
            supplierDlvDocNo,
            vehicleNo,
            information,
            printCounter,
            printedBy,
            printedDate,
            status,
            createdBy,
            changedBy,
            GoodReceiptd } = req.body;

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
        
                const createHeader = await goodsReceiptH.create({
                    DocNo: DocNo,
                    Series: series,
                    DocDate: docDate,
                    SupplierCode: supplierCode,
                    PODocNo: PODocNo,
                    SupplierDlvDocNo: supplierDlvDocNo,
                    VehicleNo: vehicleNo,
                    BatchNo: batchNo,
                    Information: information,
                    PrintCounter: printCounter,
                    PrintedBy: printedBy,
                    PrintedDate: printedDate,
                    Status: status,
                    CreatedBy: createdBy,
                    ChangedBy: changedBy
                });
        
                if (GoodReceiptd && Array.isArray(GoodReceiptd)) {
                    await Promise.all(
                        GoodReceiptd.map(async (detail) => {
                            const {
                                number,
                                materialCode,
                                info,
                                location,
                                unit,
                                qty
                            } = detail;
        
                            await goodsReceiptDetail.create({
                                DocNo: DocNo,
                                Number: number,
                                MaterialCode: materialCode,
                                Info: info,
                                Location: location,
                                Unit: unit,
                                Qty: qty
                            });
                        })
                    );
                }
        
                const responseObject = {
                    DocNo: DocNo,
                    Series: series,
                    DocDate: docDate,
                    SupplierCode: supplierCode,
                    PODocNo: PODocNo,
                    SupplierDlvDocNo: supplierDlvDocNo,
                    VehicleNo: vehicleNo,
                    BatchNo: batchNo,
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


    export const deleteGoodReceiptH = async (req, res) => {
        try {
        const delgoodreceipth = await goodsReceiptH.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!delgoodreceipth) return res.status(400).json({ msg: "data tidak ditemukan" })
        
        await goodsReceiptH.update(
            { Status: "DELETED" },
            {
                where: {
                    DocNo: delgoodreceipth.DocNo
                }
            }
        );
            res.status(200).json({ msg: "data Deleted" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }


