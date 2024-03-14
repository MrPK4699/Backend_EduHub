const express = require('express');
const router = express.Router();
const discussionController = require('../Controllers/discussionController');

const authenticateToken= require('../Middlewares/authmiddleware')
// router.use(authenticateToken)


router.post('/', discussionController.createDiscussion);
router.get('/:lectureId', discussionController.getDiscussionsByLecture);
router.put('/:discussionId', discussionController.updateDiscussion);
router.delete('/:discussionId', discussionController.deleteDiscussion);

module.exports = router;
