const router = require('express').Router();
const userUseCases = require('../usecases/users');
const auth = require('../middlewares/auth');
const validRole = require('../middlewares/validRole');

router.get('/', auth, validRole, async (req, res) => {
    try {
        const users = await userUseCases.getAll();
        res.status(200).json({
            succes: true,
            message: 'All users',
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: error
        });
    }
})


router.get('/profile', auth, async (req, res) => {
    try {
        const { authorization } = req.headers;

        const user = await userUseCases.getByToken(authorization);
        res.status(200).json({
            succes: true,
            message: 'User by token',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: error
        });
    }
})

router.get('/user/:id', auth, validRole, async (req, res) => {
    try {
        const { id } = req.params
        const user = await userUseCases.getById(id);
        res.status(200).json({
            succes: true,
            message: 'User by Id',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: error
        });
    }
})


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await userUseCases.signIn(email, password);
        res.status(200).json({
            succes: true,
            message: 'Logged in',
            data: {
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: error
        });
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, avatar, email, username, password, role } = req.body;
        const newRole = 'user'
        let user, token;
        if (!role) {
            user = await userUseCases.signUp({ firstName, lastName, avatar, email, username, password, role: newRole })
            token = await userUseCases.signIn(email, password);
            res.status(200).json({
                succes: true,
                message: 'Signed Up successfully as user',
                data: {
                    user,
                    token
                }
            })
            return;
        }

        user = await userUseCases.signUp({ firstName, lastName, avatar, email, username, password, role })
        console.log(user)
        token = await userUseCases.signIn(email, password);
        res.status(200).json({
            succes: true,
            message: 'Signed Up successfully as admin',
            data: {
                user,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: error
        });
    }
})

router.delete('/:id', auth, validRole, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userUseCases.deleteById(id);
        res.status(200).json({
            succes: true,
            message: 'User deleted successfully',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: error
        });
    }
})

router.patch('/:id', auth, validRole, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userUseCases.updateById(id, req.body);
        res.status(200).json({
            succes: true,
            message: 'User updated successfully',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: error
        });
    }
})

module.exports = router