import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('user', {
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
  DocNo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true,
  },
  DocDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true,
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true,
  },
  Number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true,
  },
  Qty: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: false,
  },
  Price: {
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

export default Users;

