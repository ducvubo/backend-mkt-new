"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nhaphoachitiet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Nhaphoachitiet.belongsTo(models.Nhaphoa, {
        foreignKey: "idnhaphoa",
        targetKey: "id",
        as: "nhaphoa",
      });
      Nhaphoachitiet.belongsTo(models.hoa, {
        foreignKey: "idhoa",
        targetKey: "id",
        as: "hoa123",
      });
    }
  }
  Nhaphoachitiet.init(
    {
      idnhaphoa: DataTypes.INTEGER,
      idhoa: DataTypes.INTEGER,
      donvitinh: DataTypes.STRING,
      soluongnhaptrenphieu: DataTypes.INTEGER,
      soluongnhapthucte: DataTypes.INTEGER,
      gianhap: DataTypes.INTEGER,
      giatong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Nhaphoachitiet",
    }
  );
  return Nhaphoachitiet;
};
