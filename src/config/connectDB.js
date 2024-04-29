const { Sequelize } = require("sequelize");
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("hhflowerr", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");
  } catch (error) {
    console.error("Kết nối database thất bại", error);
  }
};
module.exports = connectDB;
