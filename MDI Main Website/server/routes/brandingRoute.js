// routes/brandingRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure Multer to temporarily store uploads in the "uploads" folder
const upload = multer({ dest: 'uploads/' });

// Import the branding controllers
const { updateBranding, getBranding, deleteBrandingAsset } = require('../controllers/brandingController');

// (Optional) Import your authentication middleware if you want to restrict updates.
// For example: const adminAuth = require('../middleware/adminAuth');

/**
 * @route   PUT /api/branding
 * @desc    Update global branding information (with file uploads)
 * @access  Restricted (if desired) - apply middleware like adminAuth if needed.
 */
router.put(
  '/',
  // adminAuth, // uncomment if needed
  upload.fields([
    { name: 'favicon', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'footerLogo', maxCount: 1 },
    { name: 'heroMedia', maxCount: 1 }
  ]),
  updateBranding
);

/**
 * @route   GET /api/branding
 * @desc    Get global branding information
 * @access  Public
 */
router.get('/', getBranding);

/**
 * @route   DELETE /api/branding/:assetType
 * @desc    Delete a specific branding asset (e.g. favicon, logo, footerLogo, or heroMedia)
 * @access  Restricted (if desired) - apply middleware if needed.
 */
router.delete('/:assetType', (req, res) => {
  const assetType = req.params.assetType;
  const allowedTypes = ['favicon', 'logo', 'footerLogo', 'heroMedia'];
  if (!allowedTypes.includes(assetType)) {
    return res.status(400).json({ success: false, message: 'Invalid asset type' });
  }
  // Invoke the deleteBrandingAsset controller factory.
  const deleteAsset = deleteBrandingAsset(assetType);
  deleteAsset(req, res);
});

module.exports = router;
