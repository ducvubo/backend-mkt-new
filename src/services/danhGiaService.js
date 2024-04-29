import db from "../models/index";
const { Sequelize, Op } = require("sequelize");

let themDanhGia = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Binhluan.create({
        idhoa: data.idhoa,
        idnguoidung: data.idnguoidung,
        sosaodanhgia: data.sosaodanhgia,
        noidung: data.noidung,
        hinhanh: data.hinhanh ? data.hinhanh : null,
        video: data.video ? data.video : null,
        thoigian: data.thoigian,
        trangthaidanhgiaid: 27,
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

let themTraLoiBinhLuan = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Traloibinhluan.create({
        idbinhluan: data.idbinhluan,
        idnguoidung: data.idnguoidung,
        noidung: data.noidung,
        hinhanh: data.hinhanh ? data.hinhanh : null,
        video: data.video ? data.video : null,
        thoigian: data.thoigian,
        trangthaitraloidanhgiaid: 27,
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

let binhLuanTheoHoa = (idhoa) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.Binhluan.findAll({
        where: { idhoa: idhoa, trangthaidanhgiaid: 28 },
        include: [
          {
            model: db.Traloibinhluan,
            where: { trangthaitraloidanhgiaid: 28 },
            required: false,
            as: "traloibinhluan",

            include: [
              {
                model: db.User,
                as: "nguoidungtraloibinhluan",
                attributes: {
                  exclude: [
                    "password",
                    "email",
                    "linkxacnhan",
                    "refresh_token",
                  ],
                },
              },
              {
                model: db.Allcode,
                as: "trangthaitraloidanhgia",
              },
            ],
          },
          {
            model: db.User,
            as: "nguoidungbinhluan",
            attributes: {
              exclude: ["password", "email", "linkxacnhan", "refresh_token"],
            },
          },
          {
            model: db.Allcode,
            as: "trangthaidanhgia",
          },
        ],
        raw: false,
        nest: true,
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let layTatCaBinhLuan = (idhoa) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.Binhluan.findAll({
        order: [[Sequelize.literal("createdAt"), "DESC"]],
        include: [
          {
            model: db.Traloibinhluan,
            as: "traloibinhluan",
            include: [
              {
                model: db.User,
                as: "nguoidungtraloibinhluan",
                attributes: {
                  exclude: [
                    "password",
                    "email",
                    "linkxacnhan",
                    "refresh_token",
                  ],
                },
              },
              {
                model: db.Allcode,
                as: "trangthaitraloidanhgia",
              },
            ],
          },
          {
            model: db.User,
            as: "nguoidungbinhluan",
            attributes: {
              exclude: ["password", "email", "linkxacnhan", "refresh_token"],
            },
          },
          {
            model: db.Allcode,
            as: "trangthaidanhgia",
          },
          {
            model: db.hoa,
            as: "hoabinhluan",
            attributes: {
              exclude: [
                "iddanhmuchoachitiet",
                "tieudehoaVi",
                "tieudehoaEn",
                "soluongnhap",
                "soluongban",
                "motaspVi",
                "motaspEn",
                "motasphtmlVi",
                "motasphtmlEn",
                "ghichuVi",
                "ghichuEn",
                "donoibat",
                "anhnoibat",
                "soluongcon",
                "giathucUSD",
                "giathucVND",
                "phantramgiam",
                "giasaukhigiamUSD",
                "giasaukhigiamVND",
              ],
            },
          },
        ],
        raw: false,
        nest: true,
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let duyetHuyDuyetDanhGia = (id, bang, trangthai) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (bang === "danhgia" && trangthai === "duyet") {
        await db.Binhluan.update(
          { trangthaidanhgiaid: 28 },
          {
            where: { id: id },
          }
        );
      }
      if (bang === "danhgia" && trangthai === "huyduyet") {
        await db.Binhluan.update(
          { trangthaidanhgiaid: 27 },
          {
            where: { id: id },
          }
        );
      }
      if (bang === "traloi" && trangthai === "duyet") {
        await db.Traloibinhluan.update(
          { trangthaitraloidanhgiaid: 28 },
          {
            where: { id: id },
          }
        );
      }
      if (bang === "traloi" && trangthai === "huyduyet") {
        await db.Traloibinhluan.update(
          { trangthaitraloidanhgiaid: 27 },
          {
            where: { id: id },
          }
        );
      }
      resolve({
        maCode: 0,
        thongDiep: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let xoaDanhGiaTraLoiDanhGiaKH = (id, bang) => {
  return new Promise(async (resolve, reject) => {
    if (bang === "danhgia") {
      await db.Traloibinhluan.destroy({
        where: { idbinhluan: id },
      });
      await db.Binhluan.destroy({
        where: { id: id },
      });
     
    }

    if (bang === "traloi") {
      await db.Traloibinhluan.destroy({
        where: { id: id },
      });
    }

    resolve({
      maCode: 0,
      thongDiep: "Xóa đánh giá thành công",
    });
  });
};

module.exports = {
  themDanhGia,
  binhLuanTheoHoa,
  themTraLoiBinhLuan,
  layTatCaBinhLuan,
  duyetHuyDuyetDanhGia,
  xoaDanhGiaTraLoiDanhGiaKH,
};
