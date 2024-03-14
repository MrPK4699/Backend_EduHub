const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lectures:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Lecture'
  }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

