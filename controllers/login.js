const { User } = require('../models/index');

class Login {
    static getLogin(req, res) {
        res.render('login', { msg: "" })
    }
    static postLogin(req, res) {
        let { username, password } = req.body

        if (!username || !password) {
            throw 'Username and password are required.'
        }

        User.findOne({
            where: {
                username: username,
            }
        })
            .then((user) => {
                if (!user) {
                    throw 'User not found.'
                }
                return user.checkPassword(password)
            })
            .then((e) => {
                res.send(e)
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            });
    }
}

module.exports = {
    Login
}