const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
    name: String,
    connections: Number,
    isTop: Boolean
});

module.exports = mongoose.model('Astrologer', astrologerSchema);
