import { Sequelize } from "sequelize";
import db from "../../config/Database.js"

import mastercurrency from "./MasterCurrencyModel.js"
import masterpricelisttype from "./Costumer/MasterPricelistType.js"
import masterUnitConversion from "./Material/MasterUnitConversion.js"

const { DataTypes } = Sequelize;

const masterprice = db.define('masterprice',{

	Begda: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notEmpty: true
		},
		primaryKey: true
	},

	Endda: {
		type: DataTypes.DATE,
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
		primaryKey: true
	},

	MaterialCode: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		},
		primaryKey: true
	},

	Currency: {
		type: DataTypes.STRING,
		allowNull: false,
		validate{
			notEmpty: true
		},
		primaryKey: true
	},

	Unit: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		},
		primaryKey: true
	},

	MinQty: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		},
		primaryKey: true
	},

	MaxQty: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notEmpty: true
		},
	},

	Price: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notEmpty: true
		},
	},

	PercentDisc: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notEmpty: true
		},
	},

	ValueDisc: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notEmpty: true
		},
	},

	CreatedBy: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notEmpty: true
		},
	},

	CreatedDate: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notEmpty: true
		},
	},

	ChangedBy: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notEmpty: true
		},
	},

	ChangedDate: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notEmpty: true
		},
	},

},{
	freezeTableName: true
});

mastercurrency.hasOne(masterprice, { foreignKey: 'Currency' })
masterpricelisttype.hasOne(masterprice, { foreignKey: 'PriceListType' })
masterUnitConversion.hasOne(masterprice, { foreignKey: 'MaterialCode' })
masterUnitConversion.hasOne(masterprice, { foreignKey: 'Unit' })

export default masterprice;






