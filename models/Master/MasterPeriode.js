import { Sequelize } from 'sequelize'
import db from '../../config/Database.js'

const { DataTypes } = Sequelize

const MasterPeriode = db.define(
	'masterperiode',
	{
		Periode: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			primaryKey: true,
		},
		IsClosed: {
			type: DataTypes.BOOLEAN,
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

export default MasterPeriode
