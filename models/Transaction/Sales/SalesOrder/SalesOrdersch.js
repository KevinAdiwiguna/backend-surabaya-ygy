import { Sequelize } from 'sequelize'
import db from '../../../../config/Database.js'

const { DataTypes } = Sequelize

const SalesOrdersch = db.define(
	'salesordersch',
	{
		DocNo: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
		Number: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
		DeliveryDate: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
		Qty: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
)

export default SalesOrdersch
