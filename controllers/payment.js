const { GameStore, Invoice } = require("../models");
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
}
module.exports = PaymentController;
