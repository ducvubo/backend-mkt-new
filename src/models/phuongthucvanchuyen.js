"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phuongthucvanchuyen extends Model {
    static associate(models) {
        Phuongthucvanchuyen.hasMany(models.Donhang, {foreignKey: 'phuongthucvanchuyenid', as: 'vanchuyen'})
     
    }
  }
  Phuongthucvanchuyen.init(
    {
      tenphuongthucVi: DataTypes.STRING,
      tenphuongthucEn: DataTypes.STRING,
      giaVND: DataTypes.INTEGER,
      giaUSD: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Phuongthucvanchuyen",
    }
  );
  return Phuongthucvanchuyen;
};
 