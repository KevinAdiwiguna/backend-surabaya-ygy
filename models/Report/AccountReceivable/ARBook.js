import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const ARBook = db.define('arbook', {
  Periode: {
    type: DataTypes.DATE,
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
  TransType: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    primaryKey: true,
  },
  DocNo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    primaryKey: true,
  },
  DocDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  TOP: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  DueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  Currency: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  ExchangeRate: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  Information: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  DC: {
    type: DataTypes.CHAR,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  DocValue: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  DocValueLocal: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  PaymentValue: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  PaymentValueLocal: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  ExchangeRateDiff: {
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

export default ARBook;

