import { Sequelize } from 'sequelize'
import db from '../../../../config/Database.js'

const { DataTypes } = Sequelize

const GoodIssueh = db.define(
	'goodsissueh',
	{
		DocNo: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},

		Series: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
		DocDate: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		SODocNo: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: false,
			},
		},
		CustomerCode: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		ShipToCode: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},

		PONo: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		VehicleNo: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		PackingListNo: {
			type: DataTypes.STRING,
			defaultValue: '',
			allowNull: true
		},
		Information: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: "",
		},

		Status: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		PrintCounter: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		PrintedBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		PrintedDate: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: null,
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

export default GoodIssueh
