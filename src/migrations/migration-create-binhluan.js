"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("binhluans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idhoa: {
        type: Sequelize.INTEGER,
        references: {
          model: "hoas",
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
      sosaodanhgia: {
        type: Sequelize.INTEGER,
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
      trangthaidanhgiaid: {
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
    await queryInterface.dropTable("binhluans");
  },
};
