import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

import mastercountry from "./MasterCountry.js";
import mastercustomergroup from './MasterCustomerGroup.js'
import masterpricelisttype from './MasterPricelistType.js'
import mastercurrency from "../MasterCurrencyModel.js";

const { DataTypes } = Sequelize;

const mastercustomer = db.define('mastercustomer', {
    Code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    Address2: {
        type: DataTypes.STRING,
    },
    City: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    Country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    Fax: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    Contact: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    Mobile: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    TaxNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    CustomerGroup: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    PriceListType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    SalesArea1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SalesArea2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SalesArea3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TOP: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    Currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    Limit: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    TransactionType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    TransactionType2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    CutPPh: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    IsBlacklisted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false
        },
    },
    Information: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
    },
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    ChangedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    }
}, {
    freezeTableName: true
});


mastercountry.hasOne(mastercustomer, { foreignKey: 'Country' })
mastercustomergroup.hasOne(mastercustomer, { foreignKey: 'CustomerGroup' })
masterpricelisttype.hasOne(mastercustomer, { foreignKey: 'PriceListType' })
mastercurrency.hasOne(mastercustomer, { foreignKey: 'Currency' })



export default mastercustomer;

