const { Product,transaction } = require("../models");
const formatNumber = require("../helper/formattedNumber");

class Controller {
  static Product(req, res) {
    const { userId } = req.session;
    Product.findAll()
      .then((data) => {
        res.render("home", { data, formatNumber, userId });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
