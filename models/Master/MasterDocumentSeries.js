import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;


const masterdocumentseries = db.define('masterdocumentseries', {
    document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    series: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    users: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    needQC: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },

    autoTaxNo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
    },

    iso: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
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

export default masterdocumentseries;