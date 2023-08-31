const express = require("express");
const session = require("express-session");
require("dotenv").config();
const qrcode = require("qrcode");
const path = require("path");

const { Register } = require("./controllers/register");
const { Login } = require("./controllers/login");
const { Logout } = require("./controllers/logout");
const Controller = require("./controllers/controller");
const { DataUserDetail } = require("./controllers/userdetail");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", Login.getLogin);
app.post("/login", Login.postLogin);

app.get("/register", Register.getRegister);
app.post("/register", Register.postRegister);

app.get("/home", Login.home);
app.get("/logout", Logout.logout);

app.get("/products", Controller.product);
app.get("/package/detail/:id", Controller.detail);

app.post("/package/chart/:id", Controller.postInvoice);

app.post("/products/:id/invoice", Controller.postInvoice);

app.get("/userDetail", DataUserDetail.getUserDetail);
app.post("/userDetail", DataUserDetail.postUserDetail);

app.get("/generateQR", async (req, res) => {
  const url = "http://localhost:3000/package/detail/48";

  try {
    const qrCodeImage = await qrcode.toDataURL(url);
    res.send(
      `<img style="width:500px; height:500px;" src="${qrCodeImage}" alt="QR Code" />`
    );
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
