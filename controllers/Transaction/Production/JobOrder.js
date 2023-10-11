import JobOrder from '../../../models/Transaction/Production/JobOrder.js'
import sequelize from 'sequelize'
import { Op } from 'sequelize'

// DONE
export const getAllJobOrder = async (req, res) => {
    try {
        const purchaseCostH = await JobOrder.findAll()
        res.status(200).json(purchaseCostH)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// DONE
export const getJobOrderByCode = async (req, res) => {
    const getJobOrder = await JobOrder.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!getJobOrder) return res.status(400).json({ msg: "data tidak ditemukan" })
    try {
        res.status(200).json(getJobOrder)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// DONE
export const updateJobOrder = async (req, res) => {
    const { docNo, series, docDate, plannedStartDate, plannedFinishDate, actualStartDate, actualStartTime, actualFinishDate, actualFinishTime, requiredDate, SODocNo, IODocNo, WODocNo, parentJODocNo, level, priority, location, department, excludeCostDistribution, formula, materialCode, unit, qtyTarget, qtyOutput, checkQtyOutput, totalCost, status, information, createdBy, changedBy } = req.body

    const updJobOrder = await JobOrder.findOne({
        where: {
            DocNo: req.params.id
        }
    })
    if (!updJobOrder) return res.status(400).json({ msg: "data tidak ditemukan" })

    try {
        await JobOrder.update({

            DocNo: docNo || updJobOrder.DocNo,
            Series: series || updJobOrder.Series,
            DocDate: docDate || updJobOrder.DocDate,
            PlannedStartDate: plannedStartDate || updJobOrder.PlannedStartDate,
            PlannedFinishDate: plannedFinishDate || updJobOrder.PlannedFinishDate,
            ActualStartDate: actualStartDate || updJobOrder.ActualStartDate,
            ActualStartTime: actualStartTime || updJobOrder.ActualStartTime,
            ActualFinishDate: actualFinishDate || updJobOrder.ActualFinishDate,
            ActualFinishTime: actualFinishTime || updJobOrder.ActualFinishTime,
            RequiredDate: requiredDate || updJobOrder.RequiredDate,
            SODocNo: SODocNo || updJobOrder.SODocNo,
            IODocNo: IODocNo || updJobOrder.IODocNo,
            WODocNo: WODocNo || updJobOrder.WODocNo,
            ParentJODocNo: parentJODocNo || updJobOrder.ParentJODocNo,
            Level: level || updJobOrder.Level,
            Priority: priority || updJobOrder.Priority,
            Location: location || updJobOrder.Location,
            Department: department || updJobOrder.Department,
            ExcludeCostDistribution: excludeCostDistribution || updJobOrder.ExcludeCostDistribution,
            Formula: formula || updJobOrder.Formula,
            MaterialCode: materialCode || updJobOrder.MaterialCode,
            Unit: unit || updJobOrder.Unit,
            QtyTarget: qtyTarget || updJobOrder.QtyTarget,
            QtyOutput: qtyOutput || updJobOrder.QtyOutput,
            CheckQtyOutput: checkQtyOutput || updJobOrder.CheckQtyOutput,
            TotalCost: totalCost || updJobOrder.TotalCost,
            Information: information || updJobOrder.Information,
            Status: status || updJobOrder.Status,
            CreatedBy: createdBy || updJobOrder.CreatedBy,
            ChangedBy: changedBy || updJobOrder.ChangedBy


        }, {
            where: {
                DocNo: updJobOrder.DocNo
            }
        })
        res.status(200).json({ msg: "update berhasiil" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}
// DONE
export const createJobOrder = async (req, res) => {
    const {
        generateDocDate, series, docDate, plannedStartDate, plannedFinishDate, actualStartDate, actualStartTime, actualFinishDate, actualFinishTime, requiredDate, SODocNo, IODocNo, WODocNo, parentJODocNo, level, priority, location, department, excludeCostDistribution, formula, materialCode, unit, qtyTarget, qtyOutput, checkQtyOutput, totalCost, status, information, createdBy, changedBy
    } = req.body;

    try {
        const existingHeader = await JobOrder.findOne({
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

        await JobOrder.create({
            DocNo: DocNo,
            Series: series,
            DocDate: docDate,
            PlannedStartDate: plannedStartDate,
            PlannedFinishDate: plannedFinishDate,
            ActualStartDate: actualStartDate,
            ActualStartTime: actualStartTime,
            ActualFinishDate: actualFinishDate,
            ActualFinishTime: actualFinishTime,
            RequiredDate: requiredDate,
            SODocNo: SODocNo,
            IODocNo: IODocNo,
            WODocNo: WODocNo,
            ParentJODocNo: parentJODocNo,
            Level: level,
            Priority: priority,
            Location: location,
            Department: department,
            ExcludeCostDistribution: excludeCostDistribution,
            Formula: formula,
            MaterialCode: materialCode,
            Unit: unit,
            QtyTarget: qtyTarget,
            QtyOutput: qtyOutput,
            CheckQtyOutput: checkQtyOutput,
            TotalCost: totalCost,
            Information: information,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        });

        const responseObject = {
            DocNo: DocNo,
            Series: series,
            DocDate: docDate,
            PlannedStartDate: plannedStartDate,
            PlannedFinishDate: plannedFinishDate,
            ActualStartDate: actualStartDate,
            ActualStartTime: actualStartTime,
            ActualFinishDate: actualFinishDate,
            ActualFinishTime: actualFinishTime,
            RequiredDate: requiredDate,
            SODocNo: SODocNo,
            IODocNo: IODocNo,
            WODocNo: WODocNo,
            ParentJODocNo: parentJODocNo,
            Level: level,
            Priority: priority,
            Location: location,
            Department: department,
            ExcludeCostDistribution: excludeCostDistribution,
            Formula: formula,
            MaterialCode: materialCode,
            Unit: unit,
            QtyTarget: qtyTarget,
            QtyOutput: qtyOutput,
            CheckQtyOutput: checkQtyOutput,
            TotalCost: totalCost,
            Information: information,
            Status: status,
            CreatedBy: createdBy,
            ChangedBy: changedBy
        };

        res.status(200).json(responseObject);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Failed to create Sales Order Header', error: error.message });
    }
};
// DONE
export const deleteJobOrder = async (req, res) => {
    try {
        const delJobOrder = await JobOrder.findOne({
            where: {
                DocNo: req.params.id
            }
        })
        if (!delJobOrder) return res.status(400).json({ msg: "data tidak ditemukan" })

        await JobOrder.update(
            { Status: "DELETED" },
            {
                where: {
                    DocNo: delJobOrder.DocNo
                }
            }
        );
        res.status(200).json({ msg: "data Deleted" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


