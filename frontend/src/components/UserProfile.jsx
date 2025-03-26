import React, { useState } from "react";
import styled from "styled-components";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Nadaaba Yadav",
    email: "mail@example.com",
    phone: "+1 123 456 7890",
    address: "123 Main St, New York, NY 10001",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated User Data:", user); // Replace with API call to save data
  };

  return (
    <ProfileWrapper>
      <h1>User Profile</h1>

      {/* Profile Information */}
      <div className="profile-info">
        <div className="info-item">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>

        <div className="info-item">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>

        <div className="info-item">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.phone}</span>
          )}
        </div>

        <div className="info-item">
          <label>Address:</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.address}</span>
          )}
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="actions">
        {isEditing ? (
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {/* Order History */}
      <div className="order-history">
        <h2>Order History</h2>
        <p>No orders placed yet.</p>
      </div>

      {/* Wishlist */}
      <div className="wishlist">
        <h2>Wishlist</h2>
        <p>No items in wishlist.</p>
      </div>
    </ProfileWrapper>
  );
};

// Styled Components
const ProfileWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    color: hsl(var(--black));
    margin-bottom: 2rem;
    text-align: center;
  }

  .profile-info {
    background-color: hsl(var(--white));
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;

    .info-item {
      margin-bottom: 1.5rem;

      label {
        font-weight: 600;
        color: hsl(var(--dark-grayish-blue));
        margin-right: 1rem;
      }

      input {
        padding: 0.5rem;
        border: 1px solid hsl(var(--divider));
        border-radius: 0.5rem;
        width: 100%;
        max-width: 300px;
        font-size: 1rem;
      }

      span {
        font-size: 1rem;
        color: hsl(var(--dark-grayish-blue));
      }
    }
  }

  .actions {
    text-align: center;
    margin-bottom: 2rem;

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &.edit-btn {
        background-color: hsl(var(--orange));
        color: hsl(var(--white));

        &:hover {
          background-color: hsl(var(--orange) / 0.9);
        }
      }

      &.save-btn {
        background-color: hsl(var(--green));
        color: hsl(var(--white));

        &:hover {
          background-color: hsl(var(--green) / 0.9);
        }
      }
    }
  }

  .order-history,
  .wishlist {
    background-color: hsl(var(--white));
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;

    h2 {
      font-size: 1.75rem;
      color: hsl(var(--black));
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: hsl(var(--dark-grayish-blue));
    }
  }
`;

export default UserProfile;