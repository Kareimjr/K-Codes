// src/components/Instructor-view/AddNewCourse/courseCurriculum.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VimeoPlayer from "@/components/VimeoPlayer";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/InstructorContext";
import { useContext } from "react";

function CourseCurriculum() {
  const { courseCurriculumFormData, setCourseCurriculumFormData } = useContext(InstructorContext);

  // Check if the last lecture is incomplete (i.e., title or videoUrl is empty)
  const lastLecture = courseCurriculumFormData[courseCurriculumFormData.length - 1];
  const isLastLectureIncomplete =
    lastLecture && (!lastLecture.title.trim() || !lastLecture.videoUrl.trim());

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      { ...courseCurriculumInitialFormData[0] },
    ]);
  }

  function handleCourseTitleChange(event, index) {
    const updated = [...courseCurriculumFormData];
    updated[index].title = event.target.value;
    setCourseCurriculumFormData(updated);
  }

  function handleFreePreviewChange(checked, index) {
    const updated = [...courseCurriculumFormData];
    updated[index].freePreview = checked;
    setCourseCurriculumFormData(updated);
  }

  function handleVideoUrlChange(event, index) {
    const updated = [...courseCurriculumFormData];
    updated[index].videoUrl = event.target.value;
    setCourseCurriculumFormData(updated);
  }

  function handleReplaceVideo(index) {
    const updated = [...courseCurriculumFormData];
    updated[index].videoUrl = "";
    setCourseCurriculumFormData(updated);
  }

  function handleDeleteLecture(index) {
    const updated = courseCurriculumFormData.filter((_, i) => i !== index);
    setCourseCurriculumFormData(updated);
  }

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every(
      (item) =>
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
    );
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Create Course Curriculum</CardTitle>
          {/* Disable Add Lecture button if the last lecture is incomplete */}
          <Button onClick={handleNewLecture} disabled={isLastLectureIncomplete}>
            Add Lecture
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mt-4 space-y-4">
            {courseCurriculumFormData.map((item, index) => (
              <div className="border p-5 rounded-md" key={index}>
                <div className="flex gap-5 items-center">
                  <h3 className="font-semibold">Lecture {index + 1}</h3>
                  <Input
                    name="title"
                    placeholder="Enter lecture title"
                    className="max-w-96"
                    onChange={(e) => handleCourseTitleChange(e, index)}
                    value={item.title}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                      checked={item.freePreview}
                      id={`freePreview-${index + 1}`}
                    />
                    <Label htmlFor={`freePreview-${index + 1}`}>Free Preview</Label>
                  </div>
                </div>
                <div className="mt-6">
                  {item.videoUrl ? (
                    <div className="flex gap-3 items-center">
                      {/* <VimeoPlayer
                        url={item.videoUrl}
                        width="225px"
                        height="100px"
                        courseTitle={item.title}
                      /> */}
                      <Button onClick={() => handleReplaceVideo(index)}>Replace Video</Button>
                      <Button onClick={() => handleDeleteLecture(index)} className="bg-red-900">
                        Delete Lecture
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Label>Paste Vimeo Video Link</Label>
                      <Input
                        type="text"
                        placeholder="Enter Vimeo video URL"
                        onChange={(e) => handleVideoUrlChange(e, index)}
                        value={item.videoUrl}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseCurriculum;
