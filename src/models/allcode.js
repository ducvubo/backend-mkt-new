"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, {
        foreignKey: "gioitinhId",
        as: "gioitinh",
      });
      Allcode.hasMany(models.User, { foreignKey: "quyenId", as: "quyen" });
      Allcode.hasMany(models.User, {
        foreignKey: "trangthaiId",
        as: "trangthai",
      });
      Allcode.hasMany(models.Donhang, {
        foreignKey: "trangthaidonhangid",
        as: "trangthaidonhang",
      });
      Allcode.hasMany(models.Binhluan, {
        foreignKey: "trangthaidanhgiaid",
        as: "trangthaidanhgia",
      });
      Allcode.hasMany(models.Traloibinhluan, {
        foreignKey: "trangthaitraloidanhgiaid",
        as: "trangthaitraloidanhgia",
      });
    }
  }
  Allcode.init(
    {
      kieu: DataTypes.STRING,
      idNoi: DataTypes.STRING,
      tiengViet: DataTypes.STRING,
      tiengAnh: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
