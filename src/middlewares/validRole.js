const jwt = require('jsonwebtoken');
const usersUseCases = require('../usecases/users');

async function validRole(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(400).json({
            success: false,
            message: 'token must be provided',
            data: null
        })
        return;
    }
    const { id } = jwt.verify(authorization, process.env.JWT_SECRET);

    const user = await usersUseCases.getById(id);

    if (user.role !== 'admin') {
        res.status(400).json({
            success: false,
            message: 'No auth',
            data: null
        })
        return;
    }

    next();
}

module.exports = validRole;