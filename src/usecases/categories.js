const Category = require('../models/categories');

function getAll() {
    return Category.find({});
}

function getById(id) {
    return Category.findById(id)
}

function create({ title }) {
    return Category.create({ title })
}

function deleteById(id) {
    return Category.findByIdAndDelete(id)
}

async function updateById(id, dataToChange) {
    return Category.findByIdAndUpdate(id, dataToChange);
}

module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    updateById
}