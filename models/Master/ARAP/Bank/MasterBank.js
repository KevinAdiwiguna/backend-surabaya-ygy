import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const MasterBank = db.define(
  "masterbank",
  {
    Code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: false,
    },
    
  },

  {
    freezeTableName: true,
  }
);

export default MasterBank;
