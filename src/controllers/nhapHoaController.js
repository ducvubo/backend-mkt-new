import nhapHoaService from '../services/nhapHoaService';

let themHoaDon = async (req, res) => {
    try {
      let data = await nhapHoaService.themHoaDon(req.body);
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        maCode: -1,
        thongDiep: "Lỗi của server...",
      });
    }
  };

  let tatCaHoaDon = async (req, res) => {
    try {
      let data = await nhapHoaService.tatCaHoaDon();
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

  
  let suaHoaDon = async (req, res) => {
    let datatruyenlen = req.body;
    try {
      if (!datatruyenlen.id) {
        return res.status(200).json({
          maCode: -2,
          thongDiep: "Thiếu tham số truyền lên server",
        });
      }
      let data = await nhapHoaService.suaHoaDon(datatruyenlen);
      return res.status(200).json(data);
    } catch (e) {
      console.log("Lấy nguoi dung thất bại: ", e);
      return res.status(200).json({
        maCode: -1,
        thongDiep: "Lỗi cuả server",
      });
    }
  };

  let xoaHoaDon = async (req, res) => {
    try {
      if (!req.query.id) {
        return res.status(200).json({
          maCode: -2,
          thongDiep: "Thiếu tham số truyền lên server",
        });
      }
      let data = await nhapHoaService.xoaHoaDon(req.query.id);
      return res.status(200).json(data);
    } catch {
      return res.status(200).json({
        maCode: -1,
        thongDiep: "Lỗi cuả server",
      });
    }
  };

  let thongKeNhapHoa = async (req, res) => {
    try {
      let data = await nhapHoaService.thongKeNhapHoa(req.body);
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
    themHoaDon,tatCaHoaDon,suaHoaDon,xoaHoaDon,thongKeNhapHoa
}