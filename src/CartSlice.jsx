// src/CartSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // stores all added plants
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.name !== action.payload.name
      );
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
