"use strict";
const { STRING } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Binhluan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Binhluan.belongsTo(models.hoa, {
        foreignKey: "idhoa",
        targetKey: "id",
        as: "hoabinhluan",
      });
      Binhluan.belongsTo(models.User, {
        foreignKey: "idnguoidung",
        targetKey: "id",
        as: "nguoidungbinhluan",
      });
      Binhluan.belongsTo(models.Allcode, {
        foreignKey: "trangthaidanhgiaid",
        targetKey: "id",
        as: "trangthaidanhgia",
      });
      Binhluan.hasMany(models.Traloibinhluan, {foreignKey: 'idbinhluan', as: 'traloibinhluan'})

    }

  }
  Binhluan.init(
    {
      idhoa: DataTypes.INTEGER,
      idnguoidung: DataTypes.INTEGER,
      sosaodanhgia: DataTypes.INTEGER,
      noidung: DataTypes.STRING,
      hinhanh: DataTypes.BLOB("long"),
      video: DataTypes.BLOB("long"),
      thoigian: DataTypes.DATE,
      trangthaidanhgiaid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Binhluan",
    }
  );
  return Binhluan;
};
