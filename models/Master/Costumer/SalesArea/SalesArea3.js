import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const mastercountry = db.define('salesarea3', {
    area1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    area2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    changedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    }
}, {
    freezeTableName: true
});

export default mastercountry;

