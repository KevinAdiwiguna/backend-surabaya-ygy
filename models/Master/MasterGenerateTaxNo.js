import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const mastergeneratetaxno = db.define(
  "taxno",
  {
    TaxNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },

    DocNo: {
      type: DataTypes.STRING,
<<<<<<< HEAD
      allowNull: true,
=======
      allowNull: false,
>>>>>>> 28ecba0707e490d96f2df089dcce6c9a75ccaa83
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
);

export default mastergeneratetaxno;
