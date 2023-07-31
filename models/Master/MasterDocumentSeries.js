import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;


const masterdocumentseries = db.define('masterdocumentseries', {
    Document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    Series: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    Users: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    NeedQC: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },

    AutoTaxNo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
    },

    Iso: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    ChangedBy: {
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