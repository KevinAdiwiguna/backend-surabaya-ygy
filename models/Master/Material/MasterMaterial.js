import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";


const { DataTypes } = Sequelize;



const mastercurrency = db.define('mastermaterialtype', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    nameInpo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    smallestUnit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    soldUnit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    skuUnit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    group1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    group2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    group3: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    type: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    isBatch: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    isService: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    isAsset: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    mass: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    volume: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    hs: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    barcode: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    minStock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    maxStock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    currency: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    defaultPrice: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    transaction1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    transaction2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    transaction3: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    transaction4: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    info: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    changedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
}, {
    freezeTableName: true
});

export default mastercurrency;

