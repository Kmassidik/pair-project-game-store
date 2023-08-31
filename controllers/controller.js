const { Product } = require("../models/index");
const formatNumber = require("../helper/formattedNumber");

class Controller {
  static Product(req, res) {
    const { userId } = req.session;
    Product.findAll()
      .then((data) => {
        // res.send(data)
        res.render("product", { data, formatNumber, userId });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
}

module.exports = Controller;
