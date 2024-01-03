import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const JobResultDT = db.define(
    "jobresultdt",
    {
        DocNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: true,
        },
        StartDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        StartTime: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            primaryKey: true,
        },
        EndDate: {
            type: DataTypes.DATE,
        },
        EndTime: {
            type: DataTypes.DATE,
        },
        Duration: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        Reason: {
            type: DataTypes.STRING,
        },
        Info: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);

export default JobResultDT;
