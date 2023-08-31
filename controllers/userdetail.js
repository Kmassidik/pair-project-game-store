const { User, UserDetail } = require('../models/index');
class DataUserDetail {
    static getUserDetail(req, res) {
        let username = req.session.username
        let id = req.session.userId

        if (!username && !id) return res.redirect('/login');

        User.findByPk(id, {
            attributes: ["username", "email", "role", "id", "password"],
            include: UserDetail
        })
            .then((user) => {
                // res.send(user)
                res.render('userDetail', { data: user })
            })
            .catch((err) => {
                res.send(err)
            });
    }
    static postUserDetail(req, res) {
        let getId = req.session.userId
        let { username, email, role, fname, lname, age, address } = req.body

        UserDetail.update({
            username:username,
            email:email,
            role:role,
            fname:fname,
            lname:lname,
            age:age,
            address:address
        },
        {
            where: {
                UserId:getId
            }
        }
        )
        .then(() => {
            res.redirect('/userDetail')
        }).catch((err) => {
            res.send(err)
        });
    }
}

module.exports = {
    DataUserDetail
}