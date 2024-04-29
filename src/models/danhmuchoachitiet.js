"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Danhmuchoachitiet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Danhmuchoachitiet.belongsTo(models.Danhmuchoa, { foreignKey: "iddanhmuchoa", targetKey: "id", as: "danhmuc",});
      Danhmuchoachitiet.hasMany(models.hoa, {foreignKey: 'iddanhmuchoachitiet', as: 'danhmuchoachitiet',onDelete: 'CASCADE'})
    }
  }
  Danhmuchoachitiet.init(
    {
      iddanhmuchoa: DataTypes.INTEGER,
      tendanhmucchitietVi: DataTypes.STRING,
      tendanhmucchitietEn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Danhmuchoachitiet",
      freezeTableName: true,
    }
  );
  return Danhmuchoachitiet;
};
