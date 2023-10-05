import CashierReceiptH from '../../../models/Transaction/BKM/CashierReceiptH.js';
import CashierReceiptG from '../../../models/Transaction/BKM/CashierReceiptG.js';
import CashierReceiptD from '../../../models/Transaction/BKM/CashierReceiptD.js';
import { Op, Sequelize } from 'sequelize';

export const getCashierReceiptUpdate = async (req, res) => {
    const responseh = await CashierReceiptH.findOne({
        where: {
            DocNo: req.prams.id
        }
    })
    const responseg = await CashierReceiptG.findOne({
        where: {
            DocNo: req.prams.id
        }
    })
    res.status(200).json({ h: responseh, g: responseg })
}


export const createCashierReceipt = async (req, res) => {
    const { series, generateDocDate, arReqListNo, totalDebet, totalCredit, totalGiro, information, status, printCounter, printedBy, printedDate, createdBy, changedBy, cashierReceiptGArray, cashierReceiptDArray } = req.body;

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

    try {
        const newCashierReceiptH = await CashierReceiptH.create({
            DocNo,
            Series: series,
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
            ChangedBy: changedBy
        });

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
                    receivedDate,
                    depositDate,
                    dueDate,
                    clearingDate,
                    clearExchangeRate,
                    clearValue,
                    rejectDate,
                    information,
                    status,
                    changedBy,
                    changedDate
                } = cashierReceiptGData;

                try {
                    const newCashierReceiptG = await CashierReceiptG.create({
                        DocNo: DocNo,
                        Bank: bank,
                        GiroNo: giroNo,
                        CustomerCode: customerCode,
                        Currency: currency,
                        ExchangeRate: exchangeRate,
                        GiroValue: giroValue,
                        GiroValueLocal: giroValueLocal,
                        TransType: transType,
                        ReceivedDate: receivedDate,
                        DepositDate: depositDate,
                        DueDate: dueDate,
                        ClearingDate: clearingDate,
                        ClearExchangeRate: clearExchangeRate,
                        ClearValue: clearValue,
                        RejectDate: rejectDate,
                        Information: information,
                        Status: status,
                        ChangedBy: changedBy,
                        ChangedDate: changedDate
                    });

                    return newCashierReceiptG;
                } catch (error) {
                    throw new Error(`Gagal membuat CashierReceiptG: ${error.message}`);
                }
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

                try {
                    const newCashierReceiptD = await CashierReceiptD.create({
                        DocNo: DocNo,
                        TransType: transType,
                        Info: info,
                        DC: dc,
                        Currency: currency,
                        ExchangeRate: exchangeRate,
                        Value: value,
                        ValueLocal: valueLocal
                    });

                    return newCashierReceiptD;
                } catch (error) {
                    throw new Error(`Gagal membuat CashierReceiptG: ${error.message}`);
                }
            }));
        }

        return res.status(201).json({ msg: 'CashierReceipt berhasil dibuat', data: newCashierReceiptH });
    } catch (error) {
        return res.status(500).json({ msg: 'Gagal membuat CashierReceipt', error: error.message });
    }
}