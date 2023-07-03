import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";


const { DataTypes } = Sequelize;



const materialType = db.define('mastermaterialtype', {
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
    isWaste: {
        type: DataTypes.BOOLEAN,
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

export default materialType;

