const router = require('express').Router();
const measuresUsesCases = require('../usecases/measures');

const auth = require('../middlewares/auth');
const validRole = require('../middlewares/validRole');

router.get('/', async (req, res) => {
    try {
        const measures = await measuresUsesCases.getAll();
        res.status(200).json({
            succes: true,
            message: 'All measures',
            data: {
                measures
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
        const measure = await measuresUsesCases.getById(id);
        res.status(200).json({
            succes: true,
            message: 'Measure by Id',
            data: {
                measure
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
        const newMeasure = req.body;
        const measure = await measuresUsesCases.create(newMeasure);
        res.status(200).json({
            succes: true,
            message: 'Created measure',
            data: {
                measure
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
        const measure = await measuresUsesCases.deleteById(id);
        res.status(200).json({
            succes: true,
            message: 'Measure deleted successfully',
            data: {
                measure
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
        const measure = await measuresUsesCases.updateById(id, req.body);
        res.status(200).json({
            succes: true,
            message: 'Measure updated successfully',
            data: {
                measure
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

module.exports = router;