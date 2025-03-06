import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VimeoPlayer from "@/components/VimeoPlayer";
import { AppContext } from "@/context/AppContext";
import { StudentContext } from "@/context/StudentContext";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
} from "@/services";
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import ReactConfetti from "react-confetti";

function StudentProgressPage() {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lockCourse, setLockCourse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  // Prevent duplicate API calls when marking a lecture as viewed
  const [isMarkingViewed, setIsMarkingViewed] = useState(false);

  const { id } = useParams(); // 'id' is the course id

  // When a new lecture is set, load its saved progress from localStorage.
  useEffect(() => {
    if (currentLecture?._id) {
      const savedProgress = localStorage.getItem(`videoProgress-${id}`);
      if (savedProgress) {
        const { lectureId, time } = JSON.parse(savedProgress);
        if (lectureId === currentLecture._id) {
          setVideoTime(time);
        }
      }
    }
  }, [currentLecture?._id, id]);

  // Save progress on time updates.
  const handleProgress = ({ progressValue, duration }) => {
    setVideoProgress(progressValue);
    const currentTime = duration * progressValue;
    setVideoTime(currentTime);
    localStorage.setItem(
      `videoProgress-${id}`,
      JSON.stringify({
        lectureId: currentLecture?._id,
        time: currentTime,
      })
    );
  };

  // Fetch current course progress.
  async function fetchCurrentCourseProgress() {
    setIsLoading(true);
    try {
      const response = await getCurrentCourseProgressService(userData?._id, id);
      if (response?.success) {
        if (!response.data.isPurchased) {
          setLockCourse(true);
        } else {
          const courseDetails = response.data.courseDetails;
          const progress = response.data.progress || [];
          setStudentCurrentCourseProgress({ courseDetails, progress });
          // If the backend reports the course as complete, update state accordingly.
          if (response.data.completed === true) {
            setCurrentLecture(null);
            setShowCourseCompleteDialog(true);
            setShowConfetti(true);
          } else {
            // Otherwise, if no lecture is currently selected, choose the first unwatched lecture.
            if (!currentLecture && courseDetails) {
              const firstUnwatched = courseDetails.curriculum.find(
                (lecture) => !progress.some((p) => p.lectureId === lecture._id)
              );
              setCurrentLecture(firstUnwatched || courseDetails.curriculum[0]);
            }
          }
        }
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching course progress:", error);
    } finally {
      setIsLoading(false);
    }
    return null;
  }

  // Given courseDetails and the current lecture's ID, return the next lecture.
  const findNextLecture = (courseDetails, currentLectureId) => {
    if (!courseDetails) return null;
    const curriculum = courseDetails.curriculum || [];
    const currentIndex = curriculum.findIndex((l) => l._id === currentLectureId);
    return currentIndex >= 0 ? curriculum[currentIndex + 1] : null;
  };

  // When the video ends, mark the lecture as viewed and then fetch updated progress.
  const handleVideoEnd = async () => {
    if (!currentLecture || isMarkingViewed) return;
    setIsMarkingViewed(true);
    try {
      const response = await markLectureAsViewedService(
        userData?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture?._id
      );
      if (response?.success) {
        // Refresh progress data from the backend.
        const data = await fetchCurrentCourseProgress();
        if (!data) {
          setIsMarkingViewed(false);
          return;
        }
        // Determine the next lecture from the updated course details.
        const nextLecture = findNextLecture(data.courseDetails, currentLecture._id);
        if (nextLecture) {
          setCurrentLecture(nextLecture);
          setVideoProgress(0);
          setVideoTime(0);
          localStorage.removeItem(`videoProgress-${id}`);
        } else {
          // If there's no next lecture, the course is complete.
          setCurrentLecture(null);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);
          localStorage.removeItem(`videoProgress-${id}`);
        }
      }
    } catch (error) {
      console.error("Error marking lecture as viewed:", error);
    } finally {
      setIsMarkingViewed(false);
    }
  };

  // Handler for rewatching the course.
  async function handleRewatchCourse() {
    try {
      const response = await resetCourseProgressService(
        userData?._id,
        studentCurrentCourseProgress?.courseDetails?._id
      );
      if (response?.success) {
        setCurrentLecture(null);
        setShowConfetti(false);
        setShowCourseCompleteDialog(false);
        localStorage.removeItem(`videoProgress-${id}`);
        await fetchCurrentCourseProgress();
      }
    } catch (error) {
      console.error("Error resetting course progress:", error);
    }
  }

  // When video progress reaches 100%, consider the video ended.
  useEffect(() => {
    if (videoProgress >= 1.0) {
      handleVideoEnd();
    }
  }, [videoProgress]);

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  // Show confetti for 30 seconds.
  useEffect(() => {
    let timeout;
    if (showConfetti) {
      timeout = setTimeout(() => setShowConfetti(false), 30000);
    }
    return () => clearTimeout(timeout);
  }, [showConfetti]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#111b4b] text-white">
      {showConfetti && <ReactConfetti recycle={true} numberOfPieces={500} />}
      
      <div className="flex items-center justify-between p-4 bg-transparent border-b border-gray-500">
        <div className="flex items-center space-x-6">
          <Button
            onClick={() => navigate("/student/course/mycourses")}
            className="text-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Course Page
          </Button>
          <div className="flex flex-col">
            <h1 className="text-base font-bold hidden md:block">
              Course: {studentCurrentCourseProgress?.courseDetails?.title}
            </h1>
            <h2 className="text-base font-bold hidden md:block">
              Chapter: {currentLecture ? currentLecture.title : "Completed"}
            </h2>
          </div>
        </div>
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-[#0c1336] hover:bg-[#182669] lg:hidden"
        >
          {isSidebarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "mr-[180px] sm:mr-[220px] md:mr-[280px]" : ""
          } lg:mr-[350px]`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          {currentLecture ? (
            <VimeoPlayer
              key={currentLecture._id}
              height="100%"
              width="100%"
              url={currentLecture.videoUrl}
              autoplay={!showCourseCompleteDialog}
              onEnd={handleVideoEnd}
              onProgressUpdate={handleProgress}
              startTime={videoTime}
              paused={showCourseCompleteDialog}
            />
          ) : null}
        </div>
        <div
          className={`fixed top-[64px] right-0 bottom-0 bg-[#111b4b] border-l border-gray-700 transition-all duration-300
                      w-[180px] sm:w-[220px] md:w-[280px] lg:w-[350px]
                      ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#111b4b] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className="flex items-center justify-center text-white rounded-none h-full text-xs sm:text-sm md:text-base"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="flex items-center justify-center text-white rounded-none h-full text-xs sm:text-sm md:text-base"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => {
                      const isCompleted = studentCurrentCourseProgress?.progress?.some(
                        (p) => p.lectureId === item._id
                      );
                      const isCurrent = item._id === currentLecture?._id;
                      return (
                        <div
                          className={`flex items-center space-x-2 text-sm font-bold cursor-pointer ${
                            isCompleted
                              ? "text-green-500"
                              : isCurrent
                              ? "text-yellow-200"
                              : "text-white"
                          }`}
                          key={item._id}
                          onClick={() => {
                            setCurrentLecture(item);
                            setVideoProgress(0);
                          }}
                        >
                          {isCompleted ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                          <span>{item?.title}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About this course</h2>
                  <p className="text-gray-400">
                    {studentCurrentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent showOverlay={false} className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Congratulations on your completion of this course
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>You have successfully completed the course</Label>
              <div className="flex flex-row gap-3">
                <Button onClick={() => navigate("/student/course/mycourses")}>
                  My Courses Page
                </Button>
                <Button onClick={handleRewatchCourse}>Rewatch Course</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentProgressPage;