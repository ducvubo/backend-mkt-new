"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("phuongthucvanchuyens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tenphuongthucVi: {
        type: Sequelize.STRING,
      },
      tenphuongthucEn: {
        type: Sequelize.STRING,
      },
      giaVND: {
        type: Sequelize.INTEGER,
      },
      giaUSD: {
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
    await queryInterface.dropTable("phuongthucvanchuyens");
  },
};
