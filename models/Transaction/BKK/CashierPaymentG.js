import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const CashierPaymentG = db.define(
    "cashierpaymentg",
    {
        DocNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: true,
        },
        Bank: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: true,
        },
        DueDate: {
            type: DataTypes.DATE,
        },
        GiroNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: true,
        },
        SupplierCode: {
            type: DataTypes.STRING,
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
        GiroValue: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: false,
        },
        GiroValueLocal: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: false,
        },
        TransType: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            primaryKey: false,
        },
        IssuedDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ClearingDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        ClearExchangeRate: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        ClearValue: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            defaultValue: 0,

        },
        RejectDate: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: null
        },

        Information: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },

        Status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        ChangedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        createdAt: false
    }
);

export default CashierPaymentG;
