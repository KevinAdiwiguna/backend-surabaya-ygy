import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

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