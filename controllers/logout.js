class Logout {
    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            } else {
                res.redirect('/login');
            }
        });
    }
}

module.exports = {
    Logout
};
