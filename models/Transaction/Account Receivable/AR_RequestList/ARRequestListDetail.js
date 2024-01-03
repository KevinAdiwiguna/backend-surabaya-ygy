import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const ARRequestListd = db.define(
  "arrequestlistd",
  {
    DocNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    CustomerCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    ARDocNo: {
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

export default ARRequestListd;
