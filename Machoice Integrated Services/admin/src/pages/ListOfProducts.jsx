import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

// Mock data (replace with database fetch)
const products = [
  { id: 1, name: 'Product 1', price: 1000, quantity: 50, image: '/product1.jpg' },
  { id: 2, name: 'Product 2', price: 2000, quantity: 30, image: '/product2.jpg' },
];

const ListOfProducts = () => {
  const handleEdit = (id) => {
    console.log('Edit product:', id);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    console.log('Delete product:', id);
    // Implement delete functionality
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
      <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-[#6A3917]">
        List of Products
      </h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-[#D7B9A5] rounded-lg p-4 bg-[#F5E8DF] shadow-sm relative" // Added 'relative' for positioning context
          >
            {/* Product Image - On the left, separate from icons */}
            <div>
              <div className="flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                />
              </div>
            </div>

            {/* Actions (Edit/Delete) - Positioned at top right using absolute positioning */}
            <div className="absolute top-3 right-3 flex space-x-2">
              <button
                onClick={() => handleEdit(product.id)}
                className="text-[#6A3917] hover:text-[#5A2F13] p-2"
              >
                <Edit className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Product Details and Price - Below the image and icons */}
            <div className="mt-4 md:mt-4 flex flex-col md:flex-row items-start justify-between gap-2">
              {/* Product Details (Name and Quantity) */}
              <div className="flex-1">
                <p className="text-[#6A3917] font-medium">{product.name}</p>
                <p className="text-sm text-[#6A3917]">
                  Quantity: {product.quantity}
                </p>
              </div>

              {/* Price - Aligned to the right */}
              <div className="flex-shrink-0">
                <p className="text-lg font-bold text-[#6A3917]">₦{product.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfProducts;