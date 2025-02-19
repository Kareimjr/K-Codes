// src/pages/Products.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ShoppingCart, Search, Filter, ChevronDown } from 'lucide-react';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const revealRef = useReveal({ threshold: 0.2 });
  const { addToCart } = useCart();

  // Get unique categories, ensuring no undefined/null values
  const categories = ['all', ...new Set(products.map(product => product.category || 'uncategorized'))];

  // Process products
  let processedProducts = [...products]
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || (product.category || 'uncategorized') === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch(sortOption) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'name_asc': return a.name.localeCompare(b.name);
        case 'name_desc': return b.name.localeCompare(a.name);
        default: return 0;
      }
    });

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 drop-shadow-md">Our Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover high-quality, sustainable cleaning solutions for your home and business.</p>
        </section>

        {/* Controls Section */}
        <section ref={revealRef} className="space-y-8 p-4 px-2 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-[#6A3917] focus:border-transparent transition shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <select 
                  className="appearance-none px-4 py-3 border border-gray-300 rounded-xl shadow-md outline-none hover:shadow-lg transition focus:ring-2 focus:ring-[#6A3917]"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Sort By</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A-Z</option>
                  <option value="name_desc">Name: Z-A</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-6 lg:px-10">
          {processedProducts.length > 0 ? (
            processedProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover transition transform group-hover:scale-105"
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-lg font-semibold text-[#6A3917]">₦{product.price.toLocaleString()}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/products/${product.id}`}
                      className="w-full text-center py-3 px-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full text-center py-3 px-3 bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white rounded-lg hover:from-[#5A2F13] hover:to-[#935F3B] transition font-base flex items-center justify-center gap-2  cursor-pointer"
                    >
                      Add to Cart
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No products found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;