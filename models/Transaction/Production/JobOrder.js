import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const jobOrder = db.define('joborder', {

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

    PlannedStartDate:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    PlannedFinishDate:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ActualStartDate:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ActualStartTime:{
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ActualFinishDate:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ActualFinishTime:{
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    RequiredDate:{
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

    IODocNo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    

    WODocNo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ParentJODocNo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    Priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    Location:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Department:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ExcludeCostDistribution:{
        type: DataTypes.BIT,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Formula:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    MaterialCode :{
        type: DataTypes.STRING,
        allowNull: false,
    },

    Unit :{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    QtyTarget:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    QtyOutput:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    CheckQtyOutput:{
        type: DataTypes.BIT,
        allowNull: false,
    },

    TotalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    Status:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    Information:{
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

export default jobOrder;