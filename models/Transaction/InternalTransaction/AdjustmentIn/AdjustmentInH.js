import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const AnjustmentInH = db.define(
    "adjustinh",
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
            primaryKey: false,
        },
        TransactionType: {
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
            primaryKey: false,
        },
        Location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: false,
        },
        BatchNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: false,
        },
        Information: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: false,
        },
        TotalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: false,
        },
        IsApproved: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            primaryKey: false,
            defaultValue: false
        },
        ApprovedBy: {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey: false,
            defaultValue: ""
        },
        ApprovedDate: {
            type: DataTypes.DATE,
            allowNull: true,
            primaryKey: false,
        },
        PrintCounter: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            primaryKey: false,
        },
        PrintedBy: {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey: false,
            defaultValue: ""
        },
        PrintedDate: {
            type: DataTypes.DATE,
            allowNull: true,
            primaryKey: false,
        },
        CreatedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            },
            primaryKey: false,
        },
        ChangedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            },
            primaryKey: false,
        },
    },
    {
        freezeTableName: true,
    }
);

export default AnjustmentInH;
