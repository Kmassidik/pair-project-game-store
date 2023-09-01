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
        // console.log(req.body);
        // res.send(req.body)
        let { username, email, role, fname, lname, dateOfBirth, phoneNumber } = req.body

        Profile.update({
            firstname: fname,
            lastname: lname,
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber
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
                    role: role
                }, {
                    where: {
                        id: getId
                    }
                })
            })
            .then(() => {
                res.redirect("/")
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            });
    }
}

module.exports = {
    DataUserDetail
}