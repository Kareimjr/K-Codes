import React from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Trash2 } from "react-feather";
import { MinusCircle, PlusCircle } from "lucide-react";

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useCart();

  // Calculate the subtotal by summing up each product's price * quantity
  const calculateSubtotal = () =>
    cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal > 0 ? 1000 : 0; // Example shipping fee
  const total = subtotal + shippingCost;

  return (
    <div className="my-14 items-center sm:px-2 lg:px-6">
      <div className="w-full md:flex md:gap-2 justify-between px-4">
        <div className="p-4 flex-1 rounded-lg shadow-2xl">
          <label className="title flex gap-3 text-lg text-[#6A3917] font-bold">
            Your Cart <ShoppingBag className="text-[#6A3917]" />
          </label>

          {cart.length === 0 ? (
            <p className="text-center mt-4 text-gray-700 text-lg">Your cart is empty.</p>
          ) : (
            <div className="products mt-4 space-y-4">
              {cart.map((item) => {
                const { product, quantity } = item;
                return (
                  <div
                    key={product.id}
                    className="product flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow-2xl"
                  >
                    <div className="flex items-center w-full sm:w-auto">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-semibold">{product.name}</span>
                        <p className="text-xs text-gray-600">₦ {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center w-full sm:w-auto mt-2 sm:mt-0">
                      <div className="quantity flex items-center">
                        <MinusCircle
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                          size={20}
                          className="text-red-600 cursor-pointer"
                        />
                        <label className="w-7 text-center text-md">{quantity}</label>
                        <PlusCircle
                          size={20}
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          className="text-green-600 cursor-pointer"
                        />
                      </div>
                      <label className="mx-5 text-md font-semibold curp">₦ {(product.price * quantity).toLocaleString()}</label>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-red-600 hover:text-red-700 ml-2"
                      >
                        <Trash2 className="w-5 h-5 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="md:w-[350px] mt-4 md:mt-0">
          {/* Coupon Section */}
          <div className="card coupons p-6 rounded-lg shadow-2xl">
            <label className="title text-lg font-bold mb-4 text-[#6A3917]">Apply Coupons</label>
            <form className="flex gap-2">
              <input
                type="text"
                placeholder="Apply your coupons here"
                className="w-full p-2 border rounded"
              />
              <button className="bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white cursor-pointer px-4 py-2 rounded hover:from-[#5A2F13] hover:to-[#935F3B] transition">
                Apply
              </button>
            </form>
          </div>

          {/* Checkout Summary */}
          <div className="card checkout p-6 mt-6 rounded-lg shadow-2xl">
            <label className="title text-lg font-bold mb-4 text-[#6A3917]">Checkout</label>
            <div className="details space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-800">Subtotal ({cart.length} items)</span>
                <span className="text-gray-800">₦ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Shipping</span>
                <span className="text-gray-800">₦ {shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-[#6A3917]">
                <span>Total</span>
                <span>₦ {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="checkout--footer mt-6">
              <button className="checkout-btn w-full bg-gradient-to-r from-[#6A3917] to-[#A67C52] text-white py-3 cursor-pointer rounded-lg hover:from-[#5A2F13] hover:to-[#935F3B] transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;