const mongoose=require('mongoose');

const lectureSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

const Lecture= mongoose.model('Lecture', lectureSchema);

module.exports =Lecture;