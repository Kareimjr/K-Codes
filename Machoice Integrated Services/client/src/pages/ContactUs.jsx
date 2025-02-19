// src/pages/ContactUs.js
import { useState, useRef } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    { icon: <FaFacebook />, url: '#' },
    { icon: <FaTwitter />, url: '#' },
    { icon: <FaInstagram />, url: '#' },
    { icon: <FaWhatsapp />, url: '#' }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, (error) => {
      alert('Failed to send message. Please try again.');
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-14 bg-gradient-to-b from-white to-gray-100">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="md:grid md:grid-cols-2">
          {/* Left Side - Contact Form */}
          <motion.div variants={itemVariants} className="p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6A3917] focus:border-transparent transition duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  name="user_email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6A3917] focus:border-transparent transition duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
                <textarea
                  value={formData.message}
                  name="message"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6A3917] focus:border-transparent transition duration-300 h-32"
                  required
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-[#5A2F13] hover:to-[#935F3B] transition duration-300"
              >
                <FaPaperPlane className="text-lg" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side - Contact Info */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-[#F5E8DF] to-[#E9D8C7] text-gray-800 p-8 md:p-12 lg:p-16 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6 text-[#6A3917]">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <span className="bg-[#6A3917]/20 p-2 rounded-lg">📞</span>
                  +234 000 000 000
                </p>
                <p className="flex items-center gap-3">
                  <span className="bg-[#6A3917]/20 p-2 rounded-lg">✉️</span>
                  info@machoice.com
                </p>
                <p className="flex items-center gap-3">
                  <span className="bg-[#6A3917]/20 p-2 rounded-lg">📍</span>
                  Ibeju-Lekki, Lagos
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-[#6A3917]">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="text-2xl p-2 rounded-full bg-[#6A3917]/20 hover:bg-[#6A3917]/40 transition duration-300"
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;