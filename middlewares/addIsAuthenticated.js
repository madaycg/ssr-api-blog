module.exports = (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
}
