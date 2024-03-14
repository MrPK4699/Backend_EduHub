const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  role:{type:String,enum:['Admin','Student'], default:'Student' },
  email: { type: String, required: true, unique: true, match: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/ },
  password: { type: String, required: true },
  gender: { type: Number },
  courses: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
   }],
});


const User = mongoose.model('User', userSchema);

module.exports = User;
