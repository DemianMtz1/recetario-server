const router = require('express').Router();
const categoriesUsesCases = require('../usecases/categories');

const auth = require('../middlewares/auth');
const validRole = require('../middlewares/validRole');

router.get('/', async (req, res) => {
    try {
        const categories = await categoriesUsesCases.getAll();
        res.status(200).json({
            succes: true,
            message: 'All categories',
            data: {
                categories
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


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const category = await categoriesUsesCases.getById(id);
        res.status(200).json({
            succes: true,
            message: 'Category by Id',
            data: {
                category
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


router.post('/', auth, validRole, async (req, res) => {
    try {
        const newCategory = req.body;
        const category = await categoriesUsesCases.create(newCategory);
        res.status(200).json({
            succes: true,
            message: 'Created category',
            data: {
                category
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
        const category = await categoriesUsesCases.deleteById(id);
        res.status(200).json({
            succes: true,
            message: 'Category deleted successfully',
            data: {
                category
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
        const category = await categoriesUsesCases.updateById(id, req.body);
        res.status(200).json({
            succes: true,
            message: 'Category updated successfully',
            data: {
                category
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