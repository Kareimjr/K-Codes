// src/pages/Home.js
import React from 'react';
import Slider from '../components/Slider';
import { sliderData } from '../data/sliderData';
import { useReveal } from '../hooks/useReveal';
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';
import ProductCard from '../components/ProductCard';
import { Leaf, ShieldCheck, Truck } from 'lucide-react';

const Home = () => {
  const revealRef = useReveal({ threshold: 0.2 });

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="w-full">
        <Slider slides={sliderData} />
      </section>

      {/* Featured Products */}
      <section className="md:mt-20 py-16 px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-3xl font-bold mb-1 text-gray-900">Our Best Sellers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of households and businesses nationwide.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Unique Selling Propositions (USP) Section */}
      <section className="py-16 bg-[#F5E8DF] px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <Truck className="w-12 h-12 mx-auto text-[#6A3917] mb-4" />
              <h3 className="text-xl font-bold mb-2 text-[#6A3917]">Free Shipping</h3>
              <p className="text-gray-600">On all orders over ₦50,000</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <ShieldCheck className="w-12 h-12 mx-auto text-[#6A3917] mb-4" />
              <h3 className="text-xl font-bold mb-2 text-[#6A3917]">Quality Guaranteed</h3>
              <p className="text-gray-600">100% satisfaction</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <Leaf className="w-12 h-12 mx-auto text-[#6A3917] mb-4" />
              <h3 className="text-xl font-bold mb-2 text-[#6A3917]">Eco-Friendly</h3>
              <p className="text-gray-600">Biodegradable & non-toxic formulas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-2 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-900">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic my-4">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;