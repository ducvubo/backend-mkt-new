import db from "../models/index";

let themHoaMoi = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.hoa.create({
        tenhoaVi: data.tenhoa,
        soluongnhap: data.soluongnhapthucte,
        soluongcon: data.soluongnhapthucte,
      });

      let hoa = await db.hoa.findOne({
        where: { tenhoaVi: data.tenhoa },
        attributes: ["id"],
      });

      await db.Nhaphoachitiet.create({
        idnhaphoa: data.idnhaphoa,
        idhoa: hoa.id,
        donvitinh: data.donvitinh,
        soluongnhaptrenphieu: data.soluongnhaptrenphieu,
        soluongnhapthucte: data.soluongnhapthucte,
        gianhap: data.gianhap,
        giatong: data.giatong,
      });

      let hoadon = await db.Nhaphoa.findOne({
        where: { id: data.idnhaphoa },
        raw: false,
      });

      if (hoadon) {
        hoadon.tonghoadon = +hoadon.tonghoadon + +data.giatong;
        await hoadon.save();
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

let capNhatHoaCu = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hoa = await db.hoa.findOne({
        where: { id: data.idhoa },
        raw: false,
      });

      if (hoa) {
        hoa.soluongnhap = +hoa.soluongnhap + +data.soluongnhapthucte;
        hoa.soluongcon = +hoa.soluongcon + +data.soluongnhapthucte;
        await hoa.save();
      }

      await db.Nhaphoachitiet.create({
        idnhaphoa: data.idnhaphoa,
        idhoa: data.idhoa,
        donvitinh: data.donvitinh,
        soluongnhaptrenphieu: data.soluongnhaptrenphieu,
        soluongnhapthucte: data.soluongnhapthucte,
        gianhap: data.gianhap,
        giatong: data.giatong,
      });

      let hoadon = await db.Nhaphoa.findOne({
        where: { id: data.idnhaphoa },
        raw: false,
      });

      if (hoadon) {
        hoadon.tonghoadon = +hoadon.tonghoadon + +data.giatong;
        await hoadon.save();
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

let tatCaNhapHoaChiTiet = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Nhaphoachitiet.findAll({
        include: [
          {
            model: db.Nhaphoa,
            as: "nhaphoa",
            attributes: ["id", "maphieunhap"], // Chọn các trường cần lấy từ bảng Nhaphoa
          },
          {
            model: db.hoa,
            as: "hoa123",
            attributes: ["id", "tenhoaVi", "tenhoaEn"], // Chọn các trường cần lấy từ bảng Nhaphoa
          },
        ],
        attributes: [
          "id",
          "idnhaphoa",
          "idhoa",
          "donvitinh",
          "soluongnhaptrenphieu",
          "soluongnhapthucte",
          "gianhap",
          "giatong",
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

let suaNhapHoaChiTiet = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hoadonchitiet = await db.Nhaphoachitiet.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (hoadonchitiet) {
        let hoa = await db.hoa.findOne({
          where: { id: data.idhoa },
          raw: false,
        });

        if (hoa) {
          hoa.soluongnhap =
            +hoa.soluongnhap -
            +hoadonchitiet.soluongnhapthucte +
            +data.soluongnhapthucte;
          hoa.soluongcon =
            +hoa.soluongcon -
            +hoadonchitiet.soluongnhapthucte +
            +data.soluongnhapthucte;
          await hoa.save();
        }

        let hoadon = await db.Nhaphoa.findOne({
          where: { id: data.idnhaphoa },
          raw: false,
        });

        if (hoadon) {
          hoadon.tonghoadon =
            +hoadon.tonghoadon - +hoadonchitiet.giatong + +data.giatong;
          await hoadon.save();
        }

        hoadonchitiet.idnhaphoa = data.idnhaphoa;
        hoadonchitiet.idhoa = data.idhoa;
        hoadonchitiet.donvitinh = data.donvitinh;
        hoadonchitiet.soluongnhaptrenphieu = data.soluongnhaptrenphieu;
        hoadonchitiet.soluongnhapthucte = data.soluongnhapthucte;
        hoadonchitiet.gianhap = data.gianhap;
        hoadonchitiet.giatong = data.giatong;
        await hoadonchitiet.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa hóa đơn chi tiết thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy hóa đơn chi tiết",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xoaNhapHoaChiTiet = (id) => {
  return new Promise(async (resolve, reject) => {
    let hoadonchitiet = await db.Nhaphoachitiet.findOne({
      where: { id: id },
    });
    if (!hoadonchitiet) {
      resolve({
        maCode: 1,
        thongDiep: "Hóa đơn chi tiết không tồn tại",
      });
    } else {
      let hoa = await db.hoa.findOne({
        where: { id: hoadonchitiet.idhoa },
        raw: false,
      });

      if (hoa) {
        if (
          hoa.iddanhmuchoachitiet ||
          hoa.tenhoaEn ||
          hoa.tieudehoaVi ||
          hoa.tieudehoaEn ||
          hoa.anhnoibat ||
          hoa.soluongban ||
          hoa.giathucVND ||
          hoa.giathucUSD ||
          hoa.phantramgiam ||
          hoa.giasaukhigiamVND ||
          hoa.giasaukhigiamUSD ||
          hoa.motaspVi ||
          hoa.motaspEn ||
          hoa.motasphtmlVi ||
          hoa.motasphtmlEn ||
          hoa.donoibat ||
          hoa.ghichuVi ||
          hoa.ghichuEn
        ) {
          hoa.soluongnhap = +hoa.soluongnhap - +hoadonchitiet.soluongnhapthucte;
          hoa.soluongcon = +hoa.soluongcon - +hoadonchitiet.soluongnhapthucte;
          await hoa.save();
        } else {
          if (hoa.soluongnhap === hoadonchitiet.soluongnhapthucte) {
            await db.hoa.destroy({
              where: { id: hoadonchitiet.idhoa },
            });
          } else {
            hoa.soluongnhap =
              +hoa.soluongnhap - +hoadonchitiet.soluongnhapthucte;
            hoa.soluongcon = +hoa.soluongcon - +hoadonchitiet.soluongnhapthucte;
            await hoa.save();
          }
        }
      }

      let hoadon = await db.Nhaphoa.findOne({
        where: { id: hoadonchitiet.idnhaphoa },
        raw: false,
      }); 

      if (hoadon) {
        hoadon.tonghoadon = +hoadon.tonghoadon - +hoadonchitiet.giatong;
        await hoadon.save();
      }

      await db.Nhaphoachitiet.destroy({
        where: { id: id },
      });
      resolve({
        maCode: 0,
        thongDiep: "Xóa hóa đơn chi tiết thành công",
      });
    }
  });
};

module.exports = {
  themHoaMoi,
  capNhatHoaCu,
  tatCaNhapHoaChiTiet,
  xoaNhapHoaChiTiet,
  suaNhapHoaChiTiet,
};
