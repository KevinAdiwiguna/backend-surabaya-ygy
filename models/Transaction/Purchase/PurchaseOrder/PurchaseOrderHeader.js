import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";


const { DataTypes } = Sequelize;

const purchaseOrderH = db.define('purchaseorderh', {

    DocNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    Series: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TransactionType: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    DocDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    SupplierCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    DeliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TOP: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },

    DiscPercent: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    TaxStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxPercent: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    Currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    ExchangeRate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },


    JODocNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    Trip: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    SIDocNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    TotalGross: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TotalDisc: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    TaxValue: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    TotalNetto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    SendTo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Information: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    Status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    IsApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    ApprovedBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    ApprovedDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    PrintCounter: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    PrintedBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    PrintedDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    IsSalesReturn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
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
    },

}, {
    freezeTableName: true,
});

export default purchaseOrderH;