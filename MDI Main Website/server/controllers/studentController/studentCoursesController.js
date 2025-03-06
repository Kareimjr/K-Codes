const mongoose = require('mongoose');
const StudentCourses = require('../../models/studentCourses');

const getCoursesByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        // ✅ Validate the studentId format if using MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID format.",
            });
        }

        // ✅ Fetch the courses for the student
        const studentBoughtCourses = await StudentCourses.findOne({ userId: studentId });

        // ✅ Check if the student has any bought courses
        if (!studentBoughtCourses) {
            return res.status(404).json({
                success: false,
                message: "No courses found for this student.",
            });
        }

        // ✅ Return the courses
        res.status(200).json({
            success: true,
            data: studentBoughtCourses.courses,
        });

    } catch (error) {
        console.error("Error fetching courses:", error);  // Improved error logging
        res.status(500).json({
            success: false,
            message: "An internal server error occurred.",
            error: error.message,  // Optional: Include error details for debugging
        });
    }
};

module.exports = { getCoursesByStudentId };
