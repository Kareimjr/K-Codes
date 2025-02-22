// src/pages/admin/Branding.js
import React, { useState } from 'react';
import { X } from 'lucide-react';

const Branding = () => {
  const [favicon, setFavicon] = useState(null);
  const [logo, setLogo] = useState(null);
  const [footerLogo, setFooterLogo] = useState(null);
  const [banners, setBanners] = useState([null, null, null, null, null]);
  const [mapLink, setMapLink] = useState('');

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newBanners = [...banners];
        newBanners[index] = reader.result;
        setBanners(newBanners);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBanner = (index) => {
    const newBanners = [...banners];
    newBanners[index] = null;
    setBanners(newBanners);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#6A3917]">Branding</h2>
      <div className="space-y-8">
        {/* Favicon */}
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Favicon</label>
          <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange(setFavicon)}
              className="hidden"
              id="favicon"
            />
            <label htmlFor="favicon" className="cursor-pointer text-[#6A3917] hover:text-[#5A2F13]">
              {favicon ? (
                <img src={favicon} alt="Favicon" className="w-16 h-16 object-cover mx-auto rounded" />
              ) : (
                <span>Upload Favicon</span>
              )}
            </label>
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Logo</label>
          <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange(setLogo)}
              className="hidden"
              id="logo"
            />
            <label htmlFor="logo" className="cursor-pointer text-[#6A3917] hover:text-[#5A2F13]">
              {logo ? (
                <img src={logo} alt="Logo" className="w-32 h-32 object-cover mx-auto rounded" />
              ) : (
                <span>Upload Logo</span>
              )}
            </label>
          </div>
        </div>

        {/* Footer Logo */}
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Footer Logo</label>
          <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange(setFooterLogo)}
              className="hidden"
              id="footer-logo"
            />
            <label htmlFor="footer-logo" className="cursor-pointer text-[#6A3917] hover:text-[#5A2F13]">
              {footerLogo ? (
                <img src={footerLogo} alt="Footer Logo" className="w-32 h-32 object-cover mx-auto rounded" />
              ) : (
                <span>Upload Footer Logo</span>
              )}
            </label>
          </div>
        </div>

        {/* Banners */}
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Banners (Max 5)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {banners.map((banner, index) => (
              <div key={index} className="relative">
                <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleBannerChange(index)}
                    className="hidden"
                    id={`banner-${index}`}
                  />
                  <label htmlFor={`banner-${index}`} className="cursor-pointer text-[#6A3917] hover:text-[#5A2F13]">
                    {banner ? (
                      <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-32 object-cover rounded" />
                    ) : (
                      <span>Upload Banner</span>
                    )}
                  </label>
                </div>
                {banner && (
                  <button
                    onClick={() => removeBanner(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Google Map Embed Link */}
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Google Map Embed Link</label>
          <input
            type="text"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            placeholder="Paste your Google Map embed link here"
          />
        </div>
      </div>
    </div>
  );
};

export default Branding;