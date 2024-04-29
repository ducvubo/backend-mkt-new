import db, { sequelize } from "../models/index";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

let layTatCaPhuongThucVanChuyen = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Phuongthucvanchuyen.findAll();
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let capNhatGioHangKhiDatHang = (id) => {
  // console.log(id);
  return new Promise(async (resolve, reject) => {
    let timgiohangchitiet = await db.Giohanghoa.findOne({
      where: { id: id },
    });
    if (!timgiohangchitiet) {
      resolve({
        maCode: 1,
        thongDiep: "Giỏ hàng hoa không tồn tại",
      });
    } else {
      await db.Giohanghoa.destroy({
        where: { id: id },
      });
      resolve({
        maCode: 0,
        thongDiep: "Xóa giỏ hàng hoa thành công",
      });
    }
  });
};

let datHang = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let madonhang = uuidv4();
      let donhangchitiet =
        data &&
        data.donhangchitiet &&
        data.donhangchitiet.length > 0 &&
        data.donhangchitiet.map((item) => {
          return { ...item };
        });

      await db.Donhang.create({
        idnguoidung: data.idnguoidung,
        madonhang: madonhang,
        tennguoinhan: data.tennguoinhan,
        email: data.email,
        sodienthoai: data.sodienthoai,
        diachi: data.diachi,
        ghichu: data.ghichu,
        trangthaidonhangid: 18,
        phuongthucvanchuyenid: data.phuongthucvanchuyenid,
        tongtien: data.tongtien,
        ngonngu: data.ngonngu,
      });

      let iddonhang = await db.Donhang.findOne({
        where: { madonhang: madonhang },
      });

      let donhangchitiet1 =
        donhangchitiet &&
        donhangchitiet.length > 0 &&
        donhangchitiet.map((item) => {
          return { ...item, iddonhang: iddonhang.id };
        });

      await db.Donhangchitiet.bulkCreate(donhangchitiet1);

      data &&
        data.idgiohangchitietduocchon &&
        data.idgiohangchitietduocchon.length > 0 &&
        data.idgiohangchitietduocchon.map((item) => {
          return capNhatGioHangKhiDatHang(item.id);
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

let datHangChuaDangNhap = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let madonhang = uuidv4();
      let donhangchitiet =
        data &&
        data.donhangchitiet &&
        data.donhangchitiet.length > 0 &&
        data.donhangchitiet.map((item) => {
          return { ...item };
        });

      await db.Donhang.create({
        idnguoidung: data.idnguoidung ? data.idnguoidung : null,
        madonhang: madonhang,
        tennguoinhan: data.tennguoinhan,
        email: data.email,
        sodienthoai: data.sodienthoai,
        diachi: data.diachi,
        ghichu: data.ghichu,
        trangthaidonhangid: 18,
        phuongthucvanchuyenid: data.phuongthucvanchuyenid,
        tongtien: data.tongtien,
        ngonngu: data.ngonngu,
      });

      let iddonhang = await db.Donhang.findOne({
        where: { madonhang: madonhang },
      });

      let donhangchitiet1 =
        donhangchitiet &&
        donhangchitiet.length > 0 &&
        donhangchitiet.map((item) => {
          return { ...item, iddonhang: iddonhang.id };
        });

      await db.Donhangchitiet.bulkCreate(donhangchitiet1);

      resolve({
        maCode: 0,
        thongDiep: "OK",
        madonhang,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let datHangTrangChu = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let madonhang = uuidv4();

      await db.Donhang.create({
        idnguoidung: data.idnguoidung ? data.idnguoidung : null,
        madonhang: madonhang,
        tennguoinhan: data.tennguoinhan,
        email: data.email,
        sodienthoai: data.sodienthoai,
        diachi: data.diachi,
        ghichu: data.ghichu,
        trangthaidonhangid: 18,
        phuongthucvanchuyenid: data.phuongthucvanchuyenid,
        tongtien: data.tongtien,
        ngonngu: data.ngonngu,
      });

      let donhang = await db.Donhang.findOne({
        where: { madonhang: madonhang },
      });

      await db.Donhangchitiet.create({
        iddonhang: donhang.id,
        idhoa: data.idhoa,
        soluongmua: data.soluongmua,
        tongtien: data.tongtienhang,
      });

      resolve({
        madonhang: madonhang,
        maCode: 0,
        thongDiep: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let tatCaDonHangTheoTrangThai = (trangthaidonhang) => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Donhang.findAll({
        where: { trangthaidonhangid: trangthaidonhang },

        include: [
          {
            model: db.hoa,
            as: "hoas",
            through: {
              attributes: ["idhoa", "soluongmua", "tongtien"],
            },
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
                "phantramgiam",
                "createdAt",
                "updatedAt",
              ],
            },
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

let capNhatHoaKhiDatHang = (id, soluongmua) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hoa = await db.hoa.findOne({
        where: { id: id },
        raw: false,
      });
      if (hoa) {
        hoa.soluongcon = hoa.soluongcon - soluongmua;
        hoa.soluongban = hoa.soluongban + soluongmua;
        await hoa.save();

        resolve({
          maCode: 0,
          thongDiep: "Cập nhật hoa thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy hoa",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xacNhanDonHang = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let donhang = await db.Donhang.findOne({
        where: { madonhang: data.madonhang },
        raw: false,
      });
      if (donhang) {
        donhang.trangthaidonhangid = 19;
        donhang.phanhoicuahang = data.phanhoicuahang;
        await donhang.save();

        data &&
          data.hoa &&
          data.hoa.length > 0 &&
          data.hoa.map((item) => {
            return capNhatHoaKhiDatHang(item.id, item.soluongmua);
          });

        resolve({
          maCode: 0,
          thongDiep: "Xác nhận đơn hàng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy đơn hàng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let huyDonHang = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let donhang = await db.Donhang.findOne({
        where: { madonhang: data.madonhang },
        raw: false,
      });
      if (donhang) {
        donhang.trangthaidonhangid = 23;
        donhang.phanhoicuahang = data.phanhoicuahang
          ? data.phanhoicuahang
          : null;
        await donhang.save();

        resolve({
          maCode: 0,
          thongDiep: "Xác nhận đơn hàng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy đơn hàng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xacNhanDonHangGiaoDonViVanChuyen = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let donhang = await db.Donhang.findOne({
        where: { madonhang: data.madonhang },
        raw: false,
      });
      if (donhang) {
        donhang.trangthaidonhangid = 20;
        await donhang.save();

        resolve({
          maCode: 0,
          thongDiep: "Xác nhận đơn hàng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy đơn hàng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xacNhanDonHangDaGiaoChoKhachHang = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let donhang = await db.Donhang.findOne({
        where: { madonhang: data.madonhang },
        raw: false,
      });
      if (donhang) {
        donhang.trangthaidonhangid = 21;
        await donhang.save();

        resolve({
          maCode: 0,
          thongDiep: "Xác nhận đơn hàng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy đơn hàng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let layDonHangNguoiDung = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Donhang.findAll({
        where: { idnguoidung: id },

        include: [
          {
            model: db.hoa,
            as: "hoas",
            through: {
              attributes: ["idhoa", "soluongmua", "tongtien"],
            },
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
                "phantramgiam",
                "createdAt",
                "updatedAt",
              ],
            },
          },
          {
            model: db.Allcode,
            as: "trangthaidonhang",
            attributes: ["tiengViet", "tiengAnh"],
          },
          {
            model: db.Phuongthucvanchuyen,
            as: "vanchuyen",
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

let xacNhanDaNhanDuocHang = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let donhang = await db.Donhang.findOne({
        where: { madonhang: data.madonhang },
        raw: false,
      });
      if (donhang) {
        donhang.trangthaidonhangid = 22;
        await donhang.save();

        resolve({
          maCode: 0,
          thongDiep: "Xác nhận đơn hàng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy đơn hàng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let huyDonHangNguoiDung = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let donhang = await db.Donhang.findOne({
        where: { madonhang: data.madonhang },
        raw: false,
      });
      if (donhang) {
        donhang.trangthaidonhangid = 23;
        donhang.phanhoikhachhang = data.phanhoikhachhang
          ? data.phanhoikhachhang
          : null;
        await donhang.save();

        resolve({
          maCode: 0,
          thongDiep: "Xác nhận đơn hàng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy đơn hàng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let yeuCauHoanHangHoanTien = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let donhang = await db.Donhang.findOne({
        where: { madonhang: data.madonhang },
        raw: false,
      });
      if (donhang) {
        donhang.trangthaidonhangid = 24;
        donhang.phanhoikhachhang = data.phanhoikhachhang
          ? data.phanhoikhachhang
          : null;
        await donhang.save();

        resolve({
          maCode: 0,
          thongDiep: "Yêu cầu hoàn hàng, hoàn tiền thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy đơn hàng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xacNhanDaXuLyYeuCauHoanHangHoanTien = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let donhang = await db.Donhang.findOne({
        where: { madonhang: data.madonhang },
        raw: false,
      });
      if (donhang) {
        donhang.trangthaidonhangid = 26;
        await donhang.save();

        resolve({
          maCode: 0,
          thongDiep: "Xác nhận đơn hàng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy đơn hàng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let thongKeBanHoa = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Donhang.findAll({
        where: {
          createdAt: {
            [Op.between]: [data.tungay, data.denngay],
          },
        },

        include: [
          {
            model: db.hoa,
            as: "hoas",
            through: {
              attributes: ["idhoa", "soluongmua", "tongtien", "madonhang123"],
            },
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
                "phantramgiam",
                "updatedAt",
              ],
            },
          },
          {
            model: db.Allcode,
            as: "trangthaidonhang",
            attributes: ["tiengViet", "tiengAnh"],
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

let tatCaDonHang = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Donhang.findAll({
        include: [
          {
            model: db.hoa,
            as: "hoas",
            through: {
              attributes: ["idhoa", "soluongmua", "tongtien", "madonhang123"],
            },
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
                "phantramgiam",
                "updatedAt",
              ],
            },
          },
          {
            model: db.Allcode,
            as: "trangthaidonhang",
            attributes: ["tiengViet", "tiengAnh"],
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

let layDonHangTheoMaDonHang = (madonhang) => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Donhang.findAll({
        where: { madonhang: madonhang },

        include: [
          {
            model: db.hoa,
            as: "hoas",
            through: {
              attributes: ["idhoa", "soluongmua", "tongtien"],
            },
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
                "phantramgiam",
                "createdAt",
                "updatedAt",
              ],
            },
          },
          {
            model: db.Allcode,
            as: "trangthaidonhang",
            attributes: ["tiengViet", "tiengAnh"],
          },
          {
            model: db.Phuongthucvanchuyen,
            as: "vanchuyen",
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

let layDonHangChuaDN = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          maCode: 1,
          thongDiep: "Chua co don hang",
        });
      } else {
        let donhangchuaDN = [];
        if (data && data.length > 0) {
          donhangchuaDN = await Promise.all(
            data.map(async (item) => {
              let obj = {};
              let arr = await layDonHangTheoMaDonHang(item);
              obj = arr[0];
              return obj;
            })
          );
        }
        resolve(donhangchuaDN);
      }
    } catch {
      reject(e);
    }
  });
};

module.exports = {
  layTatCaPhuongThucVanChuyen,
  datHang,
  tatCaDonHangTheoTrangThai,
  xacNhanDonHang,
  huyDonHang,
  xacNhanDonHangGiaoDonViVanChuyen,
  xacNhanDonHangDaGiaoChoKhachHang,
  layDonHangNguoiDung,
  xacNhanDaNhanDuocHang,
  huyDonHangNguoiDung,
  yeuCauHoanHangHoanTien,
  xacNhanDaXuLyYeuCauHoanHangHoanTien,
  thongKeBanHoa,
  tatCaDonHang,
  datHangTrangChu,
  datHangChuaDangNhap,
  layDonHangChuaDN,
};
