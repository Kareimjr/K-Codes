// src/pages/ProductDetails.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useReveal } from '../hooks/useReveal';
import { products } from '../data/products';
import { ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const revealRef = useReveal({ threshold: 0.2 });
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="pt-16 max-w-7xl mx-auto px-4 text-center text-gray-600">Product not found.</div>;

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen pt-16 px-4">
      <section ref={revealRef} className="py-12 max-w-7xl mx-auto px-2 sm:px-6 lg:px-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full sm:h-[500px] object-contain rounded-xl transition transform"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:mt-6 font-extrabold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-[#6A3917]">₦ {product.price.toLocaleString()}</p>

            {product.description && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#6A3917]">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="flex items-center gap-6 py-4 border-t border-gray-200">
              <label className="text-lg font-medium text-gray-800">Quantity:</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-4 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-[#6A3917] focus:border-transparent outline-none transition"
              />
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="w-full md:w-64 py-3 px-6 bg-gradient-to-r from-[#6A3917] to-[#A67C52] hover:from-[#5A2F13] hover:to-[#935F3B] text-white text-lg font-medium rounded-lg transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg cursor-pointer"
            >
              Add to Cart 
              <ShoppingCart className="w-5 h-5" />
            </button>

            {product.details && (
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-semibold text-[#6A3917]">Product Details</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="transition hover:text-gray-800">{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;