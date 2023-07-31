import { Sequelize } from 'sequelize'
import dotenv  from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	port: process.env.DB_PORT,
	define: {
		createdAt: 'CreatedDate',
		updatedAt: 'ChangedDate',
	},
	timestamps: {
		dateFormat: 'YYYY-MM-DD',
	},
})
export default db
