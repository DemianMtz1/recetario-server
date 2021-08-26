const router = require('express').Router();
const recipesUsesCases = require('../usecases/recipes');

const auth = require('../middlewares/auth');
const validRole = require('../middlewares/validRole');

router.get('/', async (req, res) => {
    try {
        const recipes = await recipesUsesCases.getAll();
        res.status(200).json({
            succes: true,
            message: 'All recipes',
            data: {
                recipes
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
        const recipe = await recipesUsesCases.getById(id);
        res.status(200).json({
            succes: true,
            message: 'Recipe by Id',
            data: {
                recipe
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

router.post('/', auth, async (req, res) => {
    try {
        const newRecipe = req.body;
        const recipe = await recipesUsesCases.create(newRecipe);
        res.status(200).json({
            succes: true,
            message: 'Created recipe',
            data: {
                recipe
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

router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await recipesUsesCases.deleteById(id);
        res.status(200).json({
            succes: true,
            message: 'Recipe deleted successfully',
            data: {
                recipe
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

router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await recipesUsesCases.updateById(id, req.body);
        res.status(200).json({
            succes: true,
            message: 'Recipe updated successfully',
            data: {
                recipe
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