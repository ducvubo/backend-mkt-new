"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hoa.belongsTo(models.Danhmuchoachitiet, {foreignKey: "iddanhmuchoachitiet",targetKey: "id",as: "danhmuchoachitiet"});
      hoa.belongsToMany(models.Giohang, {
        through: 'Giohanghoa',
        foreignKey: 'idhoa',
        otherKey: 'idgiohang',
        as: 'giohangs'
      });
      hoa.belongsToMany(models.Nhaphoa, {
        through: 'Nhaphoachitiet',
        foreignKey: 'idhoa',
        otherKey: 'idnhaphoa',
        as: 'nhaphoas'
      });
      hoa.hasMany(models.Nhaphoachitiet, {foreignKey: 'idhoa', as: 'nhaphoa'})
      hoa.belongsToMany(models.Donhang, {
        through: 'Donhangchitiet',
        foreignKey: 'idhoa',
        otherKey: 'iddonhang',
        as: 'donhangs'
      });
      hoa.hasMany(models.Donhangchitiet, {
        foreignKey: "idhoa",
        as: "hoa123",
      });
    hoa.hasMany(models.Binhluan, {foreignKey: 'idhoa', as: 'hoabinhluan'})
    hoa.hasMany(models.Giohanghoa, {foreignKey: 'idhoa', as: 'hoagiohang'})
    };

  }
  hoa.init(
    {
      iddanhmuchoachitiet: DataTypes.INTEGER,
      tenhoaVi: DataTypes.STRING,
      tenhoaEn: DataTypes.STRING,
      tieudehoaVi: DataTypes.TEXT("long"),
      tieudehoaEn: DataTypes.TEXT("long"),
      anhnoibat: DataTypes.BLOB("long"),
      soluongcon: DataTypes.INTEGER,
      soluongnhap: DataTypes.INTEGER,
      soluongban: DataTypes.INTEGER,
      giathucVND: DataTypes.INTEGER,
      giathucUSD: DataTypes.INTEGER,
      phantramgiam: DataTypes.INTEGER,
      giasaukhigiamVND: DataTypes.INTEGER,
      giasaukhigiamUSD: DataTypes.INTEGER,
      motaspVi: DataTypes.TEXT("long"),
      motaspEn: DataTypes.TEXT("long"),
      motasphtmlVi: DataTypes.TEXT("long"),
      motasphtmlEn: DataTypes.TEXT("long"),
      donoibat: DataTypes.INTEGER,
      ghichuVi: DataTypes.STRING,
      ghichuEn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "hoa",
    }
  );
  return hoa;
};
