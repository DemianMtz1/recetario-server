const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(400).json({
            success: false,
            message: 'token must be provided',
            data: null
        })
        return;
    }
    const validToken = jwt.verify(authorization, process.env.JWT_SECRET);
    if (!validToken) {
        res.status(400).json({
            success: false,
            message: 'Sign in again',
            data: null
        })
        return;
    }
    next();
}

module.exports = auth