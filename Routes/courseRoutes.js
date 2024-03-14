const express = require('express');
const router = express.Router();
const courseController = require('../Controllers/courseController');

const {authorizeAdmin}= require('../Middlewares/adminAuthorizMiddleware')

// provide middleware also
// router.use(authenticateToken);

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// only admin authorized ,authorizeAdmin
router.post('/' , courseController.addCourse);
router.put('/:id' , courseController.updateCourse);
router.delete('/:id' , courseController.deleteCourse);

module.exports = router;
