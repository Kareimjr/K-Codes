const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Unique filename with extension
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    'favicon': ['image/x-icon','image/png', 'image/jpeg', 'image/svg+xml'],
    'logo': ['image/png', 'image/jpeg', 'image/svg+xml'],
    'footerLogo': ['image/png', 'image/jpeg', 'image/svg+xml'],
    'heroMedia': ['image/png', 'image/jpeg', 'video/mp4', 'video/quicktime']
  };

  const fieldName = file.fieldname;
  const isValid = allowedTypes[fieldName]?.includes(file.mimetype);

  if (isValid) {
    cb(null, true); // Accept file
  } else {
    cb(new Error(`Invalid file type for ${fieldName}`), false); // Reject file with error
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // Limit file size to 50MB
  }
});

module.exports = upload;
