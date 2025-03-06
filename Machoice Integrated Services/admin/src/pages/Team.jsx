import React, { useState, useEffect } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { getTeam, createTeam, updateTeam, deleteTeam } from '../services/services';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Use Vite environment variable (set VITE_API_BASE_URL in your .env)
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Helper to prepend backend URL if needed
const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
};

const Team = () => {
  const [team, setTeam] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  // formData holds the form fields; formData.image holds the preview (base64 string or URL)
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    role: '',
    bio: '',
    social: { instagram: '', x: '', facebook: '', linkedin: '' },
  });
  // teamImageFile stores the actual File object if a new image is selected
  const [teamImageFile, setTeamImageFile] = useState(null);

  // Fetch team members from backend
  const fetchTeam = async () => {
    try {
      const res = await getTeam();
      setTeam(res.data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Handle file selection and preview update
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeamImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle add/edit form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('role', formData.role);
      form.append('bio', formData.bio);
      form.append('social', JSON.stringify(formData.social));
      // If a new image file was selected, append it. Otherwise, no change.
      if (teamImageFile) {
        form.append('image', teamImageFile);
      }
      if (editId) {
        await updateTeam(editId, form);
        toast.success('Team member updated successfully');
      } else {
        await createTeam(form);
        toast.success('Team member added successfully');
      }
      // Reset the form
      setEditId(null);
      setFormData({
        name: '',
        image: null,
        role: '',
        bio: '',
        social: { instagram: '', x: '', facebook: '', linkedin: '' },
      });
      setTeamImageFile(null);
      setShowForm(false);
      fetchTeam();
    } catch (error) {
      toast.error(error.response?.data.message || 'Error saving team member');
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      image: getImageUrl(member.image), // Set preview to the full URL
      role: member.role,
      bio: member.bio,
      social: member.social || { instagram: '', x: '', facebook: '', linkedin: '' },
    });
    // Clear any previous file selection
    setTeamImageFile(null);
    setEditId(member._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this team member?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      width: "300px",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteTeam(id);
      toast.success("Team member deleted successfully");
      fetchTeam();
    } catch (error) {
      toast.error(error.response?.data.message || "Error deleting team member");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#6A3917]">Team</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-2 px-4 rounded-lg hover:from-[#5A2F13] hover:to-[#935F3B] transition"
          >
            Add New Team Member
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              name="image"
              id="team-image"
            />
            <label htmlFor="team-image" className="cursor-pointer text-[#6A3917] hover:text-[#5A2F13]">
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded" />
              ) : (
                <span>Upload Image</span>
              )}
            </label>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
          <textarea
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            rows="4"
            required
          />
          <input
            type="url"
            placeholder="Instagram URL"
            value={formData.social.instagram}
            onChange={(e) =>
              setFormData({ ...formData, social: { ...formData.social, instagram: e.target.value } })
            }
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
          />
          <input
            type="url"
            placeholder="X (Twitter) URL"
            value={formData.social.x}
            onChange={(e) =>
              setFormData({ ...formData, social: { ...formData.social, x: e.target.value } })
            }
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
          />
          <input
            type="url"
            placeholder="Facebook URL"
            value={formData.social.facebook}
            onChange={(e) =>
              setFormData({ ...formData, social: { ...formData.social, facebook: e.target.value } })
            }
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={formData.social.linkedin}
            onChange={(e) =>
              setFormData({ ...formData, social: { ...formData.social, linkedin: e.target.value } })
            }
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-2 rounded-lg hover:bg-[#5A2F13] transition"
            >
              {editId ? 'Update Team Member' : 'Add Team Member'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
                setFormData({
                  name: '',
                  image: null,
                  role: '',
                  bio: '',
                  social: { instagram: '', x: '', facebook: '', linkedin: '' },
                });
                setTeamImageFile(null);
              }}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {team.map((member) => (
          <div key={member._id} className="bg-[#F5E8DF] p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <img src={getImageUrl(member.image)} alt={member.name} className="w-16 h-16 object-cover rounded-full" />
              <div>
                <p className="text-[#6A3917] font-semibold">{member.name}</p>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{member.bio}</p>
            <div className="flex gap-4 mb-4">
              {member.social.instagram && (
                <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#6A3917] hover:text-[#5A2F13]">
                  <FaInstagram className="w-6 h-6" />
                </a>
              )}
              {member.social.x && (
                <a href={member.social.x} target="_blank" rel="noopener noreferrer" className="text-[#6A3917] hover:text-[#5A2F13]">
                  <FaTwitter className="w-6 h-6" />
                </a>
              )}
              {member.social.facebook && (
                <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[#6A3917] hover:text-[#5A2F13]">
                  <FaFacebook className="w-6 h-6" />
                </a>
              )}
              {member.social.linkedin && (
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#6A3917] hover:text-[#5A2F13]">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="flex-1 bg-[#6A3917] text-white py-2 rounded-lg hover:bg-[#5A2F13] transition"
              >
                <Edit className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                <Trash2 className="w-5 h-5 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;