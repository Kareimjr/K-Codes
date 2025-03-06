// models/brandingModel.js
const mongoose = require('mongoose');

const brandingSchema = new mongoose.Schema({
  favicon: {
    url: { type: String },
    mimetype: { type: String },
    filename: { type: String },
  },
  logo: {
    url: { type: String },
    mimetype: { type: String },
    filename: { type: String },
  },
  footerLogo: {
    url: { type: String },
    mimetype: { type: String },
    filename: { type: String },
  },
  heroMedia: {
    url: { type: String },
    mimetype: { type: String },
    filename: { type: String },
    mediaType: { type: String },
  },
  // Additional fields as needed...
});

module.exports = mongoose.model('Branding', brandingSchema);
