const { Review } = require("../models/index");

class Comment {
    static updateComment(req, res) {
        let { userId } = req.session
        let { comments } = req.body
        let { id } = req.params

        Review.create({
            comments: comments,
            UserId: userId,
            GameStoreId: id
        })
        .then(() => {
            res.redirect(`/products/detail/${id}`)
        }).catch((err) => {
            res.send(err)
        });
    }
}

module.exports = { Comment };
