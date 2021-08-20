const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3
    },
});

const Category = mongoose.model('categories', categoriesSchema);


module.exports = Category