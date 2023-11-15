import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const CashierReceiptG = db.define(
    "cashierreceiptg",
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
        GiroNo: {
            type: DataTypes.STRING,
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
        ReceivedDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        DepositDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        DueDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
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
        ChangedDate: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);

export default CashierReceiptG;
