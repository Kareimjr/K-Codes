import React, { useState } from 'react';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [isBestSeller, setIsBestSeller] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { 
      image, 
      name, 
      description, 
      quantity: Number(quantity), 
      price: Number(price),
      isBestSeller 
    };
    console.log('Product to add:', product);
    // Add backend API call here
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#6A3917]">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Product Image</label>
          <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="product-image"
            />
            <label htmlFor="product-image" className="cursor-pointer text-[#6A3917] hover:text-[#5A2F13]">
              {image ? (
                <img src={image} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded" />
              ) : (
                <span>Drag & drop or click to upload</span>
              )}
            </label>
          </div>
        </div>
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
        </div>
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Quantity Available</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-[#6A3917] font-medium mb-2">Price (₦)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-[#6A3917] font-medium">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              className="w-4 h-4"
            />
            Mark as Best Seller
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-3 rounded-lg hover:from-[#5A2F13] hover:to-[#935F3B] transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;