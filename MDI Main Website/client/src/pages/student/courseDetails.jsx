// src/pages/StudentViewCourseDetailsPage.jsx
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import VimeoPlayer from "@/components/VimeoPlayer";
import { AppContext } from "@/context/AppContext";
import { StudentContext } from "@/context/StudentContext";
import { fetchStudentViewCourseDetailsService } from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const { studentViewCourseDetails, setStudentViewCourseDetails } = useContext(StudentContext);
  const { userData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] = useState(null);
  const [coursePurchasedId, setCoursePurchasedId] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchDetails = async () => {
      setIsLoading(true);
      const response = await fetchStudentViewCourseDetailsService(id, userData?._id);
      if (isMounted && response?.success) {
        setStudentViewCourseDetails(response?.data);
        setCoursePurchasedId(response?.coursePurchasedId);
      }
      setIsLoading(false);
    };

    if (id) {
      fetchDetails();
    }

    return () => {
      isMounted = false;
      setStudentViewCourseDetails(null);
    };
  }, [id, userData?._id]);

  function handleSetFreePreview(videoUrl) {
    setDisplayCurrentVideoFreePreview(videoUrl);
  }

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) {
      setShowFreePreviewDialog(true);
    }
  }, [displayCurrentVideoFreePreview]);

  if (isLoading) {
    return <Loading />;
  }

  if (coursePurchasedId) {
    navigate(`/student/course/progress/${coursePurchasedId}`, { replace: true });
    return null;
  }

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum.findIndex((item) => item.freePreview)
      : -1;

  async function handleBuyNow(
    courseId,
    amount,
    email,
    courseTitle,
    instructorId,
    instructorName,
    studentResidence,
    courseImage
  ) {
    setIsBuyNowLoading(true); // Activate loading state
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount,
          courseId,
          courseTitle,
          instructorId,
          instructorName,
          studentId: userData._id,
          studentResidence,
          userName: userData.name,
          courseImage,
        }),
      });

      const { data } = await response.json();

      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
    } finally {
      setIsBuyNowLoading(false); // Deactivate loading state
    }
  }


  return (
    <div className="mx-auto px-4 sm:px-8 lg:px-16 mt-6">
      {/* Course Header Section */}
      <div className="bg-gradient-to-r from-[#2A3571] to-[#3A4A8F] text-white p-6 sm:p-10 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 leading-tight">
            {studentViewCourseDetails?.title}
          </h1>
          <p className="text-sm sm:text-lg text-gray-200 mb-4">
            {studentViewCourseDetails?.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="bg-white/10 px-3 py-1 rounded-full">
                By {studentViewCourseDetails?.instructorName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-200" />
              <span className="text-gray-200">
                {studentViewCourseDetails?.primaryLanguage}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Main Content */}
        <main className="space-y-6">
          {/* Course Description Card */}
          <Card className="bg-transparent shadow-lg rounded-2xl pt-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Course Description
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              {studentViewCourseDetails?.description}
            </CardContent>
          </Card>

          {/* Learning Objectives Card */}
          <Card className="bg-transparent shadow-lg rounded-2xl pt-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                What You'll Learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {studentViewCourseDetails?.objectives.split(".").map((objective, index) => (
                  <div key={index} className="flex items-start space-x-3 hover:bg-gray-50 rounded-lg">
                    <CheckCircle className="mt-1 h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Curriculum Section */}
          <Card className="bg-transparent shadow-lg rounded-2xl pt-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Course Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-2">
                {studentViewCourseDetails?.curriculum?.map((curriculumItem, index) => (
                  <div
                    key={index}
                    onClick={curriculumItem?.freePreview ? () => handleSetFreePreview(curriculumItem.videoUrl) : null}
                    className={`flex items-center rounded-lg transition-all ${curriculumItem?.freePreview ? "cursor-pointer" : "cursor-not-allowed"}`}
                  >
                    <div className="flex-shrink-0">
                      {curriculumItem?.freePreview ? (
                        <PlayCircle className="h-6 w-6 text-blue-600" />
                      ) : (
                        <Lock className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-800">{curriculumItem?.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-[800px]">
          <div className="sticky top-8 space-y-6">
            {/* Video Preview Card */}
            <Card className="bg-transparent shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="max-w-full aspect-video bg-gray-900">
                  <VimeoPlayer
                    url={
                      getIndexOfFreePreviewUrl !== -1
                        ? studentViewCourseDetails?.curriculum[getIndexOfFreePreviewUrl].videoUrl
                        : ""
                    }
                    width="450px"
                    height="200px"
                    courseTitle={studentViewCourseDetails?.title}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      ₦ {studentViewCourseDetails?.pricing?.toLocaleString("en-NG")}
                    </span>
                  </div>
                  <Button
                    className={`w-full h-12 text-lg font-semibold transition-transform ${isBuyNowLoading ? "opacity-50" : "hover:scale-[1.02]"} bg-gradient-to-r from-[#2A3571] to-[#3A4A8F]`}
                    onClick={() => handleBuyNow(
                      studentViewCourseDetails?._id,
                      studentViewCourseDetails?.pricing,
                      userData.email,
                      studentViewCourseDetails?.title,
                      studentViewCourseDetails?.instructorId,
                      studentViewCourseDetails?.instructorName,
                      userData.residence,
                      studentViewCourseDetails?.image
                    )}
                    disabled={isBuyNowLoading}
                  >
                    {isBuyNowLoading ? (
                      <div className="flex items-center gap-2">
                        <Loading className="h-5 w-5 border-2" />
                        Processing...
                      </div>
                    ) : (
                      "Buy Now"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Includes Card */}
            <Card className="bg-transparent shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  This course includes:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <PlayCircle className="h-5 w-5 text-blue-600" />
                  <span>{studentViewCourseDetails?.curriculum?.length} on-demand videos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>Full lifetime access</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showFreePreviewDialog} onOpenChange={setShowFreePreviewDialog}>
        <DialogContent className="w-[50rem] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Course Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
            <VimeoPlayer
              url={displayCurrentVideoFreePreview}
              width="100%"
              height="100%"
              courseTitle="Course Preview"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Close Preview
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseDetailsPage;