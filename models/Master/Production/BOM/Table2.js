import { Sequelize } from 'sequelize'
import db from '../../../../config/Database.js'

const { DataTypes } = Sequelize


//table 2
const masterBomd = db.define(
	'masterbomd',
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
		}
	},
	{
		freezeTableName: true,
	}
)

export default masterBomd;
