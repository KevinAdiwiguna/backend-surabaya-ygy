import { Sequelize } from "sequelize";



const db = new Sequelize('erp_dev', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
    define: {
        createdAt: 'CreatedDate',
        updatedAt: 'ChangedDate',
    },
    timestamps: {
        dateFormat: 'YYYY-MM-DD'
    }
});
export default db;