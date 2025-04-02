import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { avatar } from "../assets/imagedata";
import { useMutation, useQuery,  useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { profileeditAPI, profilepasswordAPI, profilesaveAPI } from "../services/userProfileServices";
import { useNavigate } from "react-router-dom";

const AdopterProfilePage = () => {
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  
  // Fetch adopter profile data
  const { data, isLoading, isError, error } = useQuery({
    queryFn: profilesaveAPI,
    queryKey: ['profile-view'],
  });
  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data]);

// Local state for form data
const [profileData, setProfileData] = useState(data); 
const navigate =useNavigate()
  // Mutation for updating profile
   const { mutateAsync:changePasswordMutation, } = useMutation({
          mutationFn: profilepasswordAPI, // Ensure this function is defined in userServices.js
          mutationKey: ["edit-password"],
          onSuccess: () => {
            queryClient.invalidateQueries(['adopter-profile']);
            alert('✅ Password updated successfully!');
            navigate('/home');
          },
          onError: (error) => {
            alert('❌ Error updating password: ' + error.message);
          },
        });

  // Mutation for changing password
  const { mutateAsync:updateProfileMutation, isPending, } = useMutation({
    mutationKey: ['edit-profile'],
    mutationFn: profileeditAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['adopter-profile']);
      alert('✅ Profile updated successfully!');
      navigate('/home');
    },
    onError: (error) => {
      alert('❌ Error updating profile: ' + error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
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
    updateProfileMutation(profileData); // Use `editData` instead of `profileData` if needed
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    changePasswordMutation(passwordData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ProfileWrapper>
      <div className="profile-container">
        <div className="profile-header">
          {/* <img src={avatar} alt="Adopter Profile" className="profile-image" /> */}
          {isEditMode ? (
            <input
              type="text"
              name="username"
              value={profileData?.username || ""}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <h2>{profileData?.username || "Username"}</h2>
          )}
        </div>

        {isEditMode ? (
          <form onSubmit={handleSubmit}>
            <div className="profile-details">
              <div className="detail-item">
              
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData?.email || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profileData?.bio || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
              <div className="detail-item">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={profileData?.address || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </div>
              <div className="detail-item">
                <label>Livelihood</label>
                <input
                  type="text"
                  name="livelihood"
                  value={profileData?.livelihood || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </div>
              <div className="detail-item">
                <label>Adopter Preferences</label>
                <textarea
                  name="adopterPreferences"
                  value={profileData?.adopterPreferences || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
              <div className="detail-item">
                <label>Lifestyle Info</label>
                <textarea
                  name="lifestyleInfo"
                  value={profileData?.lifestyleInfo || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
              <div className="detail-item">
                <label>Experience With Pets</label>
                <textarea
                  name="experienceWithPets"
                  value={profileData?.experienceWithPets || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
              <div className="detail-item">
                <label>Desired Pet Characteristics</label>
                <textarea
                  name="desiredPetCharacteristics"
                  value={profileData?.desiredPetCharacteristics || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
              
            </div>
            <button type="submit" className="save-button" disabled={updateProfileMutation.isLoading}>
              {updateProfileMutation.isLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditMode(false)}
              disabled={updateProfileMutation.isLoading}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <div className="profile-details">
              <div className="detail-item">
              <div className="detail-item">
                <label>Email</label>
                <p>{profileData?.email || ""}</p>
              </div>
                <label>Bio</label>
                <p>{profileData?.bio || ""}</p>
              </div>
              <div className="detail-item">
                <label>Address</label>
                <p>{profileData?.address || ""}</p>
              </div>
              <div className="detail-item">
                <label>Livelihood</label>
                <p>{profileData?.livelihood || ""}</p>
              </div>
              <div className="detail-item">
                <label>Adopter Preferences</label>
                <p>{profileData?.adopterPreferences || ""}</p>
              </div>
              <div className="detail-item">
                <label>Lifestyle Info</label>
                <p>{profileData?.lifestyleInfo || ""}</p>
              </div>
              <div className="detail-item">
                <label>Experience With Pets</label>
                <p>{profileData?.experienceWithPets || ""}</p>
              </div>
              <div className="detail-item">
                <label>Desired Pet Characteristics</label>
                <p>{profileData?.desiredPetCharacteristics || ""}</p>
              </div>
              
            </div>
            <button className="edit-button" onClick={() => setIsEditMode(true)}>
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
              <button 
                type="submit" 
                className="save-button"
                disabled={changePasswordMutation.isLoading}
              >
                {changePasswordMutation.isLoading ? "Updating..." : "Change Password"}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowChangePassword(false)}
                disabled={changePasswordMutation.isLoading}
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

// Styled Components remain the same as in your original code
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

      .profile-image {
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

export default AdopterProfilePage;