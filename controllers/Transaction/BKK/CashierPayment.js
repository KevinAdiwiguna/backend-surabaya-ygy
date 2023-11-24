import CashierPaymentH from '../../../models/Transaction/BKK/CashierPaymentH.js';
import CashierPaymentG from '../../../models/Transaction/BKK/CashierPaymentG.js';
import CashierPaymentD from '../../../models/Transaction/BKK/CashierPaymentD.js';
import { Op, Sequelize } from 'sequelize';

export const getAllCashierPaymentUpdate = async (req, res) => {
    try {
        const response = await CashierPaymentH.findAll()
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getCashierPaymentUpdate = async (req, res) => {
    const responseh = await CashierPaymentH.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    const responseg = await CashierPaymentG.findAll({
        where: {
            DocNo: req.params.id
        }
    })
    const rseponsed = await CashierPaymentD.findAll({
        where: {
            DocNo: req.params.id
        }
    })
    res.status(200).json({ h: responseh, g: responseg, d: rseponsed })
}

export const createCashierPayment = async (req, res) => {
    const { series, generateDocDate, docDate, apRecListNo, supplierCode, totalDebet, totalCredit, totalGiro, information, status, printCounter, printedBy, printedDate, createdBy, changedBy, cashierPaymentGArray, cashierPaymentDArray } = req.body;

    const existingHeader = await CashierPaymentH.findOne({
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

    try {
        const newCashierPaymentH = await CashierPaymentH.create({
            DocNo,
            Series: series,
            DocDate: docDate,
            GenerateDocDate: generateDocDate,
            APRecListNo: apRecListNo,
            SupplierCode: supplierCode,
            TotalDebet: totalDebet,
            TotalCredit: totalCredit,
            TotalGiro: totalGiro,
            Information: information,
            Status: status,
            PrintCounter: printCounter,
            PrintedBy: printedBy,
            PrintedDate: printedDate,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });

        if (cashierPaymentGArray && cashierPaymentGArray.length > 0) {
            await Promise.all(cashierPaymentGArray.map(async (cashierPaymentGData) => {
                const {
                    bank,
                    giroNo,
                    supplierCode,
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
                    information,
                    status,
                } = cashierPaymentGData;

                try {
                    const newCashierPaymentG = await CashierPaymentG.create({
                        DocNo: DocNo,
                        Bank: bank,
                        GiroNo: giroNo,
                        SupplierCode: supplierCode,
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

                    return newCashierPaymentG;
                } catch (error) {
                    throw new Error(`Gagal membuat CashierPaymentG: ${error.message}`);
                }
            }));
        }
        if (cashierPaymentDArray && cashierPaymentDArray.length > 0) {
            await Promise.all(cashierPaymentDArray.map(async (cashierPaymentDData) => {
                const {
                    transType,
                    info,
                    dc,
                    currency,
                    exchangeRate,
                    value,
                    valueLocal,
                    JODocNo
                } = cashierPaymentDData;

                try {
                    const newCashierPaymentD = await CashierPaymentD.create({
                        DocNo: DocNo,
                        TransType: transType,
                        Info: info,
                        DC: dc,
                        Currency: currency,
                        ExchangeRate: exchangeRate,
                        Value: value,
                        ValueLocal: valueLocal,
                        JODocNo: JODocNo
                    });

                    return newCashierPaymentD;
                } catch (error) {
                    throw new Error(`Gagal membuat CashierPaymentG: ${error.message}`);
                }
            }));
        }

        return res.status(201).json({ msg: 'CashierPayment berhasil dibuat', data: newCashierPaymentH });
    } catch (error) {
        return res.status(500).json({ msg: 'Gagal membuat Cashier Payment', error: error.message });
    }
}

export const printCashierPayment = async (req, res) => {
    try {
        const response = await CashierPaymentH.findOne({
            where: {
                DocNo: req.params.id
            }
        });
        if (!response) {
            return res.status(400).json({ msg: "Data tidak ditemukan" });
        }
        await CashierPaymentH.update(
            { Status: "PRINTED" },
            { where: { DocNo: req.params.id } }
        );
        return res.status(200).json({ msg: "Data telah dicetak" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};
