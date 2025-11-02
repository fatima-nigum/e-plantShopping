import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import { useNavigate } from "react-router-dom";
import "./CartItem.css";

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Calculate subtotal for a single item
  const calculateItemSubtotal = (item) => {
    const price = parseFloat(item.cost.toString().replace(/[^0-9.]/g, ""));
    return price * item.quantity;
  };

  // ✅ Calculate total amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + calculateItemSubtotal(item), 0);
  };

  // ✅ Handle continue shopping
  const handleContinueShopping = () => {
    navigate("/"); // Go back to home or product list
  };

  // ✅ Handle checkout
  const handleCheckoutShopping = () => {
    alert("🛍️ Functionality to be added for future reference");
  };

  // ✅ Handle increment
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ✅ Handle decrement (remove if reaches 0)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Handle remove
  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  // ✅ Total items count (for cart icon, optional)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Empty cart condition
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your cart is empty 😢</h2>
        <button onClick={handleContinueShopping} className="get-started-button1">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})</h2>

      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />

          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">Price: Rs {item.cost}</div>

            <div className="cart-item-quantity">
              <button className="cart-item-button" onClick={() => handleDecrement(item)}>
                -
              </button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button className="cart-item-button" onClick={() => handleIncrement(item)}>
                +
              </button>
            </div>

            <div className="cart-item-total">
              Subtotal: Rs {calculateItemSubtotal(item).toFixed(2)}
            </div>

            <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3 className="total_cart_amount">
        Total Amount: Rs {calculateTotalAmount().toFixed(2)}
      </h3>

      <div className="cart-buttons">
        <button
          onClick={handleContinueShopping}
          className="get-started-button1 continue_shopping_btn"
        >
          Continue Shopping
        </button>

        <button
          onClick={handleCheckoutShopping}
          className="get-started-button1 checkout_btn"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
