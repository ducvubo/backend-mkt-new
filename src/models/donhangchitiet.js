"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donhangchitiet extends Model {
    static associate(models) {
        Donhangchitiet.belongsTo(models.Donhang, {
            foreignKey: "iddonhang",
            targetKey: "id",
            as: "donhang123",
          });
          Donhangchitiet.belongsTo(models.hoa, {
            foreignKey: "idhoa",
            targetKey: "id",
            as: "hoa123",
          });
    }
  }
  Donhangchitiet.init(
    {
      iddonhang:DataTypes.INTEGER,
      idhoa: DataTypes.INTEGER,
      soluongmua: DataTypes.INTEGER,
      tongtien: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Donhangchitiet",
    }
  );
  return Donhangchitiet;
};
