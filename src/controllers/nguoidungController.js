import nguoiDungService from "../services/nguoiDungService";
import { verifyToken } from "../middleware/JWTAction";
let getAllCode = async (req, res) => {
  try {
    let data = await nguoiDungService.getAllCodeServiec(req.query.kieu); //param
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy allcode thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let themNguoiDung = async (req, res) => {
  try {
    let infor = await nguoiDungService.themNguoiDung(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let tatCaNguoiDung = async (req, res) => {
  try {
    let data = await nguoiDungService.tatCaNguoiDung();
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

let Get1NguoiDung = async (req, res) => {
  try {
    let data = await nguoiDungService.Get1NguoiDung(req.query.id); //param
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let xoaNguoiDung = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await nguoiDungService.xoaNguoiDung(req.query.id);
    return res.status(200).json(data);
  } catch {
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let suaNguoiDung = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await nguoiDungService.suaNguoiDung(datatruyenle);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let dangNhap = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(200).json({
      maCode: 1,
      thongDiep: "Vui lòng nhập đầy đủ email và mật khẩu!",
    });
  }

  let datanguoidung = await nguoiDungService.dangNhap(
    email,
    password,
    req.body.thongtingiohangchuadangnhap,
    req.body.thongtindonhangchuadangnhap
  );

  res.cookie("access_token", datanguoidung.access_token, {
    httpOnly: true,
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });
  res.cookie("refresh_token", datanguoidung.refresh_token, {
    httpOnly: true,
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    maCode: datanguoidung.maCode,
    thongDiep: datanguoidung.thongDiep,
    nguoidung: datanguoidung.nguoidung ? datanguoidung.nguoidung : {},
    // access_token: datanguoidung.access_token,
    // refresh_token: datanguoidung.refresh_token,
  });
};

let dangXuat = async (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    maxAge: 1,
  });
  res.cookie("refresh_token", "", {
    httpOnly: true,
    maxAge: 1,
  });

  return res.status(200).json({
    maCode: 0,
    thongDiep: "Bạn đã đăng xuất",
  });
};

let reFresh_token = async (req, res) => {
  try {
    let refresh_token = req.cookies.refresh_token;
    if (!refresh_token)
      return res.status(200).json({
        maCode: 10,
        thongDiep: "Ban chua dang nhap vui long dang nhap",
      });
    let token = await nguoiDungService.reFresh_token(refresh_token);

    res.cookie("access_token", token.access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refresh_token", token.refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      maCode: token.maCode,
      thongDiep: token.thongDiep,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let dangKy = async (req, res) => {
  try {
    let infor = await nguoiDungService.dangKy(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let xacNhanDangKy = async (req, res) => {
  try {
    let infor = await nguoiDungService.xacNhanDangKy(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let quenMK = async (req, res) => {
  try {
    let infor = await nguoiDungService.quenMK(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let doiMK = async (req, res) => {
  try {
    let infor = await nguoiDungService.doiMK(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let layTatCaNhanVien = async (req, res) => {
  try {
    let data = await nguoiDungService.layTatCaNhanVien();
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

let thongTinNguoiDung = async (req, res) => {
  try {
    let data = await nguoiDungService.thongTinNguoiDung(
      req.query.id,
      req.query.email
    ); //param
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let capNhapThongTinNguoiDung = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await nguoiDungService.capNhapThongTinNguoiDung(datatruyenle);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

module.exports = {
  getAllCode,
  themNguoiDung,
  tatCaNguoiDung,
  Get1NguoiDung,
  xoaNguoiDung,
  suaNguoiDung,
  dangNhap,
  dangKy,
  xacNhanDangKy,
  quenMK,
  doiMK,
  dangXuat,
  reFresh_token,
  layTatCaNhanVien,
  thongTinNguoiDung,
  capNhapThongTinNguoiDung,
};
