import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-2xl rounded-xl overflow-hidden transition">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-30 object-cover" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-[#6A3917] text-sm font-semibold">{product.name}</h3>
        <p className="text-gray-500 text-xs">{product.description}</p>
        <p className="text-lg font-bold text-[#6A3917] mt-2">₦ {product.price}</p>
        <Link to={`/products/${product.id}`} className="block mt-4 bg-[#6A3917] text-white py-2 px-4 rounded-md hover:bg-[#44362d] transition">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;