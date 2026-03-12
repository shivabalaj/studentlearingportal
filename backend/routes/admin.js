const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Course = require('../models/Course');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';

// Middleware to check if user is admin
const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// ==================== USER MANAGEMENT ====================

// Get all users (admin only)
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Update user role (admin only)
router.put('/users/:id/role', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// ==================== COURSE MANAGEMENT ====================

// Get all courses (admin view)
router.get('/courses', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

// Create new course
router.post('/courses', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { courseName, trainer, price, level, thumbnail } = req.body;

    const newCourse = new Course({
      courseName,
      trainer,
      price,
      level: level || 'Beginner',
      thumbnail,
      videos: []
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
});

// Update course
router.put('/courses/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { courseName, trainer, price, level, thumbnail } = req.body;

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { courseName, trainer, price, level, thumbnail, updatedAt: Date.now() },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
});

// Delete course
router.delete('/courses/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});

// ==================== VIDEO MANAGEMENT ====================

// Add video to course
router.post('/courses/:courseId/videos', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, google_drive_file_id, duration, instructor } = req.body;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const newVideo = {
      title,
      description,
      google_drive_file_id,
      duration,
      instructor,
      views: 0
    };

    course.videos.push(newVideo);
    course.updatedAt = Date.now();
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error adding video', error: error.message });
  }
});

// Update video
router.put('/courses/:courseId/videos/:videoId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, google_drive_file_id, duration, instructor } = req.body;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const video = course.videos.id(req.params.videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.google_drive_file_id = google_drive_file_id || video.google_drive_file_id;
    video.duration = duration || video.duration;
    video.instructor = instructor || video.instructor;

    course.updatedAt = Date.now();
    await course.save();

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating video', error: error.message });
  }
});

// Delete video
router.delete('/courses/:courseId/videos/:videoId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.videos.pull(req.params.videoId);
    course.updatedAt = Date.now();
    await course.save();

    res.json({ message: 'Video deleted successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
});

// ==================== DASHBOARD STATS ====================

// Get dashboard statistics - public endpoint for testing
// Removed unused /stats-public endpoint

// Get dashboard statistics
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const courses = await Course.find();
    const totalVideos = courses.reduce((sum, course) => {
      return sum + (course.videos ? course.videos.length : 0);
    }, 0);

    res.json({
      totalUsers,
      totalCourses: courses.length,
      totalVideos
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

module.exports = router;

