import { Sequelize } from 'sequelize'
import db from '../../config/Database.js'

const { DataTypes } = Sequelize

const mastersupplierpartner = db.define(
	'mastersupplierpartner',
	{
		SupplierCode: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},

		PartnerFunc: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},

		PartnerCode: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		freezeTableName: true,
		updatedAt: false,
		createdAt: false,
		timestamps: false
	}
)

export default mastersupplierpartner
