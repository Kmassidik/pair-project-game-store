const { User } = require('../models/index');
class Register {
    static getRegister(req, res) {
        res.render('register', {err:""})
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
            res.send("berhasil")
        }).catch((err) => {
            if (err.name == "SequelizeValidationError") {
                err.errors.forEach(e => {
                    tempErr[e.path] = e.message
                });
                res.render('register',{err:tempErr})
            }else {
                res.send(err)
            }
        });
    }
}

module.exports = {
    Register
}