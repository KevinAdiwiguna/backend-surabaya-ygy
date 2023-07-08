import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";
import masterUnit from './MasterUnit.js'
import masterMaterial from "./MasterMaterial.js";

const { DataTypes } = Sequelize;

const unitConversion = db.define('masterunitconversion', {
    MaterialCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    Unit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    Content: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
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

// masterMaterial.hasOne(unitConversion, { foreignKey: 'Code' })    
// masterUnit.hasOne(unitConversion, { foreignKey: 'Code' })    

unitConversion.belongsTo(masterUnit, {
    foreignKey: 'Unit',
    targetKey: 'Code'
});

unitConversion.belongsTo(masterMaterial, {
    foreignKey: 'MaterialCode',
    targetKey: 'Code'
});

export default unitConversion;

