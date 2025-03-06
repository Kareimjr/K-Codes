const CourseProgress = require("../../models/CourseProgress");
const Course = require("../../models/course");
const StudentCourses = require("../../models/studentCourses");

// Mark the current lecture as viewed
const markCurrentLectureAsViewed = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;

    // Ensure there is a CourseProgress document. Use upsert to create one if needed.
    let progress = await CourseProgress.findOneAndUpdate(
      { userId, courseId },
      {
        $setOnInsert: {
          userId,
          courseId,
          lecturesProgress: [],
          completed: false,
          completionDate: null,
        },
      },
      { new: true, upsert: true }
    );

    // Convert lectureId to string for consistency.
    const lectureIdStr = lectureId.toString();

    // Check if the lecture is already recorded
    const lectureIndex = progress.lecturesProgress.findIndex(
      (item) => item.lectureId.toString() === lectureIdStr
    );

    if (lectureIndex > -1) {
      // Update the existing lecture progress.
      progress.lecturesProgress[lectureIndex].viewed = true;
      progress.lecturesProgress[lectureIndex].dateViewed = new Date();
    } else {
      // Push a new lecture progress entry.
      progress.lecturesProgress.push({
        lectureId: lectureIdStr,
        viewed: true,
        dateViewed: new Date(),
      });
    }

    // Save the updated progress document.
    await progress.save();

    // Reload the progress document from the database.
    progress = await CourseProgress.findOne({ userId, courseId });

    // Retrieve course details to know the total number of lectures.
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Build a set of unique lecture IDs from the progress.
    const uniqueLectureIds = new Set(
      progress.lecturesProgress.map((item) => item.lectureId.toString())
    );

    // Determine if all lectures are viewed.
    const allLecturesViewed =
      uniqueLectureIds.size === course.curriculum.length &&
      progress.lecturesProgress.every((item) => item.viewed === true);

    // If all lectures are viewed, mark the course as completed.
    if (allLecturesViewed) {
      progress.completed = true;
      progress.completionDate = new Date();
      await progress.save();
    }

    return res.status(200).json({
      success: true,
      message: "Lecture marked as viewed",
      data: progress,
    });
  } catch (error) {
    console.error("Error in markCurrentLectureAsViewed:", error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Get current course progress
const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const studentPurchasedCourses = await StudentCourses.findOne({ userId });

    const isPurchased = studentPurchasedCourses?.courses?.some(
      (item) => item.courseId.toString() === courseId.toString()
    );

    if (!isPurchased) {
      return res.status(200).json({
        success: true,
        data: {
          isPurchased: false,
        },
        message: "You need to purchase this course to access it.",
      });
    }

    const currentUserCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (
      !currentUserCourseProgress ||
      currentUserCourseProgress.lecturesProgress.length === 0
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "No progress found, you can start watching the course",
        data: {
          courseDetails: course,
          progress: [],
          isPurchased: true,
        },
      });
    }

    const courseDetails = await Course.findById(courseId);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        progress: currentUserCourseProgress.lecturesProgress,
        completed: currentUserCourseProgress.completed,
        completionDate: currentUserCourseProgress.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    console.error("Error in getCurrentCourseProgress:", error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Reset course progress
const resetCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found!",
      });
    }

    progress.lecturesProgress = [];
    progress.completed = false;
    progress.completionDate = null;

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Course progress has been reset",
      data: progress,
    });
  } catch (error) {
    console.error("Error in resetCurrentCourseProgress:", error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  markCurrentLectureAsViewed,
  getCurrentCourseProgress,
  resetCurrentCourseProgress,
};