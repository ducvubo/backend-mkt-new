"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Danhmuchoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Danhmuchoa.hasMany(models.Danhmuchoachitiet, {
        foreignKey: "iddanhmuchoa",
        as: "danhmuc",
      });
    }
  }
  Danhmuchoa.init(
    {
      tendanhmucVi: DataTypes.STRING,
      tendanhmucEn: DataTypes.STRING,
      donoibat: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Danhmuchoa",
      freezeTableName: true,
    }
  );
  return Danhmuchoa;
};
