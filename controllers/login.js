const { User } = require('../models/index');
class Login {
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
            temp= user;
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
}

module.exports = {
    Login
};
