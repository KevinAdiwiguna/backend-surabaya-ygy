import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const purchaseCostH = db.define('purchasecosth', {

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
    },

    DocDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },

    TransactionType:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    SupplierCode:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    SupplierTaxTo:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    SupplierInvNo:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    TOP: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    TaxStatus:{
        type: DataTypes.STRING,
        allowNull: false,
    },


    TaxPercent: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    TaxPrefix:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    TaxNo:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    Currency:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    

    ExchangeRate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    TotalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    TaxValue: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    TaxValueInTaxCur: {
        type: DataTypes.DECIMAL,
        allowNull: false,

    },

    TotalNetto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    
    },


    Information:{
        type: DataTypes.STRING,
        allowNull: false,
    
    },

    InvoiceDocNo:{
        type: DataTypes.STRING,
        allowNull: false,
        
    },

    Status:{
        type: DataTypes.STRING,
        allowNull: false,
        
    },

    CreatedBy:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ChangedBy:{
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

export default purchaseCostH;