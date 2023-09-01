const routeProduct = require("express").Router();
const { Comment } = require("../controllers/comment");
const Controller = require("../controllers/controller");
const PaymentController = require("../controllers/payment");
const { DataUserDetail } = require("../controllers/userdetail");

const authenticate = (req, res, next) => {
    if (req.session.username && req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

routeProduct.get("/products", Controller.GamesStore);
routeProduct.get("/products/detail/:id", Controller.detail);

routeProduct.post("/products/chart/:id", Controller.postInvoice);

routeProduct.post("/products/:id/invoice", Controller.postInvoice);
routeProduct.get("/products/checkout/:id", authenticate, PaymentController.showCheckout);

routeProduct.get("/payment", authenticate, PaymentController.showCheckout);
routeProduct.get("/cancelItem", authenticate, PaymentController.cancelItem);
routeProduct.post("/checkout", PaymentController.checkoutItems);
routeProduct.post("/get-comments/:id", Comment.updateComment);

routeProduct.get("/userDetail", authenticate, DataUserDetail.getUserDetail);
routeProduct.post("/userDetail", DataUserDetail.postUserDetail);
routeProduct.get("/transactions", authenticate, Controller.transactions);

module.exports = routeProduct;
