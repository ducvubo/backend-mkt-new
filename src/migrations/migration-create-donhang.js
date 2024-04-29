"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("donhangs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idnguoidung: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      madonhang: {
        type: Sequelize.STRING,
      },
      tennguoinhan: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      sodienthoai: {
        type: Sequelize.STRING,
      },
      diachi: {
        type: Sequelize.STRING,
      },
      ghichu: {
        type: Sequelize.STRING,
      },
      trangthaidonhangid: {
        type: Sequelize.INTEGER,
        references: {
          model: "allcodes",
          key: "id"
        }
      },
      phuongthucvanchuyenid: {
        type: Sequelize.INTEGER,
        references: {
          model: "phuongthucvanchuyens",
          key: "id"
        }
      },
      tongtien: {
        type: Sequelize.INTEGER,
      },
      phanhoikhachhang: {
        type: Sequelize.STRING,
      },
      phanhoicuahang: {
        type: Sequelize.STRING,
      },
      ngonngu: {
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
    await queryInterface.dropTable("donhangs");
  },
};
