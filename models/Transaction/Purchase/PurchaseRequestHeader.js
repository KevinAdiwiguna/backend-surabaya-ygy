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

<<<<<<< HEAD
    JODocNo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        },
    },

    Trip:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        },
    },

    Department:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        },
    },
=======
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
>>>>>>> 623e93316f16108268d26700770614cc49ad26ac

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
