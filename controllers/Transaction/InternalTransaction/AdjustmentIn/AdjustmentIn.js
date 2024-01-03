import AdjustmentInH from '../../../../models/Transaction/InternalTransaction/AdjustmentIn/AdjustmentInH.js'
import AdjustmentInD from '../../../../models/Transaction/InternalTransaction/AdjustmentIn/AdjustmentInD.js'
import sequelize, { Op } from 'sequelize';


export const approveAJIn = async (req, res) => {
  const response = await AdjustmentInH.update(
    { Status: "APPROVED" },
    { IsApproved: 1 },
    { ApprovedBy: req.params.id2 },
    {
      where: {
        DocNo: req.params.id
      }
    }
  )
  res.status(201).json({ msg: "Data APPROVED", response })
}

export const printAjIn = async (req, res) => {
  const { printedBy, printedDate } = req.body
  try {
    const response = await AdjustmentInH.update(
      { Status: "PRINTED" },
      { PrintCounter: 1 },
      { PrintedBy: printedBy },
      { PrintedDate: printedDate },
      {
        where: {
          DocNo: req.params.id
        }
      }
    )
    res.status(201).json({ msg: "berhasil create", response })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const createAjIn = async (req, res) => {
  const { series, generateDocDate, transactionType, docDate, location, information, totalPrice, createdBy, changedBy, ajInD } = req.body
  try {
    const existingHeader = await AdjustmentInH.findOne({
      attributes: ["DocNo"],
      where: {
        DocNo: {
          [Op.like]: `${series}-${generateDocDate}-%`,
        },
      },
      order: [[sequelize.literal("CAST(SUBSTRING_INDEX(DocNo, '-', -1) AS UNSIGNED)"), "DESC"]],
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

    const data = DocNo.split("-")

    const response = await AdjustmentInH.create({
      BatchNo: `${data[1]}${data[2]}`,
      DocNo: DocNo,
      Series: series,
      TransactionType: transactionType,
      DocDate: docDate,
      Location: location,
      Information: information,
      Status: "OPEN",
      TotalPrice: totalPrice,
      CreatedBy: createdBy,
      ChangedBy: changedBy
    })


    if (ajInD && Array.isArray(ajInD)) {
      await Promise.all(
        ajInD.map(async (detail) => {
          const { materialCode, unit, qty, price } = detail;
          try {
            await AdjustmentInD.create({
              DocNo: DocNo,
              MaterialCode: materialCode,
              Unit: unit,
              Qty: qty,
              Price: price,
            });
          } catch (error) {
            console.error("Error while saving GoodIssued detail:", error);
          }
        })
      );
    }

    const result = {
      ...ajInD,
      response,
    }

    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}