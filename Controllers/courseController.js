const Course = require('../Models/Courses');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    console.log(req.params.id)
    const course = await Course.find({_id:req.params.id});
    if (!course) {
      return res.status(404).json({ message: 'course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', msg:req.params.id });
  }
};

// Add new course
exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: 'course added successfully', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update course by ID
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
    // const updatedProduct = await course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'course not found' });
    }
    res.status(204).json({ message: 'course updated successfully', course: updatedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete course by ID
exports.deleteCourse = async (req, res) => {
  try {
    // const deletedProduct = await Product.findOneAndDelete({id:req.params.id});
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'course not found' });
    }
    res.status(202).json({ message: 'course deleted successfully', course: deletedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
