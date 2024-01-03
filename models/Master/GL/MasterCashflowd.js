import { Sequelize } from 'sequelize'
import db from '../../../config/Database.js'

const { DataTypes } = Sequelize

const mastercashflowd = db.define(
	'mastercashflowd',
	{
		CashflowGroup: {
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
			primaryKey: true
		},
		AccountNo: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true
		}
	},
	{
		freezeTableName: true,
		createdAt: false,
		updatedAt: false,
		timestamps: false
	}
)

export default mastercashflowd
