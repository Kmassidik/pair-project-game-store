const { User, Profile } = require('../models/index');
class DataUserDetail {
    static getUserDetail(req, res) {
        let username = req.session.username
        let id = req.session.userId

        if (!username && !id) return res.redirect('/login');

        User.findByPk(id, {
            attributes: ["username", "email", "role", "id", "password"],
            include: Profile
        })
            .then((user) => {
                // res.send(user)
                res.render('auth/userDetail', { data: user })
            })
            .catch((err) => {
                res.send(err)
            });
    }
    static postUserDetail(req, res) {
        let getId = req.session.userId
        let { username, email,role,fname,lname,age,address} = req.body

        Profile.update({
            firstname: fname,
            lastname: lname,
            age: age,
            address: address
        },
            {
                where: {
                    UserId: getId
                }
            }
        )
            .then(() => {

                return User.update({
                    username: username,
                    email: email,
                })
            }).catch((err) => {
                res.send(err)
            });
    }
}

module.exports = {
    DataUserDetail
}