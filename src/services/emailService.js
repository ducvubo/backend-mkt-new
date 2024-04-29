require("dotenv").config();
import nodemailer from "nodemailer";

let guiEmailDangKy = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  if (dataSend.ngonngu === "vi") {
    let info = await transporter.sendMail({
      from: "HHFLOWER", // sender address
      to: dataSend.emailxacnhan, // list of receivers
      subject: "Đăng ký tài khoản", // Subject line
      html: `<div>Bạn nhận được email này khi bạn yêu cầu đăng ký tài khoản tại HHFLOWER</div>
        <div>Họ: ${dataSend.ho} </div>
        <div>Tên: ${dataSend.ten}</div>
        <div>Số điện thoại: ${dataSend.sodienthoai}</div>
        <div>Địa chỉ nhà: ${dataSend.diachinha}</div>
        <span>Nếu các thông tin trên là đúng vui nhấn vào đây </span>
        <a href=${dataSend.linkxacnhan} target="_blank">Nhấp vào đây</a>
        `,
    });
  }
  if (dataSend.ngonngu === "en") {
    let info = await transporter.sendMail({
      from: "HHFLOWER", // sender address
      to: dataSend.emailxacnhan, // list of receivers
      subject: "Register an account", // Subject line
      html: `<div>You received this email when you requested to register for an account at HHFLOWER</div>
        <div>Last name: ${dataSend.ho} </div>
        <div>First name: ${dataSend.ten}</div>
        <div>Phone number: ${dataSend.sodienthoai}</div>
        <div>Address: ${dataSend.diachinha}</div>
        <span>If the above information is correct, please click here</span>
        <a href=${dataSend.linkxacnhan} target="_blank">click here</a>
        `,
    });
  }
};

let guiEmaiQuenMk = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  if (dataSend.ngonngu === "vi") {
    let info = await transporter.sendMail({
      from: "HHFLOWER", // sender address
      to: dataSend.emailxacnhan, // list of receivers
      subject: "Quên mật khẩu", // Subject line
      html: `<div>Bạn nhận được email này khi bạn quên mật khẩu ở HHFLOWER</div>
      <span>Vui lòng nhấn vào đây để có thể đổi mật khẩu của bạn</span>
          <a href=${dataSend.linkxacnhan} target="_blank">nhấp vào đây</a>
          `,
    });
  }
  if (dataSend.ngonngu === "en") {
    let info = await transporter.sendMail({
      from: "HHFLOWER", // sender address
      to: dataSend.emailxacnhan, // list of receivers
      subject: "Forgot your password", // Subject line
      html: `<div>You received this email when you forgot your password at HHFLOWER</div>
      <span>Please click here to change your password</span>
          <a href=${dataSend.linkxacnhan} target="_blank">click here</a>
          `,
    });
  }
};

module.exports = {
  guiEmailDangKy,
  guiEmaiQuenMk,
};
