const { GameStore, User, Transaction, Profile } = require("../models/index");

class AuthenticationUser {
    static getLogin(req, res) {
        res.render('auth/login', { msg: "" })
    }
    static postLogin(req, res) {
        let { username, password } = req.body

        if (!username || !password) {
            throw 'Username and password are required.'
        }

        let temp = {}
        User.findOne({
            where: {
                username: username,
            }
        })
            .then((user) => {
                if (!user) {
                    throw 'User not found.'
                }
                temp = user;
                return user.checkPassword(password)
            })
            .then(() => {
                req.session.username = temp.username;
                req.session.userId = temp.id;
                res.redirect('/home')
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    }
    static home(req, res) {
        if (req.session.username && req.session.userId) {
            res.redirect('/products')
        } else {
            res.redirect('/login');
        }
    }
    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            } else {
                res.redirect('/login');
            }
        });
    }
    static getRegister(req, res) {
        res.render('auth/register', { err: "" })
    }
    static postRegister(req, res) {
        let { username, password, email } = req.body

        let tempErr = {}
        User.create({
            username,
            password,
            email
        })
            .then(() => {
                return User.findOne({
                    where: {
                        email: email
                    }
                })
            })
            .then((user) => {
                return Profile.create({
                    UserId: user.id
                })
            })
            .then(() => {
                res.redirect('/login')
            })
            .catch((err) => {
                if (err.name == "SequelizeValidationError") {
                    err.errors.forEach(e => {
                        tempErr[e.path] = e.message
                    });
                    res.render('auth/register', { err: tempErr })
                } else {
                    console.log(err);
                    res.send(err)
                }
            });
    }
}

module.exports = {
    AuthenticationUser
}