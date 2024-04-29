"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nhaphoa extends Model {
    static associate(models) {
      Nhaphoa.belongsTo(models.User, {
        foreignKey: "idnhanvien",
        targetKey: "id",
        as: "nhanvien",
      });
      Nhaphoa.belongsToMany(models.hoa, {
        through: "Nhaphoachitiet",
        foreignKey: "idnhaphoa",
        otherKey: "idhoa",
        as: "hoas",
      });
      Nhaphoa.hasMany(models.Nhaphoachitiet, {
        foreignKey: "idnhaphoa",
        as: "hoa123",
      });
    }
  }
  Nhaphoa.init(
    {
      idnhanvien: DataTypes.INTEGER,
      maphieunhap: DataTypes.STRING,
      tennhacungcap: DataTypes.STRING,
      diachinhacungcap: DataTypes.STRING,
      sodienthoainhacungcap: DataTypes.STRING,
      nguoicungcap: DataTypes.STRING,
      sodienthoainguoicungcap: DataTypes.STRING,
      ngaynhap: DataTypes.DATE,
      tonghoadon: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Nhaphoa",
    }
  );
  return Nhaphoa;
};
