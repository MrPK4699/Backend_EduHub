const mongoose = require('mongoose')

const discussionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true }
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
