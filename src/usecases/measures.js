const Measure = require('../models/measures');

function getAll() {
    return Measure.find({});
}

function getById(id) {
    return Measure.findById(id)
}

function create({ measureType }) {
    return Measure.create({ measureType })
}

function deleteById(id) {
    return Measure.findByIdAndDelete(id)
}

async function updateById(id, dataToChange) {
    return Measure.findByIdAndUpdate(id, dataToChange);
}

module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    updateById
}