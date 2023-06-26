import {Sequelize} from "sequelize";

const db = new Sequelize('erp_dev', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;