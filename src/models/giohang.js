"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Giohang extends Model {
    static associate(models) {
      Giohang.belongsTo(models.User, { foreignKey: 'idnguoidung', as: 'nguoidung' });
      Giohang.belongsToMany(models.hoa, {
        through: 'Giohanghoa',
        foreignKey: 'idgiohang',
        otherKey: 'idhoa',
        as: 'hoas'
      });
      Giohang.hasMany(models.Giohanghoa, {foreignKey: 'idgiohang', as: 'giohang'})
    }
  }
  Giohang.init(
    {
      idnguoidung: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Giohang",
      // freezeTableName: true,
    }
  );
  return Giohang;
};
