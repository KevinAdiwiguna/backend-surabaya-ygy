import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const CashierPaymentD = db.define(
    "cashierpaymentd",
    {
        DocNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: true,
        },
        TransType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: true,
        },
        Info: {
            type: DataTypes.STRING,
        },
        DC: {
            type: DataTypes.STRING,
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
        Value: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: false,
        },
        ValueLocal: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: false,
        },
        JODocNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);

export default CashierPaymentD;
