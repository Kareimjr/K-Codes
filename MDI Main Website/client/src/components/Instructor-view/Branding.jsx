// src/components/BrandingSettings.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useBranding } from '@/context/BrandingContext';
import { Button } from '@/components/ui/button';
import { mediaDeleteServices } from '@/services';

function BrandingSettings() {
  const { brandingData, setBrandingData, saveBranding } = useBranding();
  const [localFiles, setLocalFiles] = useState({
    favicon: null,
    logo: null,
    footerLogo: null,
    heroMedia: null,
  });
  // New state to track deleted fields (e.g., 'favicon', 'logo', etc.)
  const [deletedFields, setDeletedFields] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingType, setDeletingType] = useState(null);

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const handleDelete = async (type) => {
    // If the file is only in local state (i.e. not saved yet), just clear it.
    if (localFiles[type]) {
      setLocalFiles((prev) => ({ ...prev, [type]: null }));
      return;
    }
    // If the file exists in persisted brandingData:
    if (brandingData?.[type]) {
      setDeletingType(type);
      try {
        // Delete the file from your local storage (using its filename)
        await mediaDeleteServices(brandingData[type].filename);
        // Mark the field as deleted locally so that:
        //   1. The UI stops showing the file.
        //   2. You can later inform the backend of the deletion.
        setDeletedFields((prev) => [...prev, type]);
        // Also update brandingData locally.
        setBrandingData((prev) => ({ ...prev, [type]: null }));
        toast.success(`${capitalize(type)} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting ${type}:`, error);
        toast.error(`Failed to delete the ${capitalize(type)}`);
      } finally {
        setDeletingType(null);
      }
    }
  };

  // Adjust getPreview so that if a field is marked as deleted, no preview is shown.
  const getPreview = (type) => {
    if (deletedFields.includes(type)) return null;
    return localFiles[type]?.preview || brandingData?.[type]?.url;
  };

  const getButtonLabel = (type) => {
    return (brandingData?.[type] || localFiles[type])
      ? `Replace ${capitalize(type)}`
      : `Upload ${capitalize(type)}`;
  };

  /**
   * Updated file upload handler.
   * If a file already exists (persisted in brandingData), it first triggers deletion.
   * Then it sets the newly selected file into local state.
   */
  const handleFileUpload = async (type, file) => {
    if (!file) return;

    // If there's an existing persisted file and not already a new local file, delete it.
    if (brandingData?.[type] && !localFiles[type]) {
      try {
        await mediaDeleteServices(brandingData[type].filename);
        setBrandingData((prev) => ({ ...prev, [type]: null }));
        toast.success(`${capitalize(type)} replaced successfully`);
      } catch (error) {
        console.error(`Error replacing ${type}:`, error);
        toast.error(`Failed to replace the ${capitalize(type)}`);
        // Optionally, you can return early here if deletion is mandatory before replacing.
        return;
      }
    }

    // Create a preview URL for the new file.
    const preview = URL.createObjectURL(file);
    setLocalFiles((prev) => ({
      ...prev,
      [type]: { file, preview },
    }));

    console.log(preview, "preview URL");
    
    // Remove the field from deletedFields if it was there.
    setDeletedFields((prev) => prev.filter((item) => item !== type));
  };
  

  const handleSave = async () => {
    setIsSaving(true);
    const formData = new FormData();

    // Append new files (if any)
    Object.entries(localFiles).forEach(([key, value]) => {
      if (value?.file) formData.append(key, value.file);
    });

    // Append deletion information, if any fields were deleted.
    if (deletedFields.length > 0) {
      formData.append('deletedFields', JSON.stringify(deletedFields));
    }
    
    // Call your save endpoint with the combined data.
    const success = await saveBranding(formData);
    if (success) {
      setLocalFiles({
        favicon: null,
        logo: null,
        footerLogo: null,
        heroMedia: null,
      });
      setDeletedFields([]);
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-8">
      {['favicon', 'logo', 'heroMedia', 'footerLogo'].map((type) => (
        <div key={type} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{capitalize(type)}</h3>
          <div className="flex items-center gap-4">
            {getPreview(type) && (
              type === 'heroMedia' && localFiles.heroMedia?.mediaType === 'video' ? (
                <video src={getPreview(type)} controls className="w-24 h-24 object-contain" />
              ) : (
                <img src={getPreview(type)} alt={`${capitalize(type)} Preview`} className="w-24 h-24 object-contain" />
              )
            )}
            <FileUploadInput
              id={type}
              accept={type === 'heroMedia' ? 'image/*,video/*' : 'image/*'}
              label={getButtonLabel(type)}
              onChange={(e) => handleFileUpload(type, e.target.files[0])}
            />
            {(brandingData?.[type] || localFiles[type]) && (
              <Button
                variant="destructive"
                onClick={() => handleDelete(type)}
                disabled={deletingType === type}
              >
                {deletingType === type ? 'Deleting...' : `Delete ${capitalize(type)}`}
              </Button>
            )}
          </div>
        </div>
      ))}

      <Button onClick={handleSave} className="mt-6" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Branding Settings'}
      </Button>
    </div>
  );
}

const FileUploadInput = ({ id, accept, onChange, label }) => (
  <>
    <input type="file" id={id} accept={accept} onChange={onChange} className="hidden" />
    <label htmlFor={id} className="cursor-pointer bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
      {label}
    </label>
  </>
);

export default BrandingSettings;
