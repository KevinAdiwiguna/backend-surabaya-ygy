import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

import mastercountry from "./MasterCountry.js";
import mastercustomergroup from './MasterCustomerGroup.js'
import masterpricelisttype from './MasterPricelistType.js'
import mastercurrency from "../MasterCurrencyModel.js";

const { DataTypes } = Sequelize;

const mastercustomer = db.define('mastercustomer', {
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
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    address2: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    fax: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    taxNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    customerGroup: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    priceListType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    salesArea1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    salesArea2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    salesArea3: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    top: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    limit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    transactionType: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    transactionType2: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    cutPPh: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    isBlacklisted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    information: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
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
    }
}, {
    freezeTableName: true
});


mastercountry.hasOne(mastercustomer, { foreignKey: 'country' })
mastercustomergroup.hasOne(mastercustomer, { foreignKey: 'customerGroup' })
masterpricelisttype.hasOne(mastercustomer, { foreignKey: 'priceListType' })
mastercurrency.hasOne(mastercustomer, { foreignKey: 'currency' })



export default mastercustomer;

