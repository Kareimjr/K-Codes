// /src/context/BrandingContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const BrandingContext = createContext();

export const BrandingProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [brandingData, setBrandingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const processAsset = (asset) => {
    if (!asset) return null;
    return {
      url: asset.url || asset.secure_url || `${backendUrl}/${asset.path}`,
      publicId: asset.public_id,
      mimetype: asset.mimetype,
      ...asset,
    };
  };

  const fetchBranding = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/branding`);
      if (data.success) {
        setBrandingData({
          favicon: processAsset(data.branding.favicon),
          logo: processAsset(data.branding.logo),
          footerLogo: processAsset(data.branding.footerLogo),
          heroMedia: data.branding.heroMedia
            ? {
                ...processAsset(data.branding.heroMedia),
                mediaType: data.branding.heroMedia.mediaType,
              }
            : null,
        });
      } else {
        toast.error('Failed to load branding settings');
        setBrandingData(null);
      }
    } catch (error) {
      console.error("Error fetching branding data:", error);
      toast.error('Failed to load branding settings');
      setBrandingData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBranding = async (formData) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/branding`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (data.success) {
        fetchBranding();
        toast.success('Branding settings saved');
        return true;
      } else {
        toast.error('Error saving branding');
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving branding');
      return false;
    }
  };

  const deleteBrandingFile = async (field) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/branding`,
        { [field]: null },
        { withCredentials: true }
      );
      if (data.success) {
        fetchBranding();
        return true;
      } else {
        toast.error(`Failed to update ${field} deletion in database`);
        return false;
      }
    } catch (error) {
      console.error(`Error updating branding for deletion of ${field}:`, error);
      toast.error(`Error updating ${field} deletion in database`);
      return false;
    }
  };

  useEffect(() => {
    fetchBranding();
  }, []);

  const value = {
    brandingData,
    setBrandingData,
    isLoading,
    setIsLoading,
    fetchBranding,
    saveBranding,
    deleteBrandingFile,
  };

  return (
    <BrandingContext.Provider value={value}>
      {props.children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => useContext(BrandingContext);
