import { Sequelize } from 'sequelize'
import db from '../../../../config/Database.js'

const { DataTypes } = Sequelize


//table 3
const masterBomCoProduct = db.define(
	'masterbomcoproduct',
	{
		Formula: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
		MaterialCode: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
		Unit: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Qty: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		PercentValue: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},

	},
	{
		freezeTableName: true,
	}
)

export default masterBomCoProduct;