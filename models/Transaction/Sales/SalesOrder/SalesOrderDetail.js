import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const salesOrderDetail = db.define('salesorderd', {
    DocNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    Number: {
        type: DataTypes.INTEGER,
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
        allowNull: true,
        validate: {
            notEmpty: false
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
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },

    DiscPercent: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    DiscPercent2: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    DiscPercent3: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    DiscValue: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    DiscNominal: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    Netto: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    QtyDelivered: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    QtyWO: {
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

export default salesOrderDetail;