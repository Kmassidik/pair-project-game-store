const { User, UserDetail } = require('../models/index');
class Register {
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
                return UserDetail.create({
                    UserId : user.id
                })
            })
            .then(()=>{
                res.send("berhasil")
            })
            .catch((err) => {
                if (err.name == "SequelizeValidationError") {
                    err.errors.forEach(e => {
                        tempErr[e.path] = e.message
                    });
                    res.render('auth/register', { err: tempErr })
                } else {
                    res.send(err)
                }
            });
    }
}

module.exports = {
    Register
}