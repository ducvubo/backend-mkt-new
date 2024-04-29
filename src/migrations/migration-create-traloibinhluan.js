"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("traloibinhluans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idbinhluan: {
        type: Sequelize.INTEGER,
        references: {
          model: "binhluans",
          key: "id"
        }
      },
      idnguoidung: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      noidung: {
        type: Sequelize.STRING,
      },
      hinhanh: {
        type: Sequelize.BLOB("long"),
      },
      video: {
        type: Sequelize.BLOB("long"),
      },
      thoigian: {
        type: Sequelize.DATE,
      },
      trangthaitraloidanhgiaid: {
        type: Sequelize.INTEGER,
        references: {
          model: "allcodes",
          key: "id"
        }
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
    await queryInterface.dropTable("traloibinhluans");
  },
};
