const checkChuCuaHang = (req, res, next) => {
  let { quyenId } = req.nguoidung;

  if (quyenId !== 9) {
    return res.status(200).json({
      maCode: 6,
      thongDiep: "Bạn không phải admin vui lòng quay ra",
    });
  }
  next();
};

const checkNhanVien = (req, res, next) => {
  let { quyenId } = req.nguoidung;
  if (quyenId !== 9 && quyenId !== 11)
    return res.status(200).json({
      maCode: 7,
      thongDiep: "Chỉ có admin với nhân viên được dùng trang này",
    });

  next();
};

module.exports = {
  checkChuCuaHang,
  checkNhanVien,
};
