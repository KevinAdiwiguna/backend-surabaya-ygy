import { where } from "sequelize-cockroachdb";
import goodsissue from "../../../../models/Transaction/Sales/GoodIssue/GoodIssueh.js";

export const goodsissueh = async (req, res) => {
  try {
    const response = await goodsissue.findAll({
      where: {
        Status: req.params.id,
      },
    });
    res.status({ msg: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const salesinvoiceh =async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}