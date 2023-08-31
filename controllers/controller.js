const { Product } = require("../models");
const formatNumber = require("../helper/formattedNumber");

class Controller {
  static Product(req, res) {
    const { userId } = req.session;
    Product.findAll()
      .then((data) => {
        res.render("product", { data, formatNumber, userId });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
