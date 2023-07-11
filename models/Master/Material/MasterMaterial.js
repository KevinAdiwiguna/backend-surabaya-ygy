import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const masterMaterial = db.define('mastermaterial', {
    Code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    NameInPO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SmallestUnit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SoldUnit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SKUUnit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Group1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Group2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Group3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IsBatch: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    IsService: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    IsAsset: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Mass: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    Volume: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    HS: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Barcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MinStock: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    MaxStock: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    Currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DefaultPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    TransactionType1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TransactionType2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TransactionType3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TransactionType4: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Info: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ChangedBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

export default masterMaterial;

