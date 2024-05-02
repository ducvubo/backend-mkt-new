// import { server } from "./server";
// import ws from "ws";
// import jwt from "jsonwebtoken";

// const wss = new ws.WebSocketServer({ server });

// wss.on("connection", (connection, req) => {
//   const token = req.headers.cookie;
//   if (token) {
//     const regex = /refresh_token=([^;]+)/;
//     const match = token.match(regex);
//     const refreshToken = match && match[1];
//     jwt.verify(
//       refreshToken,
//       process.env.JWT_KEY_REFRESH_TOKEN,
//       {},
//       (err, datanguoidung) => {
//         if (err) return err;
//         const id = datanguoidung.id;
//         const ten = datanguoidung.ten;
//         const idchat = datanguoidung.idchat;
//         connection.id = id;
//         connection.ten = ten;
//         connection.idchat = idchat;
//       }
//     );
//   }

//   connection.on("message", async (message) => {
//     const tinnhandata = JSON.parse(message.toString());
//     const { nguoinhan, noidung, thoigian, tennguoigui, tennguoinhan, anh } =
//       tinnhandata;
//     const nguoigui = connection.idchat;
//     if ((nguoinhan && noidung) || anh) {
//       [...wss.clients]
//         .filter((item) => item.idchat === nguoinhan)
//         .forEach((item) =>
//           item.send(
//             JSON.stringify({
//               noidung: noidung ? noidung : null,
//               nguoigui: connection.idchat,
//               nguoinhan,
//               thoigian,
//               tennguoigui,
//               tennguoinhan,
//               anh: anh ? anh : null,
//               trangthaixem: "chuaxem",
//             })
//           )
//         );
//       await db.Chat.create({
//         nguoigui: nguoigui,
//         nguoinhan: nguoinhan,
//         noidung: noidung ? noidung : null,
//         thoigian: thoigian,
//         tennguoigui: tennguoigui,
//         tennguoinhan: tennguoinhan,
//         anh: anh ? anh : null,
//         trangthaixem: "chuaxem",
//       });
//     }

//     if ((nguoigui === "nhanvien" && noidung) || anh) {
//       [...wss.clients]
//         .filter((item) => item.idchat === "nhanvien")
//         .forEach((item) =>
//           item.send(
//             JSON.stringify({
//               noidung: noidung ? noidung : null,
//               nguoigui: connection.idchat,
//               nguoinhan,
//               thoigian,
//               anh: anh ? anh : null,
//               trangthaixem: "chuaxem",
//             })
//           )
//         );
//     }
//   });

//   [...wss.clients].forEach((clients) => {
//     clients.send(
//       JSON.stringify({
//         online: [...wss.clients].map((item) => ({
//           id: item.id,
//           ten: item.ten,
//           ho: item.ho,
//           idchat: item.idchat,
//         })),
//       })
//     );
//   });
// });
