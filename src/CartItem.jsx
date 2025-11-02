import "./CartItem.css";
// src/CartItem.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice"; // ✅ fixed path
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Calculate subtotal for one item
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  // ✅ Calculate total for all items
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  // ✅ Continue Shopping
  const handleContinueShopping = () => {
    navigate("/"); // Go back to home / product list page
  };

  // ✅ Checkout placeholder
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  // ✅ Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // ✅ Decrement quantity (remove if reaches zero)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  // ✅ Remove item completely
  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  // ✅ Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🪴</h2>
        <button
          onClick={handleContinueShopping}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ✅ Full cart view
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-gray-300 py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">Rs {item.cost}</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-700 font-semibold">
              Subtotal: Rs {calculateTotalCost(item)}
            </p>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-600 hover:text-red-800 text-sm mt-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <h3 className="text-xl font-semibold mb-4">
          Total Amount: Rs {calculateTotalAmount()}
        </h3>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleContinueShopping}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Continue Shopping
          </button>

          <button
            onClick={handleCheckoutShopping}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
