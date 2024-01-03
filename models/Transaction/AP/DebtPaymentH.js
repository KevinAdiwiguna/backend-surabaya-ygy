import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const DebtPaymentH = db.define(
  "debtpaymenth",
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
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    DocDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    APRecListNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    SupplierCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    TotalDocument: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    TotalPayment: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    Information: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    CreatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    ChangedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default DebtPaymentH;
