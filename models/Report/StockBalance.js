import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Stock = db.define('stockbalance', {
  Periode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true,
  },
  BatchNo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true,
  },
  MaterialCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true,
  },
  Location: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true,
  },
  Price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  QtyStart: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  QtyIn: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  QtyOut: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  QtyEnd: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false

},);

export default Stock;

