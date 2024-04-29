import danhMucHoaChiTietService from "../services/danhMucHoaChiTietService";

let themDanhMucHoaChiTiet = async (req, res) => {
  try {
    let infor = await danhMucHoaChiTietService.themDanhMucHoaChiTiet(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let tatCaDanhMucHoaChiTiet = async (req, res) => {
  try {
    let data = await danhMucHoaChiTietService.tatCaDanhMucHoaChiTiet();
    return res.status(200).json({
      maCode: 0,
      thongDiep: "OK",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let xoaDanhMucHoaChiTiet = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await danhMucHoaChiTietService.xoaDanhMucHoaChiTiet(
      req.query.id
    );
    return res.status(200).json(data);
  } catch {
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let suaDanhMucHoaChiTiet = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await danhMucHoaChiTietService.suaDanhMucHoaChiTiet(
      datatruyenle
    );
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let danhMucHoaChiTietTheoDanhMuc = async (req, res) => {
  try {
    let data = await danhMucHoaChiTietService.danhMucHoaChiTietTheoDanhMuc(req.query.iddanhmuchoa); //param
    return res.status(200).json({
      maCode:0,
      thongDiep:"ok ok",
      data
    });
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};



module.exports = {
  themDanhMucHoaChiTiet,
  tatCaDanhMucHoaChiTiet,
  xoaDanhMucHoaChiTiet,
  suaDanhMucHoaChiTiet,
  danhMucHoaChiTietTheoDanhMuc,
  
};
