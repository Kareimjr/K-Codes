// src/components/CourseSettings.jsx
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InstructorContext } from "@/context/InstructorContext";
import { mediaUploadServices, mediaDeleteServices } from "@/services";
import { toast } from "react-toastify";
import { useContext } from "react";

function CourseSettings() {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        setMediaUploadProgress(true);

        // Delete current image if exists (using filename instead of public_id)
        if (courseLandingFormData?.filename) {
          const deleteResponse = await mediaDeleteServices(courseLandingFormData.filename);
          if (deleteResponse?.success) {
            toast.success("Image successfully deleted!");
          } else {
            toast.error("Failed to delete the previous image.");
          }
        }

        // Upload new image
        const uploadResponse = await mediaUploadServices(imageFormData, setMediaUploadProgressPercentage);
        if (uploadResponse.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: uploadResponse.data.url,
          });
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Image upload failed.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while uploading.");
      } finally {
        setMediaUploadProgress(false);
      }
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Course Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {courseLandingFormData?.image ? (
            <div className="flex flex-col gap-3">
              <img src={courseLandingFormData.image} alt="Course" className="w-full h-auto rounded-md" />
              <Label>Replace Course Image</Label>
              <Input onChange={handleImageUploadChange} type="file" accept="image/*" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Label>Upload Course Image</Label>
              <Input onChange={handleImageUploadChange} type="file" accept="image/*" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseSettings;
