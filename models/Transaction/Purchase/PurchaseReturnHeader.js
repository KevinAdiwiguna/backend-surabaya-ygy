import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const purchasereturnh = db.define('purchasereturnh', {

    DocNo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },  
        primaryKey: true
    },

    Series:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },  

    DocDate:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    SODocNo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    GIDocNo: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },

    SupplierCode : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    SupplierTaxTo :{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    SupplierDocNo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxNo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    

    Currency:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    ExchangeRate:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    TaxStatus:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    TaxPercent: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxPrefix : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    DiscPercent : {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TotalGross : {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TotalDisc : {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxValue : {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxValueInTaxCur : {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TotalNetto : {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TotalCost : {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Information : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Status : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    PrintCounter : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    PrintedBy : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    PrintedDate : {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    CreatedBy : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ChangedBy : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    

}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

export default purchasereturnh;