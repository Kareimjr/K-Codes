// controllers/branding.controller.js
const path = require('path');
const fs = require('fs');
const Branding = require('../models/brandingModel.js');

/**
 * Helper function that moves an uploaded file from Multer's temporary folder
 * to a permanent location (e.g., public/uploads) and returns an object with the generated URL.
 *
 * @param {Object} file - The file object provided by Multer.
 * @param {Array} allowedTypes - List of allowed MIME types.
 * @returns {Object|null} - Object with { url, mimetype, filename } or null if no file.
 */
const handleFileUpload = async (file, allowedTypes) => {
  if (!file) return null;
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type');
  }

  // Define the permanent uploads directory (adjust the path as needed)
  const uploadsDir = path.join(__dirname, '../public/uploads');
  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Generate a unique filename using the current timestamp and the original file extension.
  const ext = path.extname(file.originalname);
  const filename = `${Date.now()}-${file.filename}${ext}`;
  const destPath = path.join(uploadsDir, filename);

  // Move the file from Multer's temporary folder to the permanent location.
  fs.renameSync(file.path, destPath);

  // Build the URL for accessing this file.
  // Ensure that your Express app serves the "public" folder as static.
  const backendUrl = process.env.BACKEND_URL;
  return {
    url: `${backendUrl}/uploads/${filename}`,
    mimetype: file.mimetype,
    filename, // used for future deletions in place of Cloudinary's public_id
  };
};

/**
 * Controller to update branding information.
 * Processes each file upload and saves the returned URL, mimetype, and filename in the database.
 * Also processes deletion information to set fields to null.
 */
const updateBranding = async (req, res) => {
  try {
    const files = req.files;
    // Prepare the branding data object to be updated.
    const brandingData = {};

    // Process file uploads.
    if (files?.favicon) {
      brandingData.favicon = await handleFileUpload(
        files.favicon[0],
        ['image/x-icon', 'image/png', 'image/jpeg', 'image/svg+xml']
      );
    }
    if (files?.logo) {
      brandingData.logo = await handleFileUpload(
        files.logo[0],
        ['image/png', 'image/jpeg', 'image/svg+xml']
      );
    }
    if (files?.footerLogo) {
      brandingData.footerLogo = await handleFileUpload(
        files.footerLogo[0],
        ['image/png', 'image/jpeg', 'image/svg+xml']
      );
    }
    if (files?.heroMedia) {
      const file = files.heroMedia[0];
      const mediaType = file.mimetype.startsWith('video/') ? 'video' : 'image';
      brandingData.heroMedia = {
        ...(await handleFileUpload(
          file,
          ['image/png', 'image/jpeg', 'video/mp4', 'video/quicktime']
        )),
        mediaType,
      };
    }

    // Process deletion information.
    if (req.body.deletedFields) {
      let deletedFields = [];
      try {
        deletedFields = JSON.parse(req.body.deletedFields);
      } catch (error) {
        console.error('Error parsing deletedFields:', error);
      }
      if (Array.isArray(deletedFields)) {
        deletedFields.forEach((field) => {
          if (!(files && files[field])) {
            brandingData[field] = null;
          }
        });
      }
    }

    // Update or create the global Branding document.
    const updatedBranding = await Branding.findOneAndUpdate(
      {},
      brandingData,
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      branding: updatedBranding,
    });
  } catch (error) {
    console.error('Branding update error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating branding',
    });
  }
};

/**
 * Controller to get branding data.
 * Returns a single global branding record. If none exists, creates a default record.
 */
const getBranding = async (req, res) => {
  try {
    let branding = await Branding.findOne({});
    if (!branding) {
      branding = new Branding({
        favicon: null,
        logo: null,
        footerLogo: null,
        heroMedia: null,
      });
      await branding.save();
    }
    res.json({ success: true, branding });
  } catch (error) {
    console.error("Error fetching branding:", error);
    res.status(500).json({ success: false, message: 'Error fetching branding' });
  }
};

/**
 * Controller factory to delete a specific branding asset.
 * Deletes the asset from local storage (using fs) and unsets the field in the database.
 *
 * @param {string} assetType - The key of the asset to delete (e.g., 'favicon', 'logo', etc.).
 */
const deleteBrandingAsset = (assetType) => async (req, res) => {
  try {
    // Find the global branding record.
    const branding = await Branding.findOne({});
    if (!branding?.[assetType]?.filename) {
      return res.status(404).json({
        success: false,
        message: `${assetType} not found`
      });
    }

    // Construct the file path.
    const filePath = path.join(__dirname, '../public/uploads', branding[assetType].filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove the asset from the database by unsetting its field.
    const updated = await Branding.findOneAndUpdate(
      {},
      { $unset: { [assetType]: 1 } },
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { handleFileUpload, updateBranding, getBranding, deleteBrandingAsset };
