import db from "../models/index";
const { Op } = require("sequelize");
let tatCaCuocTroChuyen = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Chat.findAll({
        attributes: {
          exclude: ["thoigian", "createdAt", "updatedAt"],
        },
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let tatCaKhachHang = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.User.findAll({
        where: { quyenId: 12 },
        attributes: {
          exclude: [
            "email",
            "id",
            "password",
            "sdt",
            "diachinha",
            "diachicuahang",
            "gioitinhId",
            "quyenId",
            "trangthaiId",
            "linkxacnhan",
            "refresh_token",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let doanChatKhachHang = (idchat) => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Chat.findAll({
        where: {
          [Op.or]: [{ nguoinhan: idchat }, { nguoigui: idchat }],
        },
        attributes: {
          exclude: ["thoigian", "createdAt", "updatedAt"],
        },
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let doiTrangThaiXem = (idchat) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Chat.update(
        {
          trangthaixem: "daxem",
        },
        {
          where: { nguoigui: idchat },
        }
      );
      resolve({
        maCode: 0,
        thongDiep: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  tatCaCuocTroChuyen,
  tatCaKhachHang,
  doanChatKhachHang,
  doiTrangThaiXem,
};
