const { Product, User, Transaction, UserDetail } = require("../models/index");
const formatNumber = require("../helper/formattedNumber");

class Controller {
  static Product(req, res) {
    const { userId } = req.session;
    Product.findAll()
      .then((data) => {
        res.render("home", { data, formatNumber });
        // res.render("product", { data, formatNumber, userId });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static detail(req, res) {
    Product.findByPk(req.params.id)
      .then((data) => {
        res.render("detail", { data, formatNumber });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static invoice(req, res) {
    const { userId } = req.session;
    let profile;
    User.findOne({ where: { UserId: userId } })
      .then((data) => {
        profile = data;
        return Product.findByPk(req.params.id);
      })
      .then((pdct) => {
        if (profile) {
          res.render("invoice", { pdct });
        } else res.redirect("/profile?error=Profile First");
      })
      .catch((err) => res.send(err));
  }

  static postInvoice(req, res) {
    const { userId } = req.session;
    const { quantitys } = req.body;
    let product;
    Product.findByPk(req.params.id)
      .then((pkg) => {
        product = pkg;
        return Transaction.create({
          quantity: +quantitys,
          UserId: userId,
          ProductId: +req.params.id,
          orderDate: new Date(),
          totalPayment: Transaction.price * quantitys,
        });
      })
      .then((data) => {
        res.redirect(`/product/invoice/checkout/${data.id}`);
      })
      .catch((err) => res.send(err));
  }
}

module.exports = Controller;
