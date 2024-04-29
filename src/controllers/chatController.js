import chatService from "../services/chatService";

let tatCaCuocTroChuyen = async (req, res) => {
  try {
    let data = await chatService.tatCaCuocTroChuyen();
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

let tatCaKhachHang = async (req, res) => {
  try {
    let data = await chatService.tatCaKhachHang();
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

let doanChatKhachHang = async (req, res) => {
  try {
    let data = await chatService.doanChatKhachHang(req.query.idchat);
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


let doiTrangThaiXem = async (req, res) => {
  try {
    let data = await chatService.doiTrangThaiXem(req.query.idchat);
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
  tatCaCuocTroChuyen,tatCaKhachHang,doanChatKhachHang,doiTrangThaiXem
  
};
