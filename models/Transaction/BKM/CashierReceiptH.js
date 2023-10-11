import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const CashierReceiptH = db.define(
    "cashierreceipth",
    {
        DocNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: true,
        },

        Series: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        DocDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        ARReqListNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        TotalDebet: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            defaultValue: 0,

        },

        TotalCredit: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            defaultValue: 0,
        },

        TotalGiro: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            defaultValue: 0,
        },

        Information: {
            type: DataTypes.STRING,
        },

        Status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        PrintCounter: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        PrintedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },

        PrintedDate: {
            type: DataTypes.DATE,
        },

        CreatedBy: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        ChangedBy: {
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

export default CashierReceiptH;
