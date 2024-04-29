"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("hoas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      iddanhmuchoachitiet: {
        type: Sequelize.INTEGER,
        references: {
          model: "danhmuchoachitiet",
          key: "id"
        }
      },
      tenhoaVi: {
        type: Sequelize.STRING,
      },
      tenhoaEn: {
        type: Sequelize.STRING,
      },
      tieudehoaVi: {
        type: Sequelize.TEXT("long"),
      },
      tieudehoaEn: {
        type: Sequelize.TEXT("long"),
      },
      anhnoibat: {
        type: Sequelize.BLOB("long"),
      },
      soluongcon: {
        type: Sequelize.INTEGER,
      },
      soluongnhap: {
        type: Sequelize.INTEGER,
      },
      soluongban: {
        type: Sequelize.INTEGER,
      },
      giathucVND: {
        type: Sequelize.INTEGER,
      },
      giathucUSD: {
        type: Sequelize.INTEGER,
      },
      phantramgiam: {
        type: Sequelize.INTEGER,
      },
      giasaukhigiamVND: {
        type: Sequelize.INTEGER,
      },
      giasaukhigiamUSD: {
        type: Sequelize.INTEGER,
      },
      motaspVi: {
        type: Sequelize.TEXT("long"),
      },
      motaspEn: {
        type: Sequelize.TEXT("long"),
      },
      motasphtmlVi: {
        type: Sequelize.TEXT("long"),
      },
      motasphtmlEn: {
        type: Sequelize.TEXT("long"),
      },
      donoibat: {
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
    await queryInterface.dropTable("hoas");
  },
};
