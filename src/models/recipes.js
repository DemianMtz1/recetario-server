const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String,
        required: true,
        minLength: 3
    },
    categoryId: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            ingredientName: {
                type: String,
                required: true,
                minLength: 1
            },
            quantity: {
                type: Number,
                required: true
            },
            ingredientQuantity: {
                type: Number,
                required: true
            },
            ingredientMeasure: {
                type: String,
                required: true
            }
        }
    ],
    procedure: {
        type: String,
        minLength: 3,
        required: true
    }
})

const Recipe = mongoose.model('recipes', recipeSchema);

module.exports = Recipe;