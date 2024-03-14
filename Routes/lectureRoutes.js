const express = require('express');
const router = express.Router();
const lectureController = require('../Controllers/lectureController');

const {authorizeAdmin}= require('../Middlewares/adminAuthorizMiddleware')

// provide middleware also

router.get('/', lectureController.getAllLectures);
router.get('/:id', lectureController.getLectureById);

// only admin authorized ,authorizeAdmin
router.post('/' , lectureController.addLecture);
router.put('/:id' , lectureController.updateLecture);
router.delete('/:id' , lectureController.deleteLecture);

module.exports = router;
