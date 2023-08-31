const { Product, Transaction, Package } = require("../models");
const formatNumber = require("../helpers/helper");

// const DOMAIN = "http://localhost:3003/";

class StripeController {
  static showCheckout(req, res) {
    let id = +req.params.id;
    Booking.findByPk(id, { include: Package })
      .then((data) => {
        req.session.checkout = data;
        res.render("checkout", { data, formatNumber });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  //   static stripe(req, res) {
  //     const session = stripe.checkout.sessions.create({
  //       line_items: [
  //         {
  //           price_data: {
  //             currency: "idr",
  //             product_data: {
  //               name: "T-Shirt",
  //             },
  //             unit_amount: 2500000,
  //           },
  //           quantity: 1,
  //         },
  //       ],
  //       mode: "payment",
  //       success_url: `http:localhost:3003/success.html`,
  //       cancel_url: `http:localhost:3003/cancel.html`,
  //     });

  //     res.redirect(303, session.url);
  //   }
}
module.exports = StripeController;
