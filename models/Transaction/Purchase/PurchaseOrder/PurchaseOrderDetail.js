import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const purchaseOrderD = db.define('purchaseorderd', {

    DocNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    Number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    MaterialCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Info: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Unit: {
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

    Price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Gross: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    DiscPercent: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    DiscPercent2: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    DiscPercent3: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    DiscValue: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    DiscNominal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },


    Netto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    QtyReceived: {
        type: DataTypes.DECIMAL,
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

export default purchaseOrderD;