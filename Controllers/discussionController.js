const Discussion = require('../Models/Discussion');

// Controller function to create a new discussion post
exports.createDiscussion = async (req, res) => {
    try {
        const { text, user, lecture } = req.body;
        
        // Create a new discussion post
        const discussion = new Discussion({
            text,
            user,
            lecture
        });

        // Save the discussion post to the database
        const savedDiscussion = await discussion.save();

        res.status(201).json(savedDiscussion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to get all discussion posts for a specific lecture
exports.getDiscussionsByLecture = async (req, res) => {
    try {
        const lectureId = req.params.lectureId;

        // Find all discussion posts for the given lecture
        const discussions = await Discussion.find({ lecture: lectureId });

        res.json(discussions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to update an existing discussion post
exports.updateDiscussion = async (req, res) => {
    try {
        const discussionId = req.params.discussionId;
        const { text } = req.body;

        // Find the discussion post by ID and update its text
        const updatedDiscussion = await Discussion.findByIdAndUpdate(
            discussionId,
            { text },
            { new: true }
        );

        res.json(updatedDiscussion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to delete a discussion post
exports.deleteDiscussion = async (req, res) => {
    try {
        const discussionId = req.params.discussionId;

        // Find the discussion post by ID and delete it
        await Discussion.findByIdAndDelete(discussionId);

        res.json({ message: 'Discussion post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
