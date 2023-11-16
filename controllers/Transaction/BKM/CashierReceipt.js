import CashierReceiptH from '../../../models/Transaction/BKM/CashierReceiptH.js';
import CashierReceiptG from '../../../models/Transaction/BKM/CashierReceiptG.js';
import CashierReceiptD from '../../../models/Transaction/BKM/CashierReceiptD.js';
import { Op, Sequelize } from 'sequelize';

export const getCashierReceiptUpdate = async (req, res) => {
    const responseh = await CashierReceiptH.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    const responseg = await CashierReceiptG.findAll({
        where: {
            DocNo: req.params.id
        }
    })
    const rseponsed = await CashierReceiptD.findAll({
        where: {
            DocNo: req.params.id
        }
    })
    res.status(200).json({ h: responseh, g: responseg, d: rseponsed })
}
export const createCashierReceipt = async (req, res) => {
    const {
        series,
        generateDocDate,
        docDate,
        arReqListNo,
        totalDebet,
        totalCredit,
        totalGiro,
        information,
        status,
        printCounter,
        printedBy,
        printedDate,
        createdBy,
        changedBy,
        cashierReceiptGArray,
        cashierReceiptDArray
    } = req.body;

    try {
        // Generate a new DocNo
        const existingHeader = await CashierReceiptH.findOne({
            attributes: ["DocNo"],
            where: {
                DocNo: {
                    [Op.like]: `${series}-${generateDocDate}-%`,
                },
            },
            order: [[Sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), "DESC"]],
            raw: true,
            limit: 1,
        });

        let DocNo;
        if (!existingHeader) {
            DocNo = `${series}-${generateDocDate}-0001`;
        } else {
            const Series = parseInt(existingHeader.DocNo.split("-")[2], 10) + 1;
            DocNo = `${series}-${generateDocDate}-${Series.toString().padStart(4, "0")}`;
        }

        // Create a new CashierReceiptH entry
        const newCashierReceiptH = await CashierReceiptH.create({
            DocNo,
            Series: series,
            DocDate: docDate,
            GenerateDocDate: generateDocDate,
            ARReqListNo: arReqListNo,
            TotalDebet: totalDebet,
            TotalCredit: totalCredit,
            TotalGiro: totalGiro,
            Information: information,
            Status: status,
            PrintCounter: printCounter,
            PrintedBy: printedBy,
            PrintedDate: printedDate,
            CreatedBy: createdBy,
            ChangedBy: changedBy,
        });

        // Create CashierReceiptG entries if cashierReceiptGArray exists
        if (cashierReceiptGArray && cashierReceiptGArray.length > 0) {
            await Promise.all(cashierReceiptGArray.map(async (cashierReceiptGData) => {
                const {
                    bank,
                    giroNo,
                    customerCode,
                    currency,
                    exchangeRate,
                    giroValue,
                    giroValueLocal,
                    transType,
                    depositDate,
                    dueDate,
                    clearingDate,
                    clearExchangeRate,
                    clearValue,
                    rejectDate,
                } = cashierReceiptGData;

                await CashierReceiptG.create({
                    DocNo: DocNo,
                    Bank: bank,
                    GiroNo: giroNo,
                    CustomerCode: customerCode,
                    Currency: currency,
                    ExchangeRate: exchangeRate,
                    GiroValue: giroValue,
                    GiroValueLocal: giroValueLocal,
                    TransType: transType,
                    ReceivedDate: docDate,
                    DepositDate: depositDate,
                    DueDate: dueDate,
                    ClearingDate: clearingDate,
                    ClearExchangeRate: clearExchangeRate,
                    ClearValue: clearValue,
                    RejectDate: rejectDate,
                    Information: information,
                    Status: status,
                    ChangedBy: changedBy,
                });
            }));
        }

        if (cashierReceiptDArray && cashierReceiptDArray.length > 0) {
            await Promise.all(cashierReceiptDArray.map(async (cashierReceiptDData) => {
                const {
                    transType,
                    info,
                    dc,
                    currency,
                    exchangeRate,
                    value,
                    valueLocal
                } = cashierReceiptDData;

                await CashierReceiptD.create({
                    DocNo: DocNo,
                    TransType: transType,
                    Info: info,
                    DC: dc,
                    Currency: currency,
                    ExchangeRate: exchangeRate,
                    Value: value,
                    ValueLocal: valueLocal,
                });
            }))
        }

        return res.status(201).json({ msg: 'CashierReceipt berhasil dibuat', data: newCashierReceiptH });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const printCashierReceipt = async (req, res) => {
    try {
        const response = await CashierReceiptH.findOne({
            where: {
                DocNo: req.params.id
            }
        });
        if (!response) {
            return res.status(400).json({ msg: "Data tidak ditemukan" });
        }
        await CashierReceiptH.update(
            { Status: "PRINTED" },
            { where: { DocNo: req.params.id } }
        );
        return res.status(200).json({ msg: "Data telah dicetak" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};
export const updateCashierReceipt = async (req, res) => {
    const {
        TotalDebet,
        TotalGiro,
        Information,
        Status,
        ChangedBy, cashierG, cashierD } = req.body
    try {
        await CashierReceiptH.update({
            TotalDebet: TotalDebet,
            TotalGiro: TotalGiro,
            Information: Information,
            Status: Status,
            ChangedBy: ChangedBy
        }, {
            where: {
                DocNo: req.params.id
            }
        })

        await CashierReceiptG.destroy({
            where: {
                DocNo: req.params.id
            }
        })

        await CashierReceiptG.bulkCreate(cashierG)
        await CashierReceiptD.destroy({
            where: {
                DocNo: req.params.id
            }
        })

        await CashierReceiptD.bulkCreate(cashierD)

        res.status(200).json({ msg: "berhasil update data" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
export const getAllCashierReceiptH = async (req, res) => {
    try {
        const response = await CashierReceiptH.findAll()
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
