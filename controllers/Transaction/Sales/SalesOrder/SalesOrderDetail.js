import salesOrderDetail from "../../../../models/Transaction/Sales/SalesOrder//SalesOrderDetail.js";
import sequelize from "sequelize";
import { Op } from "sequelize";

export const getAllSalesOrderDetail = async (req, res) => {
  try {
    const response = await salesOrderDetail.findAll({
      where: {
        DocNo: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSalesORderDetail = async (req, res) => {
  const salesOrderDetails = req.body; // Array of sales order details

  try {
    const existingNumber = await salesOrderDetail.findOne({
      attributes: [[sequelize.fn("MAX", sequelize.col("Number")), "maxNumber"]],
      where: {
        DocNo: req.params.id,
      },
    });

    const maxNumber = existingNumber.getDataValue("maxNumber");
    let number = maxNumber !== null ? maxNumber + 1 : 1;

    const createdSalesOrderDetails = await Promise.all(
      salesOrderDetails.map(async (detail) => {
        const {
          materialCode,
          info,
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
          qtyDelivered,
          qtyWO,
        } = detail;

        const response = await salesOrderDetail.create({
          DocNo: req.params.id,
          Number: number++,
          MaterialCode: materialCode,
          Info: info,
          Unit: unit,
          Qty: qty,
          Price: price,
          Gross: gross,
          DiscPercent: discPercent,
          DiscPercent2: discPercent2,
          DiscPercent3: discPercent3,
          DiscValue: discValue,
          DiscNominal: discNominal,
          Netto: netto,
          QtyDelivered: qtyDelivered,
          QtyWO: qtyWO,
        });

        return response;
      })
    );

    return res.status(201).json(createdSalesOrderDetails);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateSalesOrderDetail = async (req, res) => {
  const {
    materialCode,
    info,
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
    Netto,
    QtyDelivered,
    QtyWO,
  } = req.body;

  if (!req.params.id1 || !req.params.id2) {
    return res
      .status(400)
      .json({ msg: "Invalid parameters. Both id1 and id2 are required." });
  }

  try {
    const dataCheck = await salesOrderDetail.findOne({
      where: {
        DocNo: req.params.id1,
        Number: req.params.id2,
      },
    });

    if (!dataCheck) {
      return res.status(400).json({ msg: "Data not found" });
    }

    const updatedData = {
      MaterialCode: materialCode || dataCheck.MaterialCode,
      Info: info || dataCheck.info,
      Unit: unit || dataCheck.unit,
      Qty: qty || dataCheck.qty,
      Price: price || dataCheck.price,
      Gross: gross || dataCheck.gross,
      DiscPercent: discPercent || dataCheck.discPercent,
      DiscPercent2: discPercent2 || dataCheck.discPercent2,
      DiscPercent3: discPercent3 || dataCheck.discPercent3,
      DiscValue: discValue || dataCheck.discValue,
      DiscNominal: discNominal || dataCheck.discNominal,
      Netto: Netto || dataCheck.Netto,
      QtyDelivered: QtyDelivered || dataCheck.QtyDelivered,
      QtyWO: QtyWO || dataCheck.QtyWO,
    };

    const [numUpdatedRows, updatedRows] = await salesOrderDetail.update(
      updatedData,
      {
        where: {
          DocNo: req.params.id1,
          Number: req.params.id2,
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
