const mongoose = require('mongoose');

const measuresSchema = mongoose.Schema({
    measureType: {
        type: String,
        required: true
    }
})

const Measure = mongoose.model('measures', measuresSchema);

module.exports = Measure;