import db from "../models/index";

let themDanhMucHoaChiTiet = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Danhmuchoachitiet.create({
        iddanhmuchoa: data.iddanhmuchoa,
        tendanhmucchitietVi: data.tendanhmucchitietVi,
        tendanhmucchitietEn: data.tendanhmucchitietEn,
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

let tatCaDanhMucHoaChiTiet = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Danhmuchoachitiet.findAll({
        include: [
          {
            model: db.Danhmuchoa,
            as: "danhmuc",
            attributes: ["tendanhmucEn", "tendanhmucVi"],
          },
        ],
        raw: false,
        nest: true,
      });
      all = all.filter(item => item.id !== 63);
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let xoaDanhMucHoaChiTiet = (id) => {
  return new Promise(async (resolve, reject) => {
    let danhmuchoachitiet = await db.Danhmuchoachitiet.findOne({
      where: { id: id },
    });
    if (!danhmuchoachitiet) {
      resolve({
        maCode: 1,
        thongDiep: "Danh mục hoa chi tiết không tồn tại",
      });
    } else {
      await db.Danhmuchoachitiet.destroy({
        where: { id: id },
      });
      await db.hoa.update(
        { iddanhmuchoachitiet: 63 },
        {
          where: { iddanhmuchoachitiet: id },
        }
      );
      resolve({
        maCode: 0,
        thongDiep: "Xóa danh mục hoa chi tiết thành công",
      });
    }
  });
};

let suaDanhMucHoaChiTiet = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let danhmuchoachitiet = await db.Danhmuchoachitiet.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (danhmuchoachitiet) {
        danhmuchoachitiet.iddanhmuchoa = data.iddanhmuchoa;
        danhmuchoachitiet.tendanhmucchitietVi = data.tendanhmucchitietVi;
        danhmuchoachitiet.tendanhmucchitietEn = data.tendanhmucchitietEn;
        await danhmuchoachitiet.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa danh mục hoa chi tiết thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy hoa chi tiết danh mục",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let danhMucHoaChiTietTheoDanhMuc = (iddanhmuchoa) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!iddanhmuchoa) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền vào",
        });
      } else {
        let danhmuchoachitiet = "";
        danhmuchoachitiet = await db.Danhmuchoachitiet.findAll({
          where: { iddanhmuchoa: iddanhmuchoa },
        });

        resolve(danhmuchoachitiet);
      }
    } catch {
      reject(e);
    }
  });
};

module.exports = {
  themDanhMucHoaChiTiet,
  tatCaDanhMucHoaChiTiet,
  xoaDanhMucHoaChiTiet,
  suaDanhMucHoaChiTiet,
  danhMucHoaChiTietTheoDanhMuc,
};
