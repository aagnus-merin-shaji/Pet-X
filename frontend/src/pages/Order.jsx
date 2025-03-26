import React, { useState } from 'react';

const Order = () => {
  // Sample data (you can replace it with dynamic data later)
  const orderData = {
    orderId: "1234567890",
    date: "March 12, 2025",
    status: "Delivered",
    totalAmount: "₹2,599",
    items: [
      {
        id: 1,
        name: "T-Shirt",
        size: "L",
        price: "₹599",
        quantity: 1,
        image: "https://via.placeholder.com/150"
      },
      {
        id: 2,
        name: "Jeans",
        size: "32",
        price: "₹999",
        quantity: 1,
        image: "https://via.placeholder.com/150"
      },
      {
        id: 3,
        name: "Jacket",
        size: "M",
        price: "₹999",
        quantity: 1,
        image: "https://via.placeholder.com/150"
      }
    ]
  };

  // State for review rating and text
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Handle rating click
  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  // Handle review text change
  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  // Submit review
  const handleSubmitReview = () => {
    alert(`Review Submitted! Rating: ${rating}, Review: ${reviewText}`);
  };

  return (
    <div className="order-container">
      <h2 className="order-title">Order Details</h2>

      <div className="order-summary">
        <p><strong>Order ID:</strong> {orderData.orderId}</p>
        <p><strong>Date:</strong> {orderData.date}</p>
        <p><strong>Status:</strong> {orderData.status}</p>
        <p><strong>Total Amount:</strong> {orderData.totalAmount}</p>
      </div>

      <div className="order-items">
        <h3>Items</h3>
        {orderData.items.map(item => (
          <div key={item.id} className="order-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <p><strong>{item.name}</strong></p>
              <p>Size: {item.size}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Review Section */}
      <div className="review-section">
        <h3>Write a Review</h3>

        {/* Star Rating */}
        <div className="rating-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? "filled" : ""}`}
              onClick={() => handleRatingClick(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Textbox for Review */}
        <textarea
          className="review-text"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={handleReviewTextChange}
        ></textarea>

        <button className="btn submit-btn" onClick={handleSubmitReview}>
          Submit Review
        </button>
      </div>

      {/* CSS Styles for the Order Page */}
      <style jsx>{`
        .order-container {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          max-width: 600px;
          margin: 0 auto;
        }

        .order-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .order-summary {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .order-summary p {
          font-size: 16px;
          margin: 5px 0;
        }

        .order-items h3 {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 15px;
        }

        .order-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          background-color: white;
          padding: 10px;
          border-radius: 8px;
        }

        .item-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          margin-right: 15px;
        }

        .item-details p {
          margin: 5px 0;
        }

        .review-section {
          margin-top: 30px;
          background-color: white;
          padding: 20px;
          border-radius: 8px;
        }

        .review-section h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .rating-container {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .star {
          color: #ddd;
          cursor: pointer;
        }

        .star.filled {
          color: #ff5733;
        }

        .review-text {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-bottom: 20px;
          resize: vertical;
        }

        .submit-btn {
          padding: 10px 20px;
          border: none;
          background-color: #ff5733;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .submit-btn:hover {
          background-color: #e04b2f;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          background-color: #ff5733;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .btn:hover {
          background-color: #e04b2f;
        }
      `}</style>
    </div>
  );
};

export default Order;