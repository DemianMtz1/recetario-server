const Recipe = require('../models/recipes');

function getAll() {
    return Recipe.find({});
}

function getById(id) {
    return Recipe.findById(id)
}

function create({ title, description, categoryId, ingredients, procedure, authorId }) {
    return Recipe.create({ title, description, categoryId, ingredients, procedure, authorId })
}

function deleteById(id) {
    return Recipe.findByIdAndDelete(id)
}

async function updateById(id, dataToChange) {
    return Recipe.findByIdAndUpdate(id, dataToChange);
}


module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    updateById
}