const {
  GameStore,
  Invoice,
  Profile,
  Transaction,
  User,
} = require("../models/index");
const formatNumber = require("../helper/formattedNumber");

class Controller {
  static GamesStore(req, res) {
    let isLogin = false;

    if (req.session.username && req.session.userId) {
      isLogin = true;
    }
    const { userId } = req.session;
    GameStore.findAll()
      .then((data) => {
        res.render("home", { data, formatNumber, isLogin });
        // res.render("product", { data, formatNumber, userId });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static detail(req, res) {
    GameStore.findByPk(req.params.id)
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
        res.send(pdct);
        if (profile) {
          res.send("invoice", { pdct });
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
