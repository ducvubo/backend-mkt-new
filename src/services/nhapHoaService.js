import db from "../models/index";
const { sequelize, Op } = require("sequelize");

let themHoaDon = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Nhaphoa.create({
        idnhanvien: data.idnhanvien,
        maphieunhap: data.maphieunhap,
        tennhacungcap: data.tennhacungcap,
        diachinhacungcap: data.diachinhacungcap,
        sodienthoainhacungcap: data.sodienthoainhacungcap,
        nguoicungcap: data.nguoicungcap,
        sodienthoainguoicungcap: data.sodienthoainguoicungcap,
        ngaynhap: data.ngaynhap,
        // tonghoadon: data.tonghoadon,
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

let tatCaHoaDon = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Nhaphoa.findAll({
        include: [
          {
            model: db.User,
            as: "nhanvien",
            attributes: ["ho", "ten"],
          },
          {
            model: db.Nhaphoachitiet,
            as: "hoa123",
            attributes: ["idhoa","soluongnhapthucte","gianhap","giatong"],
            include: [
              {
                model: db.hoa,
                as: "hoa123",
                attributes: ["tenhoavi"],
              },
            ],
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

let suaHoaDon = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hoadon = await db.Nhaphoa.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (hoadon) {
        hoadon.idnhanvien = data.idnhanvien;
        hoadon.maphieunhap = data.maphieunhap;
        hoadon.tennhacungcap = data.tennhacungcap;
        hoadon.diachinhacungcap = data.diachinhacungcap;
        hoadon.sodienthoainhacungcap = data.sodienthoainhacungcap;
        hoadon.nguoicungcap = data.nguoicungcap;
        hoadon.sodienthoainguoicungcap = data.sodienthoainguoicungcap;
        hoadon.ngaynhap = data.ngaynhap;

        await hoadon.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa hóa đơn thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy hóa đơn",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xoaHoaDon = (id) => {
  return new Promise(async (resolve, reject) => {
    let hoadon = await db.Nhaphoa.findOne({
      where: { id: id },
    });
    if (!hoadon) {
      resolve({
        maCode: 1,
        thongDiep: "Hóa đơn không tồn tại",
      });
    } else {
      
      await db.Nhaphoachitiet.destroy({
        where: { idnhaphoa: id },
      });
      await db.Nhaphoa.destroy({
        where: { id: id },
      });
      resolve({
        maCode: 0,
        thongDiep: "Xóa hóa đơn thành công",
      });
    }
  });
};

let thongKeNhapHoa = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Nhaphoa.findAll({
        where: {
          ngaynhap: {
            [Op.between]: [data.tungay, data.denngay],
          },
        },
        include: [
          {
            model: db.User,
            as: "nhanvien",
            attributes: ["ho", "ten"],
          },
          {
            model: db.Nhaphoachitiet,
            as: "hoa123",
            attributes: ["idhoa","soluongnhapthucte","gianhap","giatong"],
            include: [
              {
                model: db.hoa,
                as: "hoa123",
                attributes: ["tenhoavi"],
              },
            ],
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
  themHoaDon,
  tatCaHoaDon,
  suaHoaDon,
  xoaHoaDon,
  thongKeNhapHoa,
};
