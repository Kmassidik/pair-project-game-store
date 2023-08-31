const {
  GameStore,
  Invoice,
  Profile,
  Transaction,
  User,
  Review
} = require("../models/index");
const formatNumber = require("../helper/formattedNumber");
const { Op } = require("sequelize");
const formatedDate = require("../helper/formatedDate");

class Controller {
  static GamesStore(req, res) {
    let isLogin = false;
    let { search, sort } = req.query;
    let option = {};
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
        res.render("home", { data, formatNumber, isLogin });
        // res.render("product", { data, formatNumber, userId });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static detail(req, res) {
    let temp = {}
    GameStore.findByPk(req.params.id)
      .then((game) => {
        temp = game
        return Review.findAll({
          include:[{
            model:User
          },
          {
            model:GameStore
          }
        ]
        })
      })
      .then(review=>{
        // res.send(review)
         res.render("detail", { data:temp, formatNumber, review});
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
