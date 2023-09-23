import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const APReceiptListh = db.define(
 "apreceiptlisth",
  {
    DocNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    Series: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: false,
    },
    DocDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: false,
    },
    SupplierCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: false,
    },
    TotalDocument: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: false,
    },
    TotalValue: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: false,
    },
    Information: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: false,
    },
    PrintCounter: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        notEmpty: false,
      },
      primaryKey: false,
    },
    PrintedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: false,
    },
    PrintedDate: {
      type: DataTypes.DATETIME,
      allowNull: true,
      primaryKey: false,
    },
    CreatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: false,
    },
    ChangedBy: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      },
      primaryKey: false
    }
  },
  {
    freezeTableName: true,
  }
);

export default APReceiptListh;
