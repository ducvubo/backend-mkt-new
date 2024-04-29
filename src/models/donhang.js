"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donhang extends Model {
    static associate(models) {
        Donhang.belongsTo(models.Phuongthucvanchuyen, {foreignKey: 'phuongthucvanchuyenid', targetKey:'id', as: 'vanchuyen'})
        Donhang.belongsTo(models.Allcode, {foreignKey: 'trangthaidonhangid', targetKey:'id', as: 'trangthaidonhang'})
        Donhang.belongsTo(models.User, {foreignKey: 'idnguoidung', targetKey:'id', as: 'khachhang'})
        Donhang.belongsToMany(models.hoa, {
            through: "Donhangchitiet",
            foreignKey: "iddonhang",
            otherKey: "idhoa",
            as: "hoas",
          });
        Donhang.hasMany(models.Donhangchitiet, {
            foreignKey: "iddonhang",
            as: "donhang123",
          });
    }
  }
  Donhang.init(
    {
      idnguoidung: DataTypes.INTEGER,
      madonhang: DataTypes.STRING,
      tennguoinhan: DataTypes.STRING,
      email: DataTypes.STRING,
      sodienthoai: DataTypes.STRING,
      diachi: DataTypes.STRING,
      ghichu: DataTypes.STRING,
      trangthaidonhangid:DataTypes.INTEGER,
      phuongthucvanchuyenid:DataTypes.STRING,
      tongtien: DataTypes.INTEGER,
      phanhoikhachhang:DataTypes.STRING,
      phanhoicuahang:DataTypes.STRING,
      ngonngu:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Donhang",
    }
  );
  return Donhang;
};
