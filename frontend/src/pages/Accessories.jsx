import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons from react-icons

// Import images from src/assets
import watchImage from "../assets/watch.jpg";
import bagImage from "../assets/bag.jpg";
import sunglassesImage from "../assets/sunglasses.jpg";
import necklaceImage from "../assets/necklace.jpg";
import braceletImage from "../assets/bracelet.jpg";

const Accessories = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]); // State to track wishlist items
  const [selectedCategory, setSelectedCategory] = useState("All"); // State to track selected category

  // Mock data for accessory items
  const accessoryItems = [
    {
      id: 1,
      brand: "Timex",
      name: "Classic Leather Watch",
      price: 1200,
      originalPrice: 2000,
      discount: "40% OFF",
      rating: 4.5,
      reviews: 3200,
      image: watchImage,
      category: "Watches",
    },
    {
      id: 2,
      brand: "Gucci",
      name: "Designer Handbag",
      price: 5000,
      originalPrice: 8000,
      discount: "37% OFF",
      rating: 4.7,
      reviews: 4500,
      image: bagImage,
      category: "Bags",
    },
    {
      id: 3,
      brand: "Ray-Ban",
      name: "Aviator Sunglasses",
      price: 1500,
      originalPrice: 2500,
      discount: "40% OFF",
      rating: 4.6,
      reviews: 6000,
      image: sunglassesImage,
      category: "Sunglasses",
    },
    {
      id: 4,
      brand: "Swarovski",
      name: "Crystal Necklace",
      price: 3000,
      originalPrice: 5000,
      discount: "40% OFF",
      rating: 4.8,
      reviews: 5200,
      image: necklaceImage,
      category: "Jewelry",
    },
    {
      id: 5,
      brand: "Pandora",
      name: "Charm Bracelet",
      price: 2500,
      originalPrice: 4000,
      discount: "37% OFF",
      rating: 4.5,
      reviews: 4800,
      image: braceletImage,
      category: "Jewelry",
    },
  ];

  // Function to handle item click
  const handleItemClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Function to toggle wishlist status
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId)); // Remove from wishlist
    } else {
      setWishlist([...wishlist, productId]); // Add to wishlist
    }
  };

  // Function to filter items by category
  const filteredItems =
    selectedCategory === "All"
      ? accessoryItems
      : accessoryItems.filter((item) => item.category === selectedCategory);

  return (
    <AccessoriesWrapper>
      <h1>Accessories Collection</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={selectedCategory === "All" ? "active" : ""}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        <button
          className={selectedCategory === "Watches" ? "active" : ""}
          onClick={() => setSelectedCategory("Watches")}
        >
          Watches
        </button>
        <button
          className={selectedCategory === "Bags" ? "active" : ""}
          onClick={() => setSelectedCategory("Bags")}
        >
          Bags
        </button>
        <button
          className={selectedCategory === "Sunglasses" ? "active" : ""}
          onClick={() => setSelectedCategory("Sunglasses")}
        >
          Sunglasses
        </button>
        <button
          className={selectedCategory === "Jewelry" ? "active" : ""}
          onClick={() => setSelectedCategory("Jewelry")}
        >
          Jewelry
        </button>
      </div>

      {/* Accessories Items Grid */}
      <div className="accessories-list">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="accessory-item"
            onClick={() => handleItemClick(item.id)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="product-image"
            />
            <div
              className="wishlist-icon"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling to parent
                toggleWishlist(item.id);
              }}
            >
              {wishlist.includes(item.id) ? (
                <FaHeart className="heart-icon filled" /> // Filled heart
              ) : (
                <FaRegHeart className="heart-icon" /> // Outline heart
              )}
            </div>
            <div className="item-header">
              <span className="rating">
                {item.rating} ★ | {item.reviews}
              </span>
              <h2 className="brand">{item.brand}</h2>
            </div>
            <p className="item-name">{item.name}</p>
            <div className="pricing">
              <span className="price">Rs. {item.price}</span>
              <span className="original-price">Rs. {item.originalPrice}</span>
              <span className="discount">{item.discount}</span>
            </div>
          </div>
        ))}
      </div>
    </AccessoriesWrapper>
  );
};

// Define AccessoriesWrapper styled component
const AccessoriesWrapper = styled.div`
  padding: 2rem;

  h1 {
    font-size: 2.5rem;
    color: hsl(var(--black));
    margin-bottom: 2rem;
    text-align: center;
  }

  .filter-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;

    button {
      padding: 0.5rem 1rem;
      border: 1px solid hsl(var(--divider));
      border-radius: 0.5rem;
      background-color: hsl(var(--white));
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;

      &:hover {
        background-color: hsl(var(--orange));
        color: hsl(var(--white));
      }

      &.active {
        background-color: hsl(var(--orange));
        color: hsl(var(--white));
      }
    }
  }

  .accessories-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .accessory-item {
    position: relative;
    padding: 1.5rem;
    border: 1px solid hsl(var(--divider));
    border-radius: 0.5rem;
    background-color: hsl(var(--white));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  }

  .product-image {
    width: 100%;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .wishlist-icon {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
    z-index: 10;

    .heart-icon {
      font-size: 1.5rem;
      color: hsl(var(--grayish-blue));
      transition: color 0.2s ease;

      &.filled {
        color: hsl(var(--red)); // Filled heart color
      }

      &:hover {
        color: hsl(var(--red)); // Hover color
      }
    }
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .rating {
      font-size: 1rem;
      color: hsl(var(--dark-grayish-blue));
    }

    .brand {
      font-size: 1.5rem;
      color: hsl(var(--black));
    }
  }

  .item-name {
    font-size: 1.2rem;
    color: hsl(var(--dark-grayish-blue));
    margin-bottom: 1rem;
  }

  .pricing {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: hsl(var(--black));
    }

    .original-price {
      font-size: 1rem;
      text-decoration: line-through;
      color: hsl(var(--grayish-blue));
    }

    .discount {
      font-size: 1rem;
      color: hsl(var(--orange));
    }
  }
`;

export default Accessories;