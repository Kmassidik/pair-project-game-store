const {
  GameStore,
  Invoice,
  Profile,
  Transaction,
  User,
  Review,
} = require("../models/index");
const formatNumber = require("../helper/formattedNumber");
const { Op } = require("sequelize");

class Controller {
  static GamesStore(req, res) {
    let isLogin = false;
    let { search, sort } = req.query;
    let option = {};
    let role = req.session.role;
    console.log(role);
    if (req.session.username && req.session.userId) {
      isLogin = true;
    }

    if (search) {
      option = {
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
      };
    }

    if (sort) {
      option = {
        order: [[`${sort}`, "asc"]],
      };
    }

    GameStore.findAll(option)
      .then((data) => {
        // res.send(data)
        res.render("home", { data, formatNumber, isLogin, role });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static detail(req, res) {
    let isLogin = false;

    if (req.session.username && req.session.userId) {
      isLogin = true;
    }
    let temp = {};
    GameStore.findByPk(req.params.id)
      .then((game) => {
        temp = game;
        return Review.findAll({
          where: {
            GameStoreId: req.params.id,
          },
          include: [
            {
              model: User,
            },
            {
              model: GameStore,
            },
          ],
        });
      })
      .then((review) => {
        temp.generateQRCode((error, qrCodeImage) => {
          if (error) {
            console.error("Error generating QR code:", error);
            res.render("detail", {
              data: temp,
              formatNumber,
              review,
              qrCodeImageError: error,
              isLogin,
            });
          } else {
            res.render("detail", {
              data: temp,
              formatNumber,
              review,
              qrCodeImage,
              isLogin,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
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
    const { quantity } = req.body;
    let product;
    GameStore.findByPk(req.params.id)
      .then((result) => {
        // res.send(result)
        return Invoice.create({
          quantity: +quantity,
          UserId: 1, //sek mas
          GameStoreId: +req.params.id,
          totalPayment: result.price * quantity,
        });
      })
      .then((data) => {
        // res.send(data)
        res.redirect(`/products/checkout/${data.id}`);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static transactions(req, res) {
    Transaction.findAll()
      .then((transactions) => {
        res.render("transaction", { transactions });
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  }
}

module.exports = Controller;
