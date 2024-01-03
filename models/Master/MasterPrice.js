import { Sequelize } from "sequelize";
import db from "../../config/Database.js"

const { DataTypes } = Sequelize;

const masterprice = db.define('masterprice',{

	Begda: {
		type: DataTypes.STRING, 
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
		type: DataTypes.DECIMAL,
		allowNull: false,
		validate:{
			notEmpty: true
		},
		primaryKey: true
	},

	Unit: {
		type: DataTypes.DECIMAL,
		allowNull: false,
		validate: {
			notEmpty: true
		},
		primaryKey: true
	},

	MinQty: {
		type: DataTypes.DECIMAL,
		allowNull: false,
		validate: {
			notEmpty: true
		},
		primaryKey: true
	},

	MaxQty: {
		type: DataTypes.STRING,
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

	PercentDisc: {
		type: DataTypes.DECIMAL,
		allowNull: true,
		defaultValue: 0
	},

	ValueDisc: {
		type: DataTypes.DECIMAL,
		allowNull: true,
		defaultValue: 0
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


},{
	freezeTableName: true
});


export default masterprice;






