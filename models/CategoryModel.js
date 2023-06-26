import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import menuModel from './MenuModel.js'

const { DataTypes } = Sequelize;

const category = db.define('category_menu', {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
}, {
    freezeTableName: true
});

category.hasOne(menuModel, {foreignKey: 'category'})
menuModel.hasMany(category, { foreignKey: 'category' })

export default category;