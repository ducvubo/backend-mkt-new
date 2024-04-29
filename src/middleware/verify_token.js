import jwt, { TokenExpiredError } from "jsonwebtoken";
require("dotenv").config();

const verifiToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token)
    return res.status(200).json({
      maCode: 10,
      thongDiep: "Ban chua dang nhap vui long dang nhap",
    });
  jwt.verify(token, process.env.JWT_KEY, (err, nguoidung) => {
    if(err) {
      const kttoken = err instanceof TokenExpiredError
    if (!kttoken) {
      return res.status(200).json({
        maCode: 9,
        thongDiep: "Token không hợp lệ",
      });
    }
    if (kttoken) {
      return res.status(200).json({
        maCode: 8,
        thongDiep: "Token đã hết hạn",
      });
    } 
    }
    else {
      req.nguoidung = nguoidung;
      next();
    }
  });
};

module.exports = {
  verifiToken,
};
