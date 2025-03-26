import React, { useState } from "react";
import styled from "styled-components";
import { avatar } from "../../assets/imagedata";

const ShelterProfilePage = () => {
  // Example vendor data (replace with dynamic data from an API or state)
  const initialVendorData = {
    logo: "https://via.placeholder.com/150", // Replace with the actual logo URL
    name: "shelter Name",
    email: "shelter@example.com",
    phone: "+123 456 7890",
    address: "123 shelter Street, City, Country",
    description: "We provide good pets.",
  };

  // State to manage vendor data
  const [vendorData, setVendorData] = useState(initialVendorData);

  // State to toggle between view and edit modes
  const [isEditMode, setIsEditMode] = useState(false);

  // State to toggle the Change Password form
  const [showChangePassword, setShowChangePassword] = useState(false);

  // State to manage password change form inputs
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for profile changes
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save changes (you can add API call here to update the backend)
    console.log("Updated Vendor Data:", vendorData);
    setIsEditMode(false); // Switch back to view mode after saving
  };

  // Handle form submission for password change
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Validate new password and confirm new password
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Save new password (you can add API call here to update the backend)
    console.log("Password Change Data:", passwordData);
    alert("Password changed successfully!");
    setShowChangePassword(false); // Hide the change password form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <ProfileWrapper>
      <div className="profile-container">
        <div className="profile-header">
          <img src={avatar} alt="Vendor Logo" className="vendor-logo" />
          {isEditMode ? (
            <input
              type="text"
              name="name"
              value={vendorData.name}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <h2>{vendorData.name}</h2>
          )}
        </div>

        {isEditMode ? (
          // Edit Mode: Display form
          <form onSubmit={handleSubmit}>
            <div className="profile-details">
              <div className="detail-item">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={vendorData.email}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </div>
              <div className="detail-item">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={vendorData.phone}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </div>
              <div className="detail-item">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={vendorData.address}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </div>
              <div className="detail-item">
                <label>Description</label>
                <textarea
                  name="description"
                  value={vendorData.description}
                  onChange={handleInputChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
            </div>
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          // View Mode: Display details
          <>
            <div className="profile-details">
              <div className="detail-item">
                <label>Email</label>
                <p>{vendorData.email}</p>
              </div>
              <div className="detail-item">
                <label>Phone</label>
                <p>{vendorData.phone}</p>
              </div>
              <div className="detail-item">
                <label>Address</label>
                <p>{vendorData.address}</p>
              </div>
              <div className="detail-item">
                <label>Description</label>
                <p>{vendorData.description}</p>
              </div>
            </div>
            <button
              className="edit-button"
              onClick={() => setIsEditMode(true)}
            >
              Edit Profile
            </button>
            <button
              className="change-password-button"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              Change Password
            </button>
          </>
        )}

        {/* Change Password Form */}
        {showChangePassword && (
          <div className="change-password-form">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="detail-item">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="edit-input"
                  required
                />
              </div>
              <div className="detail-item">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="edit-input"
                  required
                />
              </div>
              <div className="detail-item">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="edit-input"
                  required
                />
              </div>
              <button type="submit" className="save-button">
                Change Password
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowChangePassword(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </ProfileWrapper>
  );
};

// Styled Components
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem;

  .profile-container {
    background-color: #ffffff;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 700px;
    text-align: center;

    .profile-header {
      margin-bottom: 2.5rem;

      .vendor-logo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 1.5rem;
        border: 3px solid #e9ecef;
      }

      h2 {
        font-size: 2rem;
        color: #343a40;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .edit-input {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #ced4da;
        border-radius: 6px;
        margin-bottom: 1rem;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;

        &:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
          outline: none;
        }
      }
    }

    .profile-details {
      text-align: left;

      .detail-item {
        margin-bottom: 1.75rem;

        label {
          display: block;
          font-size: 0.95rem;
          color: #495057;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        p {
          font-size: 1rem;
          color: #212529;
          margin: 0;
          padding: 0.5rem;
          background-color: #f8f9fa;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }

        .edit-input {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ced4da;
          border-radius: 6px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;

          &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
            outline: none;
          }
        }

        textarea.edit-input {
          resize: vertical;
          min-height: 100px;
        }
      }
    }

    .edit-button,
    .change-password-button,
    .save-button,
    .cancel-button {
      width: 100%;
      padding: 0.85rem;
      font-size: 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
      margin-bottom: 0.75rem;
      font-weight: 500;

      &:hover {
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .edit-button {
      background-color: #007bff;
      color: #fff;

      &:hover {
        background-color: #0056b3;
      }
    }

    .change-password-button {
      background-color: #28a745;
      color: #fff;

      &:hover {
        background-color: #218838;
      }
    }

    .save-button {
      background-color: #17a2b8;
      color: #fff;

      &:hover {
        background-color: #138496;
      }
    }

    .cancel-button {
      background-color: #dc3545;
      color: #fff;

      &:hover {
        background-color: #c82333;
      }
    }

    .change-password-form {
      margin-top: 2.5rem;
      text-align: left;
      background-color: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e9ecef;

      h3 {
        font-size: 1.5rem;
        color: #343a40;
        margin-bottom: 1.5rem;
        font-weight: 600;
        text-align: center;
      }

      .detail-item {
        margin-bottom: 1.5rem;

        label {
          display: block;
          font-size: 0.95rem;
          color: #495057;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ced4da;
          border-radius: 6px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;

          &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
            outline: none;
          }
        }
      }

      .save-button,
      .cancel-button {
        width: 100%;
        padding: 0.85rem;
        font-size: 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        margin-bottom: 0.75rem;
        font-weight: 500;

        &:hover {
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .save-button {
        background-color: #17a2b8;
        color: #fff;

        &:hover {
          background-color: #138496;
        }
      }

      .cancel-button {
        background-color: #6c757d;
        color: #fff;

        &:hover {
          background-color: #5a6268;
        }
      }
    }
  }
`;

export default ShelterProfilePage;