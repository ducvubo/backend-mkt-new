import danhMucHoaService from '../services/danhMucHoaService'

let themDanhMuc = async (req, res) => {
    try {
      let data = await danhMucHoaService.themDanhMuc(req.body);
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        maCode: -1,
        thongDiep: "Lỗi của server...",
      });
    }
  };

  let tatCaDanhMuc = async (req, res) => {
    try {
      let data = await danhMucHoaService.tatCaDanhMuc();
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

  let xoaDanhMuc = async (req, res) => {
    try {
      if (!req.query.id) {
        return res.status(200).json({
          maCode: -2,
          thongDiep: "Thiếu tham số truyền lên server",
        });
      }
      let data = await danhMucHoaService.xoaDanhMuc(req.query.id);
      return res.status(200).json(data);
    } catch {
      return res.status(200).json({
        maCode: -1,
        thongDiep: "Lỗi cuả server",
      });
    }
  };
  
  let suaDanhMuc = async (req, res) => {
    let datatruyenlen = req.body;
    try {
      if (!datatruyenlen.id) {
        return res.status(200).json({
          maCode: -2,
          thongDiep: "Thiếu tham số truyền lên server",
        });
      }
      let data = await danhMucHoaService.suaDanhMuc(datatruyenlen);
      return res.status(200).json(data);
    } catch (e) {
      console.log("Lấy nguoi dung thất bại: ", e);
      return res.status(200).json({
        maCode: -1,
        thongDiep: "Lỗi cuả server",
      });
    }
  };

  let danhMucHoaNoiBat = async (req, res) => {
    try {
      let data = await danhMucHoaService.danhMucHoaNoiBat();
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


module.exports = {
    themDanhMuc:themDanhMuc,
    tatCaDanhMuc:tatCaDanhMuc,
    xoaDanhMuc:xoaDanhMuc,
    suaDanhMuc:suaDanhMuc,
    danhMucHoaNoiBat: danhMucHoaNoiBat
}