"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("nhaphoas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idnhanvien: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      maphieunhap: {
        type: Sequelize.STRING,
      },
      tennhacungcap: {
        type: Sequelize.STRING,
      },
      diachinhacungcap: {
        type: Sequelize.STRING,
      },
      sodienthoainhacungcap: {
        type: Sequelize.STRING,
      },
      nguoicungcap: {
        type: Sequelize.STRING,
      },
      sodienthoainguoicungcap: {
        type: Sequelize.STRING,
      },
      ngaynhap: {
        type: Sequelize.DATE,
      },
      tonghoadon: {
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
    await queryInterface.dropTable("nhaphoas");
  },
};
