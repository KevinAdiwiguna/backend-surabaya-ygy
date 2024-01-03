import { Sequelize } from 'sequelize'
import db from '../../../config/Database.js'

const { DataTypes } = Sequelize

const masteraccount = db.define(
	'masteraccount',
	{
		AccountNo: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
		Name: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Level: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		AccountGroup: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		ParentNo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		IsJournal: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		Department: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Currency: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		CreatedBy: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		ChangedBy: {
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

export default masteraccount
