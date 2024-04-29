import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
import { createJWT } from "../middleware/JWTAction";
import jwt from "jsonwebtoken";
const { sequelize, Op } = require("sequelize");

require("dotenv").config();

const salt = bcrypt.genSaltSync(10);

let buillinkxacnhan = (email, linkxacnhan) => {
  let link = `${process.env.URL_REACT}/xacnhantaikhoan?linkxacnhan=${linkxacnhan}&email=${email}`;
  return link;
};

let buillinkdoimk = (email, linkxacnhan) => {
  let link = `${process.env.URL_REACT}/doimk?linkxacnhan=${linkxacnhan}&email=${email}`;
  return link;
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let ktEmail = (emailNguoiDung) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nguoidung = await db.User.findOne({
        //tim nguoidung
        where: { email: emailNguoiDung },
      });
      if (nguoidung) {
        //nguoidung khac undefine thi chay vao day
        resolve(true);
      } else {
        //nguoidung undefine chay vao day
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let ktTrangThaiTaiKhoan = (emailNguoiDung) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nguoidung = await db.User.findOne({
        //tim nguoidung
        where: {
          email: emailNguoiDung,
          trangthaiId: 17,
        },
      });
      if (nguoidung) {
        //nguoidung khac undefine thi chay vao day
        resolve(true);
      } else {
        //nguoidung undefine chay vao day
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let capNhatDonHangChuaDNKhiDN = (madonhang, idnguoidung) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!madonhang) {
        resolve({
          maCode: 1,
          thongDiep: "Thieu tham so truyen vao",
        });
      } else {
        let donhang = await db.Donhang.findOne({
          where: { madonhang: madonhang },
          raw: false,
        });
        if (donhang) {
          donhang.idnguoidung = idnguoidung;
          await donhang.save();

          resolve({
            maCode: 0,
            thongDiep: "Cập nhật hoa thành công",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let capNhatGioHangChuaDNKhiDN = (idgiohang, idhoa, soluong) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idgiohang || !idhoa || !soluong) {
        resolve({
          maCode: 1,
          thongDiep: "Thieu tham so truyen vao",
        });
      } else {
        let giohanghoa = await db.Giohanghoa.findOne({
          where: {
            [Op.and]: [{ idgiohang: idgiohang }, { idhoa: idhoa }],
          },
          raw: false,
        });
        if (giohanghoa) {
          giohanghoa.soluong = giohanghoa.soluong + soluong;
          await giohanghoa.save();
          resolve();
        } else {
          await db.Giohanghoa.create({
            idgiohang: idgiohang,
            idhoa: idhoa,
            soluong: soluong,
          });
          resolve();
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let dangNhap = (
  email,
  password,
  thongtingiohangchuadangnhap,
  thongtindonhangchuadangnhap
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let datanguoidung = {};
      let ktemail = await ktEmail(email); //lay gia tri true and false
      let ktTrangThai = await ktTrangThaiTaiKhoan(email);
      if (ktemail === false) {
        //neu tra ve false
        datanguoidung.maCode = 4;
        datanguoidung.thongDiep =
          "Email của bạn không tồn tại trong hệ thống, vui lòng nhập lại email!!!";
      } else if (ktTrangThai === false) {
        datanguoidung.maCode = 5;
        datanguoidung.thongDiep =
          "Tài khoản của bạn chưa được xác nhận vui lòng kiểm tra hộp thư của email để xác nhận!!!";
      }
      if (ktemail === true && ktTrangThai === true) {
        //neu tra ve true
        let nguoidung = await db.User.findOne({
          attributes: [
            "email",
            "quyenId",
            "password",
            "ho",
            "ten",
            "id",
            "idchat",
            "anhdaidien",
          ],
          where: { email: email },
          raw: true, //chi tra ra dung object nhu trong database
        });
        if (nguoidung) {
          let ktmk = await bcrypt.compareSync(password, nguoidung.password);
          if (ktmk) {
            // true
            let payload_access_token = {
              email: nguoidung.email,
              quyenId: nguoidung.quyenId,
              ho: nguoidung.ho,
              ten: nguoidung.ten,
            };

            let payload_refresh_token = {
              id: nguoidung.id,
              ten: nguoidung.ten,
              ho: nguoidung.ho,
              idchat: nguoidung.idchat,
            };

            let access_token = createJWT(
              payload_access_token,
              process.env.JWT_KEY,
              process.env.JWT_TIME_ACCESS_TOKEN
              // "5s"
            );
            let refresh_token = createJWT(
              payload_refresh_token,
              process.env.JWT_KEY_REFRESH_TOKEN,
              process.env.JWT_TIME_REFRESH_TOKEN
              // "5d"
            );

            if (refresh_token) {
              await db.User.update(
                {
                  refresh_token: refresh_token,
                },
                {
                  where: { id: nguoidung.id },
                }
              );
            }

            datanguoidung.access_token = access_token;
            datanguoidung.refresh_token = refresh_token;
            datanguoidung.maCode = 0;
            datanguoidung.thongDiep = "Ok";
            delete nguoidung.password; //xoa cot password truoc khi gan
            datanguoidung.nguoidung = nguoidung;

            // if(nguoidung.quyenId === 12){

            let giohang = await db.Giohang.findOne({
              where: { idnguoidung: nguoidung.id },
            });
            thongtingiohangchuadangnhap &&
              thongtingiohangchuadangnhap.length >
                thongtingiohangchuadangnhap.map((item) => {
                  item.idgiohang = giohang.id;
                });

            if (
              thongtingiohangchuadangnhap &&
              thongtingiohangchuadangnhap.length > 0
            ) {
              await Promise.all(
                thongtingiohangchuadangnhap.map(async (item) => {
                  await capNhatGioHangChuaDNKhiDN(
                    item.idgiohang,
                    item.idhoa,
                    item.soluong
                  );
                })
              );
            }
            // }

            // if(nguoidung.quyenId === 12){
            if (
              thongtindonhangchuadangnhap &&
              thongtindonhangchuadangnhap.length > 0
            ) {
              await Promise.all(
                thongtindonhangchuadangnhap.map(async (item) => {
                  await capNhatDonHangChuaDNKhiDN(item, nguoidung.id);
                })
              );
            }
            // }
          } else {
            datanguoidung.maCode = 3;
            datanguoidung.thongDiep = "Vui lòng nhập đúng password";
          }
        } else {
          datanguoidung.maCode = 2;
          datanguoidung.thongDiep = "Email này chưa được đăng ký!!!";
        }
      }

      resolve(datanguoidung);
    } catch (e) {
      reject(e);
    }
  });
};

let reFresh_token = (refresh_token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nguoidung = await db.User.findOne({
        where: { refresh_token: refresh_token },
      });

      if (nguoidung) {
        jwt.verify(refresh_token, process.env.JWT_KEY_REFRESH_TOKEN, (err) => {
          if (err) {
            resolve({
              maCode: 5,
              thongDiep: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại",
              refresh_token: refresh_token,
            });
          } else {
            let payload_access_token = {
              email: nguoidung.email,
              quyenId: nguoidung.quyenId,
              ho: nguoidung.ho,
              ten: nguoidung.ten,
            };

            let access_token = createJWT(
              payload_access_token,
              process.env.JWT_KEY,
              process.env.JWT_TIME_ACCESS_TOKEN
              // "5s"
            );
            resolve({
              maCode: 0,
              thongDiep: "Ok",
              access_token: access_token,
              refresh_token: refresh_token,
            });
          }
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeServiec = (kieu) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!kieu) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền vào",
        });
      } else {
        let data = {};
        data = await db.Allcode.findAll({
          where: { kieu: kieu },
        });
        resolve({
          data: data,
          maCode: 0,
          thongDiep: "ok ok",
        });
      }
    } catch {
      reject(e);
    }
  });
};

let themNguoiDung = (data) => {
  console.log(data.quyen);
  return new Promise(async (resolve, reject) => {
    try {
      let idchat = uuidv4();

      let check = await ktEmail(data.email);
      if (check === true) {
        resolve({
          maCode: 1,
          thongDiep: "Email đã được sử dụng vui lòng dùng email khác!!!",
          thongDiepen: "Email has been used, please use another email",
        });
      } else {
        let mahoamk = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: mahoamk,
          ho: data.ho,
          ten: data.ten,
          sdt: data.sodienthoai,
          diachinha: data.diachinha,
          quyenId: +data.quyen,
          gioitinhId: +data.gioitinh,
          trangthaiId: 17,
          idchat: +data.quyen === 12 ? idchat : "nhanvien",
        });

        let timnguoidungmoi = await db.User.findOne({
          where: { email: data.email },
        });

        await db.Giohang.create({
          idnguoidung: timnguoidungmoi.id,
        });

        if (+data.quyen === 12) {
          console.log("cde");
          await db.Chat.create({
            tennguoigui: "Bo",
            tennguoinhan: data.ten,
            nguoigui: "nhanvien",
            nguoinhan: idchat,
            noidung:
              data.ngonngu === "vi"
                ? `Chào ${data.ten}!, Chúng tôi có thể giúp gì cho bạn!!!`
                : `Hello ${data.ten}!, How can we help you!!!`,
            anh: null,
            thoigian: Date.now(),
          });
          console.log("abc");
        } 

        resolve({
          maCode: 0,
          thongDiep: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let tatCaNguoiDung = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.User.findAll({
        attributes: {
          exclude: ["password"], //khong lay ra password
        },
        include: [
          {
            model: db.Allcode,
            as: "quyen",
          },
          {
            model: db.Allcode,
            as: "gioitinh",
          },
        ],
        raw: false,
        nest: true,
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let Get1NguoiDung = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền vào",
        });
      } else {
        let nguoidung = "";
        nguoidung = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"], //khong lay ra password
          },
          include: [
            {
              model: db.Allcode,
              as: "gioitinh",
              attributes: ["tiengViet", "tiengAnh"],
            },
            {
              model: db.Allcode,
              as: "quyen",
              attributes: ["tiengViet", "tiengAnh"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve(nguoidung);
      }
    } catch {
      reject(e);
    }
  });
};

let xoaNguoiDung = (id) => {
  return new Promise(async (resolve, reject) => {
    let nguoidung = await db.User.findOne({
      where: { id: id },
    });
    if (!nguoidung) {
      resolve({
        maCode: 1,
        thongDiep: "Người dùng không tồn tại",
      });
    }

    if (nguoidung.idchat !== "nhanvien") {
      await db.Chat.destroy({
        where: {
          [Op.or]: [
            { nguoigui: nguoidung.idchat },
            { nguoinhan: nguoidung.idchat },
          ],
        },
      });
      await db.Traloibinhluan.destroy({
        where: {
          idnguoidung: id,
        },
      });
      await db.Binhluan.destroy({
        where: {
          idnguoidung: id,
        },
      });
    }

    await db.Donhang.update(
      { idnguoidung: 1 },
      {
        where: { idnguoidung: id },
      }
    );

    let idgiohang = await db.Giohang.findOne({
      where: { idnguoidung: id },
    });

    await db.Giohanghoa.destroy({
      where: { idgiohang: idgiohang.id },
    });

    await db.Giohang.destroy({
      where: { idnguoidung: id },
    });

    await db.Nhaphoa.update(
      { idnhanvien: 1 },
      {
        where: { idnhanvien: id },
      }
    );
    await db.Binhluan.update(
      { idnhanvien: 1 },
      {
        where: { idnguoidung: id },
      }
    );
    await db.Traloibinhluan.update(
      { idnhanvien: 1 },
      {
        where: { idnguoidung: id },
      }
    );

    await db.User.destroy({
      where: { id: id },
    });

    resolve({
      maCode: 0,
      thongDiep: "Xóa người dùng thành công",
    });
  });
};

let suaNguoiDung = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let idchatmoi = uuidv4();

      let nguoidung = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (nguoidung) {
        if (
          nguoidung.quyenId === 12 &&
          (+data.quyenId === 11 || +data.quyenId === 9)
        ) {
          nguoidung.idchat = "nhanvien";
        }
        if (
          +data.quyenId === 12 &&
          (nguoidung.quyenId === 9 || nguoidung.quyenId === 11)
        ) {
          nguoidung.idchat = idchatmoi;

          await db.Chat.create({
            tennguoigui: "Bo",
            tennguoinhan: data.ten,
            nguoigui: "nhanvien",
            nguoinhan: idchatmoi,
            noidung:
              data.ngonngu === "vi"
                ? `Chào ${data.ten}!, Chúng tôi có thể giúp gì cho bạn!!!`
                : `Hello ${data.ten}!, How can we help you!!!`,
            anh: null,
            thoigian: Date.now(),
          });
        }
        nguoidung.ho = data.ho;
        nguoidung.ten = data.ten;
        nguoidung.sdt = data.sodienthoai;
        nguoidung.diachinha = data.diachinha;
        nguoidung.gioitinhId = data.gioitinhId;
        nguoidung.quyenId = data.quyenId;

        await nguoidung.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa người dùng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy người dùng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let dangKy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await ktEmail(data.email);
      if (check === true) {
        resolve({
          maCode: 1,
          thongDiep: "Email đã được sử dụng vui lòng dùng email khác!!!",
          thongDiepen: "Email has been used, please use another email",
        });
      } else {
        let linkxacnhan = uuidv4();
        let idchat = uuidv4();
        await emailService.guiEmailDangKy({
          emailxacnhan: data.email,
          ho: data.ho,
          ten: data.ten,
          sodienthoai: data.sodienthoai,
          diachinha: data.diachinha,
          linkxacnhan: buillinkxacnhan(data.email, linkxacnhan),
          ngonngu: data.ngonngu,
        });

        let mahoamk = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: mahoamk,
          ho: data.ho,
          ten: data.ten,
          sdt: data.sodienthoai,
          diachinha: data.diachinha,
          quyenId: 12,
          gioitinhId: data.gioitinh,
          trangthaiId: 16,
          linkxacnhan: linkxacnhan,
          idchat: idchat,
        });

        let timnguoidungmoi = await db.User.findOne({
          where: { email: data.email },
        });

        await db.Giohang.create({
          idnguoidung: timnguoidungmoi.id,
        });
        await db.Chat.create({
          tennguoigui: "Bo",
          tennguoinhan: data.ten,
          nguoigui: "nhanvien",
          nguoinhan: idchat,
          noidung:
            data.ngonngu === "vi"
              ? `Chào ${data.ten}!, Chúng tôi có thể giúp gì cho bạn!!!`
              : `Hello ${data.ten}!, How can we help you!!!`,
          anh: null,
          thoigian: Date.now(),
        });

        resolve({
          maCode: 0,
          thongDiep: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xacNhanDangKy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.linkxacnhan || !data.email) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền lên server",
        });
      } else {
        let kt = await db.User.findOne({
          where: {
            email: data.email,
            linkxacnhan: data.linkxacnhan,
            trangthaiId: 16,
          },
          raw: false,
        });
        if (kt) {
          kt.trangthaiId = 17;
          await kt.save();
          resolve({
            maCode: 0,
            thongDiep: "Xác nhận tài khoản thành công",
          });
        } else {
          resolve({
            maCode: 2,
            thongDiep: "Tài khoản đã được kích hoạt",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let quenMK = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkemail = await ktEmail(data.email);
      if (checkemail === false) {
        resolve({
          maCode: 1,
          thongDiep: "Email này chưa đăng ký tài khoản!!!",
          thongDiepen: "This email has not been registered yet!!!",
        });
      } else {
        let updatelinkmoi = await db.User.findOne({
          where: { email: data.email },
          raw: false,
        });

        let checktrangthai = await ktTrangThaiTaiKhoan(data.email);
        if (checktrangthai === false) {
          resolve({
            maCode: 2,
            thongDiep:
              "Tài khoản chưa được kích hoạt vui lòng kích hoạt trước!!!",
          });
        } else {
          let linkxacnhan = uuidv4();

          await emailService.guiEmaiQuenMk({
            emailxacnhan: data.email,
            linkxacnhan: buillinkdoimk(data.email, linkxacnhan),
            ngonngu: data.ngonngu,
          });
          updatelinkmoi.linkxacnhan = linkxacnhan;
          await updatelinkmoi.save();

          resolve({
            maCode: 0,
            thongDiep: "OK",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let doiMK = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.linkxacnhan || !data.email) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền lên server",
        });
      } else {
        let kt = await db.User.findOne({
          where: {
            email: data.email,
            linkxacnhan: data.linkxacnhan,
          },
          raw: false,
        });

        if (kt) {
          let mahoamk = await hashUserPassword(data.password);
          kt.password = mahoamk;
          kt.linkxacnhan = null;
          await kt.save();
          resolve({
            maCode: 0,
            thongDiep: "Đổi mật khẩu thành công",
          });
        } else {
          resolve({
            maCode: 2,
            thongDiep: "Không tìm thấy email của bạn",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let layTatCaNhanVien = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.User.findAll({
        where: { quyenId: 11 },
        attributes: {
          exclude: ["password", "linkxacnhan", "refresh_token"], //khong lay ra password
        },
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let thongTinNguoiDung = (id, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !email) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền vào",
        });
      } else {
        let thongtinnguoidung = "";
        thongtinnguoidung = await db.User.findOne({
          where: { id: id, email: email },
          attributes: {
            exclude: ["password", "refresh_token", "linkxacnhan", "idchat"],
          },
          include: [
            {
              model: db.Allcode,
              as: "gioitinh",
              attributes: ["tiengViet", "tiengAnh"],
            },
            {
              model: db.Allcode,
              as: "quyen",
              attributes: ["tiengViet", "tiengAnh"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          maCode: 0,
          thongDiep: "Ok ok ok",
          thongtinnguoidung,
        });
      }
    } catch {
      reject(e);
    }
  });
};

let capNhapThongTinNguoiDung = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nguoidung = await db.User.findOne({
        where: { id: data.id, email: data.email },
        raw: false,
      });
      if (nguoidung) {
        nguoidung.ho = data.ho;
        nguoidung.ten = data.ten;
        nguoidung.sdt = data.sodienthoai;
        nguoidung.diachinha = data.diachinha;
        nguoidung.gioitinhId = data.gioitinhId;
        nguoidung.anhdaidien = data.anhdaidien;
        await nguoidung.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa thông tin thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy người dùng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCodeServiec,
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
  reFresh_token,
  layTatCaNhanVien,
  thongTinNguoiDung,
  capNhapThongTinNguoiDung,
};
