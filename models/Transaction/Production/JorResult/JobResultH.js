import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const JobResultH = db.define(
    "jobresulth",
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
        DocTime: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        JODocNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        Location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        Machine: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        BatchNo: {
            type: DataTypes.STRING,
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
            primaryKey: false,
        },
        PrintCounter: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            primaryKey: false,
        },
        PrintedBy: {
            type: DataTypes.STRING,
            primaryKey: false,
        },
        PrintedDate: {
            type: DataTypes.DATE,
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
        timestamps: false,
    }
);

export default JobResultH;
