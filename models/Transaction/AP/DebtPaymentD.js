import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const DebtPaymentD = db.define(
  "debtpaymentd",
  {
    DocNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    TransactionType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
    },
    APDocNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: true,
    },
    DC: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    Currency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    Payment: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    ExchangeRate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    PaymentLocal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      defaultValue: null,
      primaryKey: false,
    },
    TaxPrefix: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
    },
    TaxNo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
    },
    Information: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
);

export default DebtPaymentD;
