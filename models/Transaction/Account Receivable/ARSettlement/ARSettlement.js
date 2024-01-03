import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const ARSettlement = db.define(
    "arsettlement",
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
            type: DataTypes.DATEONLY,
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
        TotalValue: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
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
        CreatedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
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
    }
);

export default ARSettlement;
