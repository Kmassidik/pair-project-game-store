const { Review } = require("../models/index");
const { Op } = require("sequelize");

class Comment {
    static updateComment(req, res) {
        // let UserId = req.session.UserId
        // let temp = req.body
        // let GamesStore = req.params.id
        console.log(req.params);
        console.log(req.body);
        // console.log(GamesStore);
        // res.json({UserId,temp,GamesStore})
    }
}

module.exports = { Comment };
