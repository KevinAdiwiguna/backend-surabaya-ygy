import { Sequelize } from 'sequelize'
import db from '../../../config/Database.js'

const { DataTypes } = Sequelize

const masterbudgetd = db.define(
	'masterbudgetd',
	{
		Code: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
		Year: {
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
		},
		Budget: {
			type: DataTypes.DECIMAL,
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

export default masterbudgetd;
