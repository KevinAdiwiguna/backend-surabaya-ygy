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

    SendTo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Information:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    Status:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    IsApproved:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    ApprovedBy:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    ApprovedDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },

    PrintCounter: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    PrintedBy:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    PrintedDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },

    IsSalesReturn:{
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

}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

export default purchaseOrderH;