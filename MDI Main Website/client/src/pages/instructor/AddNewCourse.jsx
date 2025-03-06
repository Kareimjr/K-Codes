import CourseCurriculum from "@/components/Instructor-view/AddNewCourse/courseCurriculum";
import CourseLanding from "@/components/Instructor-view/AddNewCourse/courseLanding";
import CourseSettings from "@/components/Instructor-view/AddNewCourse/courseSetting";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { AppContext } from "@/context/AppContext";
import { InstructorContext } from "@/context/InstructorContext";
import { addNewCourseListService, fetchInstructorCourseDetailsService, updateCourseByIdService } from "@/services";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddNewCoursePage() {
    const {
        courseLandingFormData,
        courseCurriculumFormData,
        setCourseLandingFormData,
        setCourseCurriculumFormData,
        currentEditedCourseId,
        setCurrentEditedCourseId,
    } = useContext(InstructorContext);
    const { userData, isLoading } = useContext(AppContext);
    const navigate = useNavigate();
    const params = useParams();

    const [fetchingData, setFetchingData] = useState(currentEditedCourseId ? true : false);

    if (isLoading) {
        return <Loading />;
    }

    function isEmpty(value) {
        if (Array.isArray(value)) return value.length === 0;
        return value === "" || value === null || value === undefined;
    }

    function validatedFormData() {
        // Define required course landing fields (excluding filename)
        const requiredLandingFields = [
            'title', 'category', 'level', 'primaryLanguage',
            'subtitle', 'description', 'pricing', 'objectives',
            'welcomeMessage', 'image'
        ];

        // Validate course landing data
        for (const field of requiredLandingFields) {
            if (isEmpty(courseLandingFormData[field])) {
                console.log(`Course Landing Field Empty: ${field}`);
                return false;
            }
        }

        // Validate curriculum data
        const filledLectures = courseCurriculumFormData.filter(
            (item) => !isEmpty(item.title) || !isEmpty(item.videoUrl)
        );

        if (filledLectures.length === 0) {
            console.log("No filled lectures");
            return false;
        }

        for (const item of filledLectures) {
            if (isEmpty(item.title) || isEmpty(item.videoUrl)) {
                console.log("Invalid lecture:", item);
                return false;
            }
        }

        const hasFreePreview = filledLectures.some((item) => item.freePreview);
        if (!hasFreePreview) {
            console.log("No free preview lecture");
            return false;
        }

        console.log("Validation Passed ✅");
        return true;
    }

    async function handleCreateCourse() {
        const courseFinalFormData = {
            instructorId: userData?._id,
            instructorName: userData?.name,
            instructorResidence: userData?.residence,
            date: new Date(),
            ...courseLandingFormData,
            students: [],
            curriculum: courseCurriculumFormData.filter(
                (item) => !isEmpty(item.title) && !isEmpty(item.videoUrl)
            ),
            isPublished: true,
        };

        // Remove filename from payload if present
        delete courseFinalFormData.filename;

        try {
            const response = currentEditedCourseId 
                ? await updateCourseByIdService(currentEditedCourseId, courseFinalFormData)
                : await addNewCourseListService(courseFinalFormData);

            if (response?.success) {
                setCourseLandingFormData(courseLandingInitialFormData);
                setCourseCurriculumFormData(courseCurriculumInitialFormData);
                navigate(-1);
                toast.success(response.message);
            } else {
                toast.error("Failed to create course");
            }
        } catch (error) {
            toast.error("An error occurred while creating the course");
            console.error(error);
        }
    }

    useEffect(() => {
        let isMounted = true;

        async function fetchInstructorCourseDetails() {
            setFetchingData(true);
            const response = await fetchInstructorCourseDetailsService(currentEditedCourseId);
            if (isMounted && response?.success) {
                const { filename, ...cleanData } = response.data;
                const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc, key) => {
                    acc[key] = cleanData[key] || courseLandingInitialFormData[key];
                    return acc;
                }, {});
                setCourseLandingFormData(setCourseFormData);
                setCourseCurriculumFormData(cleanData?.curriculum || []);
            }
            setFetchingData(false);
        }

        currentEditedCourseId ? fetchInstructorCourseDetails() : setFetchingData(false);
        return () => { isMounted = false; };
    }, [currentEditedCourseId]);

    useEffect(() => {
        if (params?.courseId) setCurrentEditedCourseId(params.courseId);
    }, [params?.courseId]);

    if (fetchingData) return <Loading />;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-extrabold mb-5">Create a new course</h1>
                <Button
                    disabled={!validatedFormData()}
                    className="text-sm tracking-wider font-bold px-8"
                    onClick={handleCreateCourse}
                >
                    SUBMIT
                </Button>
            </div>
            <Card>
                <CardContent>
                    <div className="container mx-auto p-4">
                        <Tabs defaultValue="curriculum" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                                <TabsTrigger value="course-landing-page">Course Landing Page</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="curriculum">
                                <CourseCurriculum />
                            </TabsContent>
                            <TabsContent value="course-landing-page">
                                <CourseLanding />
                            </TabsContent>
                            <TabsContent value="settings">
                                <CourseSettings />
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddNewCoursePage;