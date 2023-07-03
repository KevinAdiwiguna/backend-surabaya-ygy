import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";


const { DataTypes } = Sequelize;


const masterCustomerGroup = db.define('mastercustomergroup', {
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

export default masterCustomerGroup;

