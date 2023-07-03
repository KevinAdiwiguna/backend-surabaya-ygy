import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js"

const { DataTypes } = Sequelize;



const masterGroup2 = db.define('mastermaterialgroup2', {
    group1: {
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
    },
}, {
    freezeTableName: true
});

export default masterGroup2;
