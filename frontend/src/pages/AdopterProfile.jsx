import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { profileeditAPI, profilepasswordAPI, profilesaveAPI } from "../services/userProfileServices";
import { useNavigate } from "react-router-dom";

const AdopterProfilePage = () => {
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  // Fetch adopter profile data
  const { data, isLoading, isError, error } = useQuery({
    queryFn: profilesaveAPI,
    queryKey: ["profile-view"],
  });

  // Main profile form
  const profileForm = useFormik({
    initialValues: {
      username: "",
      email: "",
      bio: "",
      address: "",
      livelihood: "",
      adopterPreferences: "",
      lifestyleInfo: "",
      experienceWithPets: "",
      desiredPetCharacteristics: "",
      photos: null,
      imagePreview: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      // Append all fields to formData, excluding imagePreview
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "imagePreview" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      try {
        await updateProfileMutation.mutateAsync(formData);
        setIsEditMode(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("❌ Error updating profile: " + error.message);
      }
    },
  });

  const handlePhotoChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      profileForm.setFieldValue("photos", file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          profileForm.setFieldValue("imagePreview", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Password form
  const passwordForm = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: async (values) => {
      if (values.newPassword !== values.confirmNewPassword) {
        alert("New password and confirm password do not match.");
        return;
      }

      const formData = new FormData();
      formData.append("currentPassword", values.currentPassword);
      formData.append("newPassword", values.newPassword);

      try {
        await changePasswordMutation.mutateAsync(formData);
        setShowChangePassword(false);
      } catch (error) {
        console.error("Error changing password:", error);
        alert("❌ Error changing password: " + error.message);
      }
    },
  });

  // Set form values when data is loaded
  useEffect(() => {
    if (data) {
      profileForm.setValues({
        username: data.username || "",
        email: data.email || "",
        bio: data.bio || "",
        address: data.address || "",
        livelihood: data.livelihood || "",
        adopterPreferences: data.adopterPreferences || "",
        lifestyleInfo: data.lifestyleInfo || "",
        experienceWithPets: data.experienceWithPets || "",
        desiredPetCharacteristics: data.desiredPetCharacteristics || "",
        photos: null,
        imagePreview: data.photos || "", // Assuming photos is the URL/path from backend
      });
    }
  }, [data]);

  // Mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationKey: ["edit-profile"],
    mutationFn: profileeditAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile-view"]);
      alert("✅ Profile updated successfully!");
    },
    onError: (error) => {
      alert("❌ Error updating profile: " + error.message);
    },
  });

  // Mutation for changing password
  const changePasswordMutation = useMutation({
    mutationFn: profileeditAPI, // Reusing profileeditAPI since it's the same endpoint
    mutationKey: ["edit-password"],
    onSuccess: () => {
      queryClient.invalidateQueries(["profile-view"]);
      alert("✅ Password updated successfully!");
    },
    onError: (error) => {
      alert("❌ Error updating password: " + error.message);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ProfileWrapper>
      <div className="profile-container">
        <div className="profile-header">
          {isEditMode ? (
            <div className="photo-upload-wrapper">
              <img src={profileForm.values.imagePreview} alt="" className="profile-image" />
              <label className="upload-label">
                Change Photo
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="file-input"
                />
              </label>
            </div>
          ) : (
            <img src={profileForm.values.imagePreview} alt="" className="profile-image" />
          )}

          {isEditMode ? (
            <input
              type="text"
              name="username"
              value={profileForm.values.username}
              onChange={profileForm.handleChange}
              className="edit-input"
            />
          ) : (
            <h2>{data?.username || "Username"}</h2>
          )}
        </div>

        {isEditMode ? (
          <form onSubmit={profileForm.handleSubmit}>
            <div className="profile-details">
              <div className="detail-item">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileForm.values.email}
                  onChange={profileForm.handleChange}
                  className="edit-input"
                />
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profileForm.values.bio}
                  onChange={profileForm.handleChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
              <div className="detail-item">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={profileForm.values.address}
                  onChange={profileForm.handleChange}
                  className="edit-input"
                />
              </div>
              <div className="detail-item">
                <label>Livelihood</label>
                <input
                  type="text"
                  name="livelihood"
                  value={profileForm.values.livelihood}
                  onChange={profileForm.handleChange}
                  className="edit-input"
                />
              </div>
              <div className="detail-item">
                <label>Adopter Preferences</label>
                <textarea
                  name="adopterPreferences"
                  value={profileForm.values.adopterPreferences}
                  onChange={profileForm.handleChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
              <div className="detail-item">
                <label>Lifestyle Info</label>
                <textarea
                  name="lifestyleInfo"
                  value={profileForm.values.lifestyleInfo}
                  onChange={profileForm.handleChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
              <div className="detail-item">
                <label>Experience With Pets</label>
                <textarea
                  name="experienceWithPets"
                  value={profileForm.values.experienceWithPets}
                  onChange={profileForm.handleChange}
                  className="edit-input"
                  rows="4"
                />
              </div>
              <div className="detail-item">
                <label>Desired Pet Characteristics</label>
                <textarea
                  name="desiredPetCharacteristics"
                  value={profileForm.values.desiredPetCharacteristics}
                  onChange={profileForm.handleChange}
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
                <label>Email</label>
                <p>{data?.email || ""}</p>
              </div>
              <div className="detail-item">
                <label>Bio</label>
                <p>{data?.bio || ""}</p>
              </div>
              <div className="detail-item">
                <label>Address</label>
                <p>{data?.address || ""}</p>
              </div>
              <div className="detail-item">
                <label>Livelihood</label>
                <p>{data?.livelihood || ""}</p>
              </div>
              <div className="detail-item">
                <label>Adopter Preferences</label>
                <p>{data?.adopterPreferences || ""}</p>
              </div>
              <div className="detail-item">
                <label>Lifestyle Info</label>
                <p>{data?.lifestyleInfo || ""}</p>
              </div>
              <div className="detail-item">
                <label>Experience With Pets</label>
                <p>{data?.experienceWithPets || ""}</p>
              </div>
              <div className="detail-item">
                <label>Desired Pet Characteristics</label>
                <p>{data?.desiredPetCharacteristics || ""}</p>
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
            <form onSubmit={passwordForm.handleSubmit}>
              <div className="detail-item">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.values.currentPassword}
                  onChange={passwordForm.handleChange}
                  className="edit-input"
                  required
                />
              </div>
              <div className="detail-item">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.values.newPassword}
                  onChange={passwordForm.handleChange}
                  className="edit-input"
                  required
                />
              </div>
              <div className="detail-item">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordForm.values.confirmNewPassword}
                  onChange={passwordForm.handleChange}
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

  .photo-upload-wrapper {
    position: relative;
    display: inline-block;
  }

  .upload-label {
    display: block;
    margin-top: 0.5rem;
    color: #007bff;
    cursor: pointer;
    font-weight: 500;
  }

  .file-input {
    display: none;
  }
`;

export default AdopterProfilePage;