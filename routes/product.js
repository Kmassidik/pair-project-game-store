const routeProduct = require("express").Router();
const Controller = require("../controllers/controller");
const StripeController = require("../controllers/stripeController");
const { DataUserDetail } = require("../controllers/userdetail");

routeProduct.get("/products", Controller.GamesStore);
routeProduct.get("/products/detail/:id", Controller.detail);

routeProduct.post("/products/chart/:id", Controller.postInvoice);

routeProduct.post("/products/:id/invoice", Controller.postInvoice);
routeProduct.get("/products/checkout/:id", StripeController.showCheckout);

routeProduct.get("/userDetail", DataUserDetail.getUserDetail);
routeProduct.post("/userDetail", DataUserDetail.postUserDetail);

module.exports = routeProduct;
