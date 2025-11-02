import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import "./ProductList.css";

const ProductList = ({ onHomeClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // 🌿 Sample plants data
  const plantsArray = [
    {
      id: 1,
      name: "Peace Lily",
      description: "A beautiful indoor plant that purifies air.",
      image: "/images/peace.jpeg",
      cost: 1200,
    },
    {
      id: 2,
      name: "Snake Plant",
      description: "Low maintenance, perfect for bedrooms.",
      image: "/images/snake.jpeg",
      cost: 900,
    },
    {
      id: 3,
      name: "Money Plant",
      description: "Brings positive energy and good fortune.",
      image: "/money.webp",
      cost: 750,
    },
  ];

  // 🛒 Handle Add to Cart
  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 }));
  };

  // ✅ Check if a plant is already added to cart
  const isPlantAdded = (plantId) => {
    return cartItems.some((item) => item.id === plantId);
  };

  return (
    <div className="product-page">
      <div className="header">
        <h2>Paradise Nursery Plants</h2>
        <button className="home-btn" onClick={onHomeClick}>
          🏠 Home
        </button>
      </div>

      <div className="product-grid">
        {plantsArray.map((plant) => (
          <div key={plant.id} className="product-card">
            <img src={plant.image} alt={plant.name} className="product-image" />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <h4>Price: Rs {plant.cost}</h4>

            <button
              className={`add-btn ${isPlantAdded(plant.id) ? "disabled" : ""}`}
              onClick={() => handleAddToCart(plant)}
              disabled={isPlantAdded(plant.id)}
            >
              {isPlantAdded(plant.id) ? "Added ✅" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
