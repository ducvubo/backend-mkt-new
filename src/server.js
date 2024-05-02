import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ws from "ws";
import jwt from "jsonwebtoken";
import db from "./models/index";
import compression from "compression";
import fs from "fs";
import morgan from "morgan";
import path from "path";
dotenv.config();

let app = express();
// let accessLogStream = fs.createWriteStream(path.join(__dirname, "lichsu.log"), {
//   flags: "a",
// });
// app.use(morgan("combined", { stream: accessLogStream }));
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//  app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(cookieParser());

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

const server = app.listen(port, () => {
  console.log("Cổng: " + port);
});

const wss = new ws.WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  const token = req.headers.cookie;
  if (token) {
    const regex = /refresh_token=([^;]+)/;
    const match = token.match(regex);
    const refreshToken = match && match[1];
    jwt.verify(
      refreshToken,
      process.env.JWT_KEY_REFRESH_TOKEN,
      {},
      (err, datanguoidung) => {
        if (err) return err;
        const id = datanguoidung.id;
        const ten = datanguoidung.ten;
        const idchat = datanguoidung.idchat;
        connection.id = id;
        connection.ten = ten;
        connection.idchat = idchat;
      }
    );
  }

  connection.on("message", async (message) => {
    const tinnhandata = JSON.parse(message.toString());
    const { nguoinhan, noidung, thoigian, tennguoigui, tennguoinhan, anh } =
      tinnhandata;
    const nguoigui = connection.idchat;
    if ((nguoinhan && noidung) || anh) {
      [...wss.clients]
        .filter((item) => item.idchat === nguoinhan)
        .forEach((item) =>
          item.send(
            JSON.stringify({
              noidung: noidung ? noidung : null,
              nguoigui: connection.idchat,
              nguoinhan,
              thoigian,
              tennguoigui,
              tennguoinhan,
              anh: anh ? anh : null,
              trangthaixem: "chuaxem",
            })
          )
        );
      await db.Chat.create({
        nguoigui: nguoigui,
        nguoinhan: nguoinhan,
        noidung: noidung ? noidung : null,
        thoigian: thoigian,
        tennguoigui: tennguoigui,
        tennguoinhan: tennguoinhan,
        anh: anh ? anh : null,
        trangthaixem: "chuaxem",
      });
    }

    if ((nguoigui === "nhanvien" && noidung) || anh) {
      [...wss.clients]
        .filter((item) => item.idchat === "nhanvien")
        .forEach((item) =>
          item.send(
            JSON.stringify({
              noidung: noidung ? noidung : null,
              nguoigui: connection.idchat,
              nguoinhan,
              thoigian,
              anh: anh ? anh : null,
              trangthaixem: "chuaxem",
            })
          )
        );
    }
  });

  [...wss.clients].forEach((clients) => {
    clients.send(
      JSON.stringify({
        online: [...wss.clients].map((item) => ({
          id: item.id,
          ten: item.ten,
          ho: item.ho,
          idchat: item.idchat,
        })),
      })
    );
  });
});
