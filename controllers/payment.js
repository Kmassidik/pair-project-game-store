const {Transaction, GameStore, Invoice } = require("../models");
const formatNumber = require("../helper/formattedNumber");

class PaymentController {
  static showCheckout(req, res) {
    let id = +req.params.id;
    Invoice.findByPk(id, { include: GameStore })
      .then((data) => {
        // res.send(data)
        req.session.checkout = data;
        res.render("checkout", { data, formatNumber });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static checkoutItems(req,res){
    let UserId = req.session.userId
    let data = req.session.checkout

    Transaction.create({
      statusPayment: "Success",
      GameStoreId: data.GameStoreId,
      UserId: UserId
    })
    .then(() => {
      res.redirect('/')
    }).catch((err) => {
      res.send(err)
    });
  }

  static cancelItem(req,res){
    let UserId = req.session.userId
    let {GameStoreId} = req.session.checkout

    Transaction.create({
      statusPayment: "Cancel",
      GameStoreId: GameStoreId,
      UserId: UserId
    })
    .then(() => {
      res.redirect('/')
    }).catch((err) => {
      res.send(err)
    });
  }
}
module.exports = PaymentController;
