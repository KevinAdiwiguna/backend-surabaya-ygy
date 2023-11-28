import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const APBook = db.define('apbook', {
  Periode: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true
  },
  SupplierCode: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true
  },
  TransType: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true
  },
  DocNo: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true
  },
  DocDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  TOP: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  DueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Currency: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ExchangeRate: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  Information: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  DC: {
    type: DataTypes.CHAR,
    allowNull: true
  },
  DocValue: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  DocValueLocal: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  PaymentValue: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    defaultValue: 0,
  },
  PaymentValueLocal: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    defaultValue: 0,
  },
  ExchangeRateDiff: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    defaultValue: 0,
  }
}, {
  timestamps: false,
  createdAt: false,
  tableName: 'apbook',
  updatedAt: false
},);

export default APBook;

