"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("danhmuchoachitiet", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      iddanhmuchoa: {
        type: Sequelize.INTEGER,
        references: {
          model: "danhmuchoa",
          key: "id"
        }
      },
      tendanhmucchitietVi: {
        type: Sequelize.STRING,
      },
      tendanhmucchitietEn: {
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
    await queryInterface.dropTable("danhmuchoachitiet");
  },
};
