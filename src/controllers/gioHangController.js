import gioHangService from "../services/gioHangService";

let gioHangNguoiDung = async (req, res) => {
  try {
    let data = await gioHangService.gioHangNguoiDung(req.query.id); //param
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy gio hang thất bại 1: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let suaGioHangNguoiDung = async (req, res) => {
  try {
    let data = await gioHangService.suaGioHangNguoiDung(req.body);
    return res.status(200).json(data);
  } catch (e) {
    // console.log("Lấy gio hang thất bại 2: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let themGioHang = async (req, res) => {
  try {
    let data = await gioHangService.themGioHang(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy gio hang thất bại 3: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let gioHangChuaDangNhap = async (req, res) => {
  try {
    let data = await gioHangService.gioHangChuaDangNhap(req.body);
    return res.status(200).json({
      data,
      thongDiep: "Ok ok ok",
      maCode: 0
    });
  } catch (e) {
    console.log("Lấy gio hang thất bại 4: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

module.exports = {
  gioHangNguoiDung,
  suaGioHangNguoiDung,
  themGioHang,
  gioHangChuaDangNhap,
};
