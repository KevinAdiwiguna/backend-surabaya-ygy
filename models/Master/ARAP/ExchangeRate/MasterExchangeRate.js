import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const MasterExchangeRate = db.define(
  "masterexchangerate",
  {
    Periode: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    Currency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    ExchangeRate: {
      type: DataTypes.DECIMAL,
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

export default MasterExchangeRate;
