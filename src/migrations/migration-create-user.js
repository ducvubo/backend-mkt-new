"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      ho: {
        type: Sequelize.STRING,
      },
      ten: {
        type: Sequelize.STRING,
      },
      sdt: {
        type: Sequelize.STRING,
      },
      diachinha: {
        type: Sequelize.STRING,
      },
      gioitinhId: {
        type: Sequelize.INTEGER,
        references: {
          model: "allcodes",
          key: "id"
        }
      },
      quyenId: {
        type: Sequelize.INTEGER,
        references: {
          model: "allcodes",
          key: "id"
        }
      },
      trangthaiId: {
        type: Sequelize.INTEGER,
        references: {
          model: "allcodes",
          key: "id"
        }
      },
      linkxacnhan: {
        type: Sequelize.STRING,
      },
      refresh_token: {
        type: Sequelize.STRING,
      },
      idchat: {
        type: Sequelize.STRING,
      },
      anhdaidien:
      {
        type: Sequelize.BLOB("long"),
        allowNull: true
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
    await queryInterface.dropTable("Users");
  },
};
