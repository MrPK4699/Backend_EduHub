const Lecture = require('../Models/Lectures');

// Get all lectures
exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.status(200).json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get lecture by ID
exports.getLectureById = async (req, res) => {
  try {
    console.log(req.params.id)
    const lecture = await Lecture.find({_id:req.params.id});
    if (!lecture) {
      return res.status(404).json({ message: 'lecture not found' });
    }
    res.status(200).json(lecture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', msg:req.params.id });
  }
};

// Add new lecture
exports.addLecture = async (req, res) => {
  try {
    const lecture = new Lecture(req.body);
    await lecture.save();
    res.status(201).json({ message: 'lecture added successfully', lecture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update lecture by ID
exports.updateLecture = async (req, res) => {
  try {
    const updatedLecture = await Lecture.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
    // const updatedProduct = await lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLecture) {
      return res.status(404).json({ message: 'lecture not found' });
    }
    res.status(204).json({ message: 'lecture updated successfully', lecture: updatedLecture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete lectue by ID
exports.deleteLecture = async (req, res) => {
  try {
    // const deletedProduct = await Product.findOneAndDelete({id:req.params.id});
    const deletedLecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!deletedLecture) {
      return res.status(404).json({ message: 'lecture not found' });
    }
    res.status(202).json({ message: 'lecture deleted successfully', lecture: deletedLecture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
