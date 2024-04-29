import nhapHoaChiTietService from "../services/nhapHoaChiTietService";

let themHoaMoi = async (req, res) => {
  try {
    let data = await nhapHoaChiTietService.themHoaMoi(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let capNhatHoaCu = async (req, res) => {
  try {
    let data = await nhapHoaChiTietService.capNhatHoaCu(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let tatCaNhapHoaChiTiet = async (req, res) => {
  try {
    let data = await nhapHoaChiTietService.tatCaNhapHoaChiTiet();
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

let suaNhapHoaChiTiet = async (req, res) => {
  let datatruyenlen = req.body;
  try {
    if (!datatruyenlen.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await nhapHoaChiTietService.suaNhapHoaChiTiet(datatruyenlen);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let xoaNhapHoaChiTiet = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await nhapHoaChiTietService.xoaNhapHoaChiTiet(req.query.id);
    return res.status(200).json(data);
  } catch {
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

module.exports = {
  themHoaMoi,
  capNhatHoaCu,
  tatCaNhapHoaChiTiet,
  suaNhapHoaChiTiet,
  xoaNhapHoaChiTiet,
};
