"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("chats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tennguoigui: {
        type: Sequelize.STRING,
      },
      tennguoinhan: {
        type: Sequelize.STRING,
      },
      nguoigui: {
        type: Sequelize.STRING,
        // references: {
        //   model: "Users",
        //   key: "id"
        // }
      },
      nguoinhan: {
        type: Sequelize.STRING,
        // references: {
        //   model: "Users",
        //   key: "id"
        // }
      },
      noidung: {
        type: Sequelize.STRING,
      },
      anh: {
        type: Sequelize.BLOB("long"),
      },
      thoigian: {
        type: Sequelize.DATE,
      },
      trangthaixem: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("chats");
  },
};
