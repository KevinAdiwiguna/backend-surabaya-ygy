import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const purchaseRequestDetail = db.define('purchaserequestd',{

    DocNo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    MaterialCode:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    Info:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Unit:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Qty: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    QtyPO: {
        type: DataTypes.DECIMAL,
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
    
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

export default purchaseRequestDetail;