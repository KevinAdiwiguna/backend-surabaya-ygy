import { Sequelize } from "sequelize";
import db from "../../../../config/Database.js";

const { DataTypes } = Sequelize;

const purchaseinvoiceh = db.define('purchaseinvoiceh', {

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

    DocDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    PODocNo: {
        type: DataTypes.STRING,
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

    TransactionType: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    GRDocNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    BatchNo: {
        type: DataTypes.STRING,
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


    SupplierTaxTo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    SupplierInvNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    TOP: {
        type: DataTypes.INTEGER,
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

    TotalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },

    CostDistribution: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
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

    TaxPrefix: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    TaxNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    DiscPercent: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
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
        validate: {
            notEmpty: true
        },
    },

    DownPayment: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxValue: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TaxValueInTaxCur: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    TotalNetto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    CutPPh: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },

    PPhPercent: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.00
    },

    PPhValue: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    Information: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },

    Status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    PrintCounter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    PrintedBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    PrintedDate: {
        type: DataTypes.DATE,
        allowNull: true,
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

export default purchaseinvoiceh;