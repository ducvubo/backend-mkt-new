'use strict';
const { STRING } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Traloibinhluan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Traloibinhluan.belongsTo(models.Binhluan, {
        foreignKey: "idbinhluan",
        targetKey: "id",
        as: "traloibinhluan",
      });
      Traloibinhluan.belongsTo(models.User, {
        foreignKey: "idnguoidung",
        targetKey: "id",
        as: "nguoidungtraloibinhluan",
      });
      Traloibinhluan.belongsTo(models.Allcode, {
        foreignKey: "trangthaitraloidanhgiaid",
        targetKey: "id",
        as: "trangthaitraloidanhgia",
      });
    }
  };
  Traloibinhluan.init({
    idbinhluan: DataTypes.INTEGER,
    idnguoidung: DataTypes.INTEGER,
    noidung: DataTypes.STRING,
    hinhanh:DataTypes.BLOB("long"),
    video:DataTypes.BLOB("long"),
    thoigian:DataTypes.DATE,
    trangthaitraloidanhgiaid:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Traloibinhluan',
  });
  return Traloibinhluan;
};