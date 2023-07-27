import { Sequelize } from 'sequelize'
import db from '../../../config/Database.js'

const { DataTypes } = Sequelize

const purchaseRequestHeader = db.define(
	'purchaserequesth',
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
		},

		DocDate: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},

		JODocNo: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		Trip: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		Department: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		Information: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		Status: {
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

export default purchaseRequestHeader
