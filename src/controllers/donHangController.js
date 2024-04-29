import donHangService from "../services/donHangService";

let layTatCaPhuongThucVanChuyen = async (req, res) => {
  try {
    let data = await donHangService.layTatCaPhuongThucVanChuyen();
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

let datHang = async (req, res) => {
  try {
    let data = await donHangService.datHang(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let tatCaDonHangTheoTrangThai = async (req, res) => {
  try {
    if (!req.query.trangthai) {
      return res.status(200).json({
        maCode: 2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.tatCaDonHangTheoTrangThai(
      req.query.trangthai
    );
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

let xacNhanDonHang = async (req, res) => {
  let datatruyenle = req.body.dataxacnhandonhang;
  try {
    if (!datatruyenle.madonhang) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.xacNhanDonHang(datatruyenle);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let huyDonHang = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.madonhang) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.huyDonHang(datatruyenle);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let xacNhanDonHangGiaoDonViVanChuyen = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.madonhang) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.xacNhanDonHangGiaoDonViVanChuyen(
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

let xacNhanDonHangDaGiaoChoKhachHang = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.madonhang) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.xacNhanDonHangDaGiaoChoKhachHang(
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

let layDonHangNguoiDung = async (req, res) => {
  try {
    if (!req.query.idnguoidung) {
      return res.status(200).json({
        maCode: 2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.layDonHangNguoiDung(req.query.idnguoidung);
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

let xacNhanDaNhanDuocHang = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.madonhang) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.xacNhanDaNhanDuocHang(datatruyenle);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let huyDonHangNguoiDung = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.madonhang) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.huyDonHangNguoiDung(datatruyenle);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let yeuCauHoanHangHoanTien = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.madonhang) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.yeuCauHoanHangHoanTien(datatruyenle);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let xacNhanDaXuLyYeuCauHoanHangHoanTien = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.madonhang) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.xacNhanDaXuLyYeuCauHoanHangHoanTien(
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

let thongKeBanHoa = async (req, res) => {
  try {
    let data = await donHangService.thongKeBanHoa(req.body);
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

let tatCaDonHang = async (req, res) => {
  try {
    let data = await donHangService.tatCaDonHang();
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

let datHangTrangChu = async (req, res) => {
  try {
    let data = await donHangService.datHangTrangChu(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let datHangChuaDangNhap = async (req, res) => {
  try {
    let data = await donHangService.datHangChuaDangNhap(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let layDonHangChuaDN = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(200).json({
        maCode: 2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.layDonHangChuaDN(req.body);
    return res.status(200).json({
      data,
      maCode : 0,
      thongDiep:"Ok ok ok"
    
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
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
