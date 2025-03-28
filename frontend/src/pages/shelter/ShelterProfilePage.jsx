import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { avatar } from "../../assets/imagedata";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shelteraddAPI, sheltereditAPI } from "../../services/shelterServices";
import { profilepasswordAPI } from "../../services/userProfileServices";
import { useNavigate } from "react-router-dom";


const ShelterProfilePage = () => {
  // Fetch shelter data using React Query
  const { data, isLoading, isError, error } = useQuery({
      queryFn: shelteraddAPI,
      queryKey: ['profile'],
    });
    useEffect(() => {
        if (data) {
          setVendorData(data);
        }
      }, [data]);
    const navigate =useNavigate()
   const { mutateAsync:updateProfileMutation, } = useMutation({
             mutationFn: sheltereditAPI, // Ensure this function is defined in userServices.js
             mutationKey: ["editprofile"],
             onSuccess: () => {
               alert('✅ Profile updated successfully!');
               navigate('/shelterhome');
             },
             onError: (error) => {
               alert('❌ Error updating profile: ' + error.message);
             },
           });
    const { mutateAsync:changePasswordMutation, isPending, } = useMutation({
        mutationKey: ['change-pswd'],
        mutationFn: profilepasswordAPI,
        onSuccess: () => {
          alert('✅ Password changed successfully!');
          setIsChangingPassword(false);
        },
        onError: () => {
          alert('❌ Failed to change password. Please try again.');
        },
      });
  // Initialize vendor data with the fetched data or empty defaults
  const [vendorData, setVendorData] = useState({
    logo: "",
    organizationName: "",
    email: "",
    phone: "",
    address: "",
    missionStatement: "",
    facilityImages: [],
    username: ""
  });

  // Update state when data arrives
  useEffect(() => {
    if (data) {
      setVendorData({
        logo: data.logo || "",
         username: data.userId.username || "",
         email: data.userId.email || "",
        organizationName: data.organizationName || "",
        phone: data.phone || "",
        address: data.address || "",
        missionStatement: data.missionStatement || "",
        facilityImages: data.facilityImages || [],
      });
    }
  }, [data]);
  console.log(vendorData);
  // Rest of your existing state and handlers remain the same
  const [isEditMode, setIsEditMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Vendor Data:", vendorData);
    updateProfileMutation(vendorData)
    setIsEditMode(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    console.log("Password Change Data:", passwordData);
    alert("Password changed successfully!");
    setShowChangePassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  if (isLoading) {
    return <div>Loading shelter profile...</div>;
  }

  if (isError) {
    return <div>Error loading shelter profile</div>;
  }

  return (
    <ProfileWrapper>
      <div className="profile-container">
        {isEditMode ? (
          // Edit Mode: Display form
          <form onSubmit={handleSubmit}>
            <div className="profile-details">
              <div className="detail-item">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={vendorData.username}
                  onChange={handleInputChange}
                  className="edit-input"
                  disabled
                />
              </div>
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
              <div className="profile-header">
              <label>OrganizationName</label>
          {/* <img src={avatar} alt="Vendor Logo" className="vendor-logo" /> */}
          {isEditMode ? (
            <input
              type="text"
              name="organizationName"
              value={vendorData.organizationName}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <h2>{vendorData.organizationName}</h2>
          )}
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
                <label>Mission Statement</label>
                <textarea
                  name="missionStatement"
                  value={vendorData.missionStatement}
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
                <label>Username</label>
                <p>{vendorData.username}</p>
              </div>
              <div className="detail-item">
                <label>Email</label>
                <p>{vendorData.email}</p>
              </div>
              <div className="detail-item">
                <label>OrganizationName</label>
                <p>{vendorData.organizationName}</p>
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
                <label>Mission Statement</label>
                <p>{vendorData.missionStatement}</p>
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

// Your styled components remain exactly the same
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