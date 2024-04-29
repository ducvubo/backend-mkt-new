import db from "../models/index";
const { Sequelize, Op } = require("sequelize");
require("dotenv").config();

let themDanhMuc = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Danhmuchoa.create({
        tendanhmucVi: data.tendanhmucVi,
        tendanhmucEn: data.tendanhmucEn,
        donoibat: data.donoibat,
      });
      resolve({
        maCode: 0,
        thongDiep: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let tatCaDanhMuc = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Danhmuchoa.findAll({
        order: [[Sequelize.literal("donoibat"), "DESC"]],
      });
      all = all.filter((item) => item.id !== 40);
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let xoaDanhMuc = (id) => {
  return new Promise(async (resolve, reject) => {
    let danhmuc = await db.Danhmuchoa.findOne({
      where: { id: id },
    });
    if (!danhmuc) {
      resolve({
        maCode: 1,
        thongDiep: "Danh mục không tồn tại",
      });
    }

    await db.Danhmuchoachitiet.update(
      { iddanhmuchoa: 40 },
      {
        where: { iddanhmuchoa: id },
      }
    );

    await db.Danhmuchoa.destroy({
      where: { id: id },
    });

    resolve({
      maCode: 0,
      thongDiep: "Xóa danh mục thành công",
    });
  });
};

let suaDanhMuc = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let danhmuc = await db.Danhmuchoa.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (danhmuc) {
        danhmuc.tendanhmucVi = data.tendanhmucVi;
        danhmuc.tendanhmucEn = data.tendanhmucEn;
        danhmuc.donoibat = data.donoibat;

        await danhmuc.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa danh mục thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy danh mục",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let danhMucHoaNoiBat = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Danhmuchoa.findAll({
        limit: 7,
        order: [["donoibat", "DESC"]],
        include: [
          {
            model: db.Danhmuchoachitiet,
            as: "danhmuc",
            attributes: ["tendanhmucchitietVi", "tendanhmucchitietEn", "id"],
          },
        ],
        raw: false,
        nest: true,
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  themDanhMuc: themDanhMuc,
  tatCaDanhMuc: tatCaDanhMuc,
  xoaDanhMuc: xoaDanhMuc,
  suaDanhMuc: suaDanhMuc,
  danhMucHoaNoiBat: danhMucHoaNoiBat,
};
