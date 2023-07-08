import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const {DataTypes} = Sequelize;

const salesOrderHeader = db.define('salesorderh',{
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
    CustomerCode:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    ShipToCode:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    TaxToCode:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    SalesCode:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    DeliveryDate:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    PONo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TOP:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    DiscPercent:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxStatus:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxPercent:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Currency:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ExchangeRate:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TotalGross:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TotalDisc:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxValue:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TotalNetto:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Information:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Status:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    IsPurchaseReturn:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
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


},{
    freezeTableName: true
});

export default mastersales;