"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("giohanghoas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idgiohang: {
        type: Sequelize.INTEGER,
        references: {
          model: "giohangs",
          key: "id",
        },
      },
      idhoa: {
        type: Sequelize.INTEGER,
        references: {
          model: "hoas",
          key: "id",
        },
      },
      soluong: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("giohanghoas");
  },
};
