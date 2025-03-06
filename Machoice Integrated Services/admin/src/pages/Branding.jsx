// src/pages/Branding.js
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getBranding, updateBranding, deleteBrandingAsset } from '../services/services';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
};

const isVideoFile = (url) => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.includes('data:video') ||
    lower.endsWith('.mp4') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.avi')
  );
};

const Branding = () => {
  const [favicon, setFavicon] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [footerLogo, setFooterLogo] = useState(null);
  const [footerLogoFile, setFooterLogoFile] = useState(null);
  const [banners, setBanners] = useState([null, null, null, null, null]);
  const [bannerFiles, setBannerFiles] = useState([null, null, null, null, null]);
  const [mapLink, setMapLink] = useState('');

  const fetchBranding = async () => {
    try {
      const res = await getBranding();
      const data = res.data;
      if (data) {
        setFavicon(data.favicon || null);
        setLogo(data.logo || null);
        setFooterLogo(data.footerLogo || null);
        let loadedBanners = data.banners || [];
        while (loadedBanners.length < 5) {
          loadedBanners.push(null);
        }
        loadedBanners = loadedBanners.slice(0, 5);
        setBanners(loadedBanners);
        setMapLink(data.mapLink || '');
        setFaviconFile(null);
        setLogoFile(null);
        setFooterLogoFile(null);
        setBannerFiles([null, null, null, null, null]);
      }
    } catch (error) {
      console.error('Error fetching branding:', error);
    }
  };

  useEffect(() => {
    fetchBranding();
  }, []);

  const handleFileChange = (previewSetter, fileSetter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      fileSetter(file);
      const reader = new FileReader();
      reader.onloadend = () => previewSetter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const newBannerFiles = [...bannerFiles];
      newBannerFiles[index] = file;
      setBannerFiles(newBannerFiles);
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
    const newBannerFiles = [...bannerFiles];
    newBanners[index] = null;
    newBannerFiles[index] = null;
    setBanners(newBanners);
    setBannerFiles(newBannerFiles);
  };

  const handleDeleteAsset = async (asset, index = null) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this asset?',
      icon: 'warning',
      width: '320px',
      customClass: {
        popup: 'my-swal-popup'
      },
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (!result.isConfirmed) return;
    try {
      await deleteBrandingAsset(asset, index);
      if (asset === 'favicon') {
        setFavicon(null);
        setFaviconFile(null);
      } else if (asset === 'logo') {
        setLogo(null);
        setLogoFile(null);
      } else if (asset === 'footerLogo') {
        setFooterLogo(null);
        setFooterLogoFile(null);
      } else if (asset === 'banner') {
        removeBanner(index);
      }
      toast.success(`${asset} deleted successfully`);
    } catch (error) {
      toast.error(error.response?.data.message || 'Error deleting asset');
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (faviconFile) formData.append('favicon', faviconFile);
    if (logoFile) formData.append('logo', logoFile);
    if (footerLogoFile) formData.append('footerLogo', footerLogoFile);
    bannerFiles.forEach((file, index) => {
      if (file) {
        formData.append(`banner${index}`, file);
      }
    });
    formData.append('mapLink', mapLink);
    try {
      const res = await updateBranding(formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(res.data.message);
      fetchBranding();
    } catch (error) {
      toast.error(error.response?.data.message || 'Error updating branding');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#6A3917]">Branding</h2>
      <div className="space-y-8">
        {/* Favicon */}
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Favicon</label>
          <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center relative">
            <input type="file" accept="image/*" onChange={handleFileChange(setFavicon, setFaviconFile)} className="hidden" id="favicon" />
            <label htmlFor="favicon" className="cursor-pointer block text-[#6A3917] hover:text-[#5A2F13]">
              {favicon ? (
                <img src={getImageUrl(favicon)} alt="Favicon" className="w-16 h-16 object-cover mx-auto rounded" />
              ) : (
                <span>Upload Favicon</span>
              )}
            </label>
            {favicon && (
              <button onClick={() => handleDeleteAsset('favicon')} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Logo</label>
          <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center relative">
            <input type="file" accept="image/*" onChange={handleFileChange(setLogo, setLogoFile)} className="hidden" id="logo" />
            <label htmlFor="logo" className="cursor-pointer block text-[#6A3917] hover:text-[#5A2F13]">
              {logo ? (
                <img src={getImageUrl(logo)} alt="Logo" className="w-32 h-32 object-cover mx-auto rounded" />
              ) : (
                <span>Upload Logo</span>
              )}
            </label>
            {logo && (
              <button onClick={() => handleDeleteAsset('logo')} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Footer Logo */}
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Footer Logo</label>
          <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center relative">
            <input type="file" accept="image/*" onChange={handleFileChange(setFooterLogo, setFooterLogoFile)} className="hidden" id="footer-logo" />
            <label htmlFor="footer-logo" className="cursor-pointer block text-[#6A3917] hover:text-[#5A2F13]">
              {footerLogo ? (
                <img src={getImageUrl(footerLogo)} alt="Footer Logo" className="w-32 h-32 object-cover mx-auto rounded" />
              ) : (
                <span>Upload Footer Logo</span>
              )}
            </label>
            {footerLogo && (
              <button onClick={() => handleDeleteAsset('footerLogo')} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Banners */}
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Banners (Max 5)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {banners.map((banner, index) => (
              <div key={index} className="relative">
                <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center h-32 flex items-center justify-center">
                  <input type="file" accept="image/*,video/*" onChange={handleBannerChange(index)} className="hidden" id={`banner-${index}`} />
                  <label htmlFor={`banner-${index}`} className="cursor-pointer text-[#6A3917] hover:text-[#5A2F13] w-full h-full flex items-center justify-center">
                    {banner ? (
                      isVideoFile(banner) ? (
                        <video src={getImageUrl(banner)} controls className="w-full h-full object-cover rounded" />
                      ) : (
                        <img src={getImageUrl(banner)} alt={`Banner ${index + 1}`} className="w-full h-full object-cover rounded" />
                      )
                    ) : (
                      <span>Upload Banner</span>
                    )}
                  </label>
                </div>
                {banner && (
                  <button onClick={() => handleDeleteAsset('banner', index)} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    Delete
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

      <div className="mt-6">
        <button onClick={handleSave} className="w-full bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-3 rounded-lg hover:from-[#5A2F13] hover:to-[#935F3B] transition">
          Save Branding
        </button>
      </div>
    </div>
  );
};

export default Branding;
