// import purchaseOrderHeader from '../../../../models/Transaction/Purchase/PurchaseOrderHeader.js'
import purchaseOrderDetail from "../../../models/Transaction/Purchase/PurchaseOrder/PurchaseOrderDetail.js";
import sequelize from "sequelize";

export const getAllpurchaseOrderDetail = async (req, res) => {
  try {
    const purchaseOrderD = await purchaseOrderDetail.findAll({
      where: {
        DocNo: req.params.id,
      },
    });
    res.status(200).json(purchaseOrderD);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPurchaseOrderByCode = async (req, res) => {
  const getPurchaseOrderD = await purchaseOrderDetail.findOne({
    where: {
      DocNo: req.params.id,
    },
  });
  if (!getPurchaseOrderD) return res.status(400).json({ msg: "data tidak ditemukan" });
  try {
    res.status(200).json(getPurchaseOrderD);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePurchaseRequest = async (req, res) => {
  const { materialCode, info, unit, qty, price, gross, discPercent, discPercent2, discPercent3, discValue, discNominal, netto, qtyReceived } = req.body;

  if (!req.params.id1 || !req.params.id2) {
    return res.status(400).json({ msg: "Invalid parameters. Both id1 and id2 are required." });
  }
  try {
    const dataCheck = await purchaseOrderDetail.findOne({
      where: {
        DocNo: req.params.id1,
        Number: req.params.id2,
      },
    });
    if (!dataCheck) return res.status(400).json({ msg: "data tidak ditemukan" });

    const updatedData = {
      MaterialCode: materialCode || dataCheck.MaterialCode,
      Info: info || dataCheck.info,
      Unit: unit || dataCheck.Unit,
      Qty: qty || dataCheck.Qty,
      Price: price || dataCheck.Price,
      Gross: gross || dataCheck.Gross,
      DiscPercent: discPercent || dataCheck.DiscPercent,
      DiscPercent2: discPercent2 || dataCheck.DiscPercent2,
      DiscPercent3: discPercent3 || dataCheck.DiscPercent3,
      DiscValue: discValue || dataCheck.DiscValue,
      DiscNominal: discNominal || dataCheck.DiscNominal,
      Netto: netto || dataCheck.Netto,
      qtyReceived: qtyReceived || dataCheck.QtyReceived,
    };

    // const [numUpdatedRows, updatedRows] = await purchaseOrderDetail.update({
    //   updatedData,
    //   where {
    //     DocNo: req.params.id1,
    //     Number: req.params.id2,
    //   },
    //   {
    //     returning: true,
    //   }
    // )};

    const [numUpdatedRows, updatedRows] = await purchaseOrderDetail.update(updatedData, {
      where: {
        DocNo: req.params.id1,
        Number: req.params.id2,
      }, returning: true
    });


    if (numUpdatedRows === 0) {
      return res.status(200).json({ msg: "No changes to update" });
    }
    res.status(200).json(updatedRows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPurchaseOrderD = async (req, res) => {
  const purchaseOrderDcreate = req.body;

  try {
    const existingNumber = await purchaseOrderDetail.findOne({
      attributes: [[sequelize.fn("MAX", sequelize.col("Number")), "maxNumber"]],
      where: {
        DocNo: req.params.id,
      },
    });

    const maxNumber = existingNumber.getDataValue("maxNumber");
    let number = maxNumber !== null ? maxNumber + 1 : 1;

    const createdPurchaseOrderDetails = await Promise.all(
      purchaseOrderDcreate.map(async (detail) => {
        const { materialCode, info, unit, qty, price, gross, discPercent, discPercent2, discPercent3, discValue, discNominal, netto, qtyReceived } = detail;

        const response = await purchaseOrderDetail.create({
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
          QtyReceived: qtyReceived,
        });

        return response;
      })
    );

    return res.status(201).json(createdPurchaseOrderDetails);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePurchaseOrderDetail = async (req, res) => {
  const delPurchaseOrderD = await purchaseOrderDetail.findOne({
    where: {
      DocNo: req.params.id,
    },
  });
  if (!delPurchaseOrderD) return res.status(400).json({ msg: "data tidak ditemukan" });
  try {
    await purchaseOrderDetail.destroy({
      where: {
        DocNo: delPurchaseOrderD.DocNo,
      },
    });
    res.status(200).json({ msg: "data Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
