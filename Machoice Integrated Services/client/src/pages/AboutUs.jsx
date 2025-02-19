// About.jsx
import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { Users, Leaf, Trophy, HeartHandshake, FlaskConical, BadgeCheck, CheckCircle } from 'lucide-react';
import { assets } from '../assets/asset';

const AboutUs = () => {
  const revealRef = useReveal({ threshold: 0.2 });

  const team = [
    {
      name: "Maryam Atolagbe",
      role: "Founder & CEO",
      bio: "Pioneer in sustainable cleaning solutions with 12+ years in chemical engineering",
      img: assets.ceo
    },
    {
      name: "Awoyemi Saheed",
      role: "Accountant",
      img: assets.avatar
    },
    {
      name: "Mansurah Abiola",
      role: "Business Development Manager",
      img: assets.avatar
    },
    {
      name: "Feyi Ogunrotimi",
      role: "Production Assistant",
      img: assets.avatar
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-r from-[#6A3917] to-[#A67C52] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">Serving Nigerian homes and businesses with care since 2015</p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('/texture.svg')] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Our Story */}
      <section ref={revealRef} className="py-20 px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Story</h2>
            <div className="space-y-6">
              <p className="text-gray-600 justify leading-relaxed">
                Machoice Nigeria began with a simple mission: to provide a safer, more effective dishwashing liquid that everyone can trust. Since our start, we’ve grown into a trusted household brand, serving over 1,800 end-users, 40 retail shops, and 23 wholesalers. We continue to innovate, driven by the needs of Nigerian households and businesses.
              </p>
              <div className="grid grid-cols-3 gap-2 md:gap-6 mt-8">
                <div className="text-center items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#6A3917]">1,800+</div>
                  <div className="text-sm text-gray-500">Daily Users</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#A67C52]">40</div>
                  <div className="text-sm text-gray-500">Business Partners</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-600">10</div>
                  <div className="text-sm text-gray-500">States Covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-2 sm:px-6 lg:px-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1 bg-gradient-to-br from-[#F5E8DF] to-[#E9D8C7] p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-[#6A3917]">Our Compass</h3>
            <p className="text-gray-600 mb-8">Guiding every decision we make</p>
            <HeartHandshake className="w-16 h-16 text-[#6A3917] mb-6 mx-auto" />
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Core Values</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700">
                <BadgeCheck className="w-5 h-5 text-[#6A3917] mr-3" />
                Innovation: Constantly improving our products to meet the needs of Nigerian consumers.
              </li>
              <li className="flex items-center text-gray-700">
                <Leaf className="w-5 h-5 text-[#6A3917] mr-3" />
                Customer Satisfaction: Ensuring every drop delivers on our promise of quality.
              </li>
              <li className="flex items-center text-gray-700">
                <FlaskConical className="w-5 h-5 text-[#6A3917] mr-3" />
                Sustainability: Reducing plastic waste with refills and promoting eco-friendly habits.
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Mission</h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <p className="text-gray-700 leading-relaxed">
                  At Machoice, our mission is to provide high-quality dishwashing liquids that deliver excellent cleaning power, protect against skin irritation, and help reduce plastic waste. We believe in sustainable practices that support both our customers and the planet.
                </p>
                <div className="mt-8 bg-[#F5E8DF] p-6 rounded-xl">
                  <h3 className="text-2xl font-semibold mb-4 text-[#6A3917]">Why Choose Us?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <Leaf className="w-6 h-6 text-[#6A3917] mr-3 mt-1" />
                      <p className="text-gray-700">Eco-effective solutions for a cleaner planet.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-[#6A3917] mr-3 mt-1" />
                      <p className="text-gray-700">Formulated to be safe and allergen-free.</p>
                    </div>
                    <div className="flex items-start">
                      <Trophy className="w-6 h-6 text-[#6A3917] mr-3 mt-1" />
                      <p className="text-gray-700">Trusted by thousands of Nigerian households.</p>
                    </div>
                    <div className="flex items-start">
                      <Users className="w-6 h-6 text-[#6A3917] mr-3 mt-1" />
                      <p className="text-gray-700">Supporting local businesses and communities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group">
                <img src={member.img} alt={member.name} className="w-full h-72 object-cover transition transform group-hover:scale-105" />
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                  <p className="text-[#6A3917] mb-4 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;