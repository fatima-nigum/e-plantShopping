import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items) || []; // ✅ safe fallback
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
  };

  return (
    <div>
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} width="100" />
            <h3>{item.name}</h3>
            <p>Cost: Rs. {item.cost}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => dispatch(removeItem(item.name))}>Remove</button>
          </div>
        ))
      )}

      <h3>Total Amount: Rs. {calculateTotalAmount()}</h3>
    </div>
  );
};

export default CartItem;
