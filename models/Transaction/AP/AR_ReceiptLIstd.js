import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const APReceiptListd = db.define(
  "apreceiptlistd",
  {
    DocNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    APDocNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },


  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
);

export default APReceiptListd;
