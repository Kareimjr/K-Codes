// src/admin/pages/ListOfProducts.js
import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { getProducts, updateProduct, deleteProduct } from '../services/services';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ListOfProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // State for editing a product

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editProduct.name);
      formData.append('description', editProduct.description);
      formData.append('quantity', editProduct.quantity);
      formData.append('price', editProduct.price);
      formData.append('isBestSeller', editProduct.isBestSeller);
      if (editProduct.imageFile) {
        formData.append('image', editProduct.imageFile);
      }

      const res = await updateProduct(editProduct._id, formData);
      toast.success(res.data.message);
      setEditProduct(null); // Clear edit form after submission
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data.message || 'Error updating product');
    }
  };

  const handleEdit = (product) => {
    setEditProduct({
      _id: product._id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      isBestSeller: product.isBestSeller,
      imageUrl: `${BACKEND_URL}${product.imageUrl}`,
      imageFile: null, // For new file upload
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProduct({
          ...editProduct,
          imageUrl: reader.result, // Preview
          imageFile: file, // Actual file for upload
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      width: '330px',
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    try {
      const res = await deleteProduct(id);
      toast.success(res.data.message);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data.message || 'Error deleting product');
    }
  };

  const toggleBestSeller = async (id) => {
    const product = products.find((p) => p._id === id);
    if (!product) return;
    try {
      const updatedData = { 
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        isBestSeller: !product.isBestSeller,
      };
      const res = await updateProduct(id, updatedData);
      toast.success(res.data.message);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data.message || 'Error updating product');
    }
  };

  return (
    <div className="bg-white max-w-3xl mx-auto p-4 md:p-6 rounded-xl shadow-lg">
      <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-[#6A3917]">List of Products</h2>

      {/* Edit Product Form (Pop-up style) */}
      {editProduct && (
        <form onSubmit={handleEditSubmit} className="mb-6 space-y-4 bg-[#F5E8DF] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-[#6A3917]">Edit Product</h3>
          <div className="border-2 border-dashed border-[#A67C52] p-4 rounded-lg text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="edit-product-image"
            />
            <label htmlFor="edit-product-image" className="cursor-pointer text-[#6A3917] hover:text-[#5A2F13]">
              {editProduct.imageUrl ? (
                <img src={editProduct.imageUrl} alt="Preview" className="w-20 h-20 object-cover mx-auto rounded" />
              ) : (
                <span>Upload New Image</span>
              )}
            </label>
          </div>
          <input
            type="text"
            placeholder="Product Name"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
          <textarea
            placeholder="Description"
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            rows="3"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={editProduct.quantity}
            onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            className="w-full p-2 border border-[#A67C52] rounded-lg focus:outline-none focus:border-[#6A3917]"
            required
          />
          <label className="flex items-center gap-2 text-[#6A3917]">
            <input
              type="checkbox"
              checked={editProduct.isBestSeller}
              onChange={(e) => setEditProduct({ ...editProduct, isBestSeller: e.target.checked })}
              className="form-checkbox h-5 w-5 text-[#6A3917]"
            />
            Best Seller
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-2 px-4 rounded-lg hover:from-[#5A2F13] hover:to-[#935F3B] transition"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={() => setEditProduct(null)}
              className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Product List */}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-[#D7B9A5] rounded-lg p-4 bg-[#F5E8DF] shadow-sm relative"
          >
            <div>
              <div className="flex-shrink-0">
                <img
                  src={`${BACKEND_URL}${product.imageUrl}`}
                  alt={product.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                />
              </div>
            </div>
            <div className="absolute top-3 right-3 flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="text-[#6A3917] hover:text-[#5A2F13] p-2"
              >
                <Edit className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
            <div className="mt-4 flex flex-col md:flex-row items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-[#6A3917] font-medium">{product.name}</p>
                <p className="text-sm text-[#6A3917]">Quantity: {product.quantity}</p>
                <label className="flex items-center gap-2 text-sm text-[#6A3917] mt-2">
                  <input
                    type="checkbox"
                    checked={product.isBestSeller}
                    onChange={() => toggleBestSeller(product._id)}
                    className="w-4 h-4"
                  />
                  Best Seller
                  {product.isBestSeller && (
                    <span className="ml-2 px-2 py-1 bg-[#6A3917] text-white text-xs rounded">
                      Best Seller
                    </span>
                  )}
                </label>
              </div>
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