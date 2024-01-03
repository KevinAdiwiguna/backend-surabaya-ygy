import { Sequelize } from 'sequelize'
import db from '../../../../config/Database.js'

const { DataTypes } = Sequelize

const GoodIssued = db.define(
	'goodsissued',
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
		MaterialCode: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Info: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ""
		},
		Location: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		BatchNo: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ""
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
		QtyReturn: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		QtyNetto: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
)

export default GoodIssued
