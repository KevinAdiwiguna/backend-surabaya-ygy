import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const MasterTransactionType = db.define(
  "mastertransactiontype",
  {
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      primaryKey: false,
    },
    AccountNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: false,
    },
    Purpose: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      primaryKey: false,
    },
    CreatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      primaryKey: false,
    },
    ChangedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      primaryKey: false,
    },
  },

  {
    freezeTableName: true,
  }
);

export default MasterTransactionType;
