// src/pages/Services.js
import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { Beaker, Factory, ShieldCheck, Leaf, Truck, TestTube2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const revealRef = useReveal({ threshold: 0.2 });

  const services = [
    {
      icon: <Beaker className="w-8 h-8" />,
      title: "Custom Formulation",
      description: "Tailored cleaning solutions for specific needs",
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Bulk Manufacturing",
      description: "Large-scale production capabilities",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Rigorous quality control measures",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Eco Solutions",
      description: "Sustainable cleaning alternatives",
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-r from-[#6A3917] to-[#A67C52] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">Comprehensive cleaning solutions for households, industries, and commercial enterprises</p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('/texture.svg')] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Main Services */}
      <section ref={revealRef} className="py-20 px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
                <div className="text-[#6A3917] mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 px-2 items-end sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-gray-900">Specialized Services</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <TestTube2 className="w-6 h-6 text-[#6A3917] mr-4 mt-1"/>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Product Testing & Certification</h3>
                    <p className="text-gray-600">Comprehensive laboratory testing for safety, efficacy, and environmental compliance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Truck className="w-6 h-6 text-[#6A3917] mr-4 mt-1"/>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Nationwide Distribution</h3>
                    <p className="text-gray-600">Reliable logistics network covering all 36 states with temperature-controlled transport</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Factory className="w-6 h-6 text-[#6A3917] mr-4 mt-1"/>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">OEM Manufacturing</h3>
                    <p className="text-gray-600">Private label production with custom branding and packaging solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Eco-Top-Up Section */}
      <section className="py-20 bg-[#F5E8DF] px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2 text-gray-900 text-center">Eco-Top-Up</h2>
          <p className="text-xl text-gray-600 mb-8 text-center">"Refill. Reuse. Reduce Waste."</p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-[#6A3917]">Our Eco-Top-Up Stations</h3>
              <p className="text-gray-600 mb-6">Our Eco-Top-Up Stations make sustainable dishwashing solutions accessible and affordable for everyone. By refilling your bottles instead of buying new ones, you help reduce plastic waste and enjoy your favorite Machoice dishwashing liquid at a lower price.</p>
              <ul className="space-y-4">
                <li className="flex items-center"><Leaf className="w-5 h-5 text-[#6A3917] mr-2"/> Affordable refills at reduced costs.</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#6A3917] mr-2"/> Same high-quality, skin-safe formula.</li>
                <li className="flex items-center"><Truck className="w-5 h-5 text-[#6A3917] mr-2"/> Convenient locations across Lagos.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">How Does It Work?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Truck className="w-12 h-12" />, title: "Bring Your Bottle", desc: "Bring any empty bottle, preferably your previous Machoice container." },
              { icon: <Beaker className="w-12 h-12" />, title: "Refill", desc: "Visit an Eco-Top-Up Station near you and refill with the same quality Machoice liquid at a discounted price." },
              { icon: <Leaf className="w-12 h-12" />, title: "Save More", desc: "Enjoy reduced costs while helping the environment by reusing your plastic bottles." }
            ].map((step, index) => (
              <div key={index} className="text-center p-6 bg-[#F5E8DF] rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="mb-4 text-[#6A3917]">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Eco-Top-Up Section */}
      <section className="py-20 bg-[#F5E8DF] px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">Why Refill?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#6A3917] mr-2"/> Affordable: Refills cost less than buying new bottles.</li>
                <li className="flex items-center"><Leaf className="w-5 h-5 text-[#6A3917] mr-2"/> Eco-Friendly: Helps reduce single-use plastics, saving up to 6,000 bottles every 6 months.</li>
                <li className="flex items-center"><Truck className="w-5 h-5 text-[#6A3917] mr-2"/> Convenient: Multiple refill stations across Lagos for easy access.</li>
                <li className="flex items-center"><ShieldCheck className="w-5 h-5 text-[#6A3917] mr-2"/> Skin-Safe: Same gentle, plant-based formula you trust.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Station Locations Section */}
      <section className="py-20 bg-white px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">Find an Eco-Top-Up Station Near You</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-600">Locate the nearest Eco-Top-Up Station and start saving today!</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#6A3917] mb-2">Operating Hours</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
                  <li>Saturday: 9:00 AM - 6:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
            {/* Placeholder for Google Map - Replace with actual Google Maps API or static map */}
            <div className="h-96 rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.120456789012!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c2a9aba0adb%3A0x46c9916c69d0f36b!2sIbeju-Lekki%2C%20Lagos!5e0!3m2!1sen!2sng!4v1698765432!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Eco-Top-Up Stations Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Partner With Us?</h2>
          <p className="text-xl mb-8">Whether you need custom formulations or bulk supply, our team is ready to assist</p>
          <div className="flex justify-center space-x-6">
            <Link to="/contact" className="bg-white text-[#6A3917] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Request Quote
            </Link>
            <Link to="/products" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;