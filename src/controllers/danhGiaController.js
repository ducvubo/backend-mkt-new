import danhGiaService from "../services/danhGiaService";

let themDanhGia = async (req, res) => {
  try {
    let data = await danhGiaService.themDanhGia(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let themTraLoiBinhLuan = async (req, res) => {
  try {
    let data = await danhGiaService.themTraLoiBinhLuan(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let binhLuanTheoHoa = async (req, res) => {
  try {
    let data = await danhGiaService.binhLuanTheoHoa(req.query.idhoa);

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

let layTatCaBinhLuan = async (req, res) => {
  try {
    let data = await danhGiaService.layTatCaBinhLuan();

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

let duyetHuyDuyetDanhGia = async (req, res) => {
  try {
    let data = await danhGiaService.duyetHuyDuyetDanhGia(
      req.query.id,
      req.query.bang,
      req.query.trangthai
    );
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let xoaDanhGiaTraLoiDanhGiaKH = async (req, res) => {
  try {
    let data = await danhGiaService.xoaDanhGiaTraLoiDanhGiaKH(req.query.id,req.query.bang);

    return res.status(200).json({
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

module.exports = {
  themDanhGia,
  binhLuanTheoHoa,
  themTraLoiBinhLuan,
  layTatCaBinhLuan,
  duyetHuyDuyetDanhGia,
  xoaDanhGiaTraLoiDanhGiaKH,
};
