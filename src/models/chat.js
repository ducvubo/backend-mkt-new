"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      // Chat.belongsTo(models.User, {
      //   foreignKey: "nguoinhan",
      //   targetKey: "id",
      //   as: "nguoinhan",
      // });
      // Chat.belongsTo(models.User, {
      //   foreignKey: "nguoigui",
      //   targetKey: "id",
      //   as: "nguoigui",
      // });
    }
  }
  Chat.init(
    {  
      
      tennguoigui: DataTypes.STRING,
      tennguoinhan: DataTypes.STRING,
      nguoigui: DataTypes.STRING,
      nguoinhan: DataTypes.STRING,
      noidung: DataTypes.STRING,
      anh:DataTypes.BLOB("long"),
      thoigian: DataTypes.DATE,
      trangthaixem: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
