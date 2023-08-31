const routeProduct = require("express").Router();
const Controller = require("../controllers/controller");
const { DataUserDetail } = require("../controllers/userdetail");

routeProduct.get("/products", Controller.GamesStore);
routeProduct.get("/package/detail/:id", Controller.detail);

routeProduct.post("/package/chart/:id", Controller.postInvoice);

routeProduct.post("/products/:id/invoice", Controller.postInvoice);

routeProduct.get("/userDetail", DataUserDetail.getUserDetail);
routeProduct.post("/userDetail", DataUserDetail.postUserDetail);

module.exports = routeProduct;
