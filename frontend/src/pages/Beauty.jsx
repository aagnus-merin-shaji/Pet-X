import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons from react-icons

// Import images from src/assets
import lakmeCreme from "../assets/lakme-creme.jpg";
import lakmeVitaminC from "../assets/lakme-vitamin-c.jpg";
import cetaphilMoisturiser from "../assets/cetaphil-moisturiser.jpg";
import niveaCream from "../assets/nivea-cream.jpg";
import olayCream from "../assets/olay-cream.jpg";

const Beauty = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]); // State to track wishlist items
  const [selectedCategory, setSelectedCategory] = useState("All"); // State to track selected category

  // Mock data for skincare items
  const skincareItems = [
    {
      id: 1,
      brand: "Lakme",
      name: "Skin Lightening Light Creme",
      price: 278,
      originalPrice: 565,
      discount: "47% OFF",
      rating: 4.4,
      reviews: 6600,
      image: lakmeCreme,
      category: "Moisturizers",
    },
    {
      id: 2,
      brand: "Lakme",
      name: "Vitamin C+ Day Cream 50 g",
      price: 273,
      originalPrice: 449,
      discount: "39% OFF",
      rating: 4.4,
      reviews: 4400,
      image: lakmeVitaminC,
      category: "Vitamin C",
    },
    {
      id: 3,
      brand: "Cetaphil",
      name: "Moisturising Cream - 80 g",
      price: 588,
      originalPrice: 669,
      discount: "12% OFF",
      rating: 4.6,
      reviews: 18900,
      image: cetaphilMoisturiser,
      category: "Moisturizers",
    },
    {
      id: 4,
      brand: "Nivea",
      name: "Light Moisturizing Cream",
      price: 305,
      originalPrice: 690,
      discount: "53% OFF",
      rating: 4.6,
      reviews: 49100,
      image: niveaCream,
      category: "Moisturizers",
    },
    {
      id: 5,
      brand: "OLAY",
      name: "Anti-Aging Day Cream with SPF 15",
      price: 699,
      originalPrice: 899,
      discount: "22% OFF",
      rating: 4.6,
      reviews: 51700,
      image: olayCream,
      category: "Anti-Aging",
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
      ? skincareItems
      : skincareItems.filter((item) => item.category === selectedCategory);

  return (
    <BeautyWrapper>
      <h1>Beauty Collection</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={selectedCategory === "All" ? "active" : ""}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        <button
          className={selectedCategory === "Moisturizers" ? "active" : ""}
          onClick={() => setSelectedCategory("Moisturizers")}
        >
          Moisturizers
        </button>
        <button
          className={selectedCategory === "Vitamin C" ? "active" : ""}
          onClick={() => setSelectedCategory("Vitamin C")}
        >
          Vitamin C
        </button>
        <button
          className={selectedCategory === "Anti-Aging" ? "active" : ""}
          onClick={() => setSelectedCategory("Anti-Aging")}
        >
          Anti-Aging
        </button>
      </div>

      {/* Skincare Items Grid */}
      <div className="skincare-list">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="skincare-item"
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
    </BeautyWrapper>
  );
};

// Define BeautyWrapper styled component
const BeautyWrapper = styled.div`
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

  .skincare-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .skincare-item {
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

export default Beauty;