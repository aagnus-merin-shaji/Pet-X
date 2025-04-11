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
        imagePreview: data.photos || "",
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
    mutationFn: profileeditAPI,
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
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
  padding: 2rem;
  font-family: 'Inter', sans-serif;

  .profile-container {
    background: #ffffff;
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .profile-header {
      margin-bottom: 3rem;

      .profile-image {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 1.5rem;
        border: 4px solid #4fc3f7;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }

      h2 {
        font-size: 2.2rem;
        color: #263238;
        margin-bottom: 0.5rem;
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      .edit-input {
        width: 100%;
        padding: 0.9rem;
        font-size: 1.1rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        margin-bottom: 1.2rem;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;

        &:focus {
          border-color: #4fc3f7;
          box-shadow: 0 0 0 4px rgba(79, 195, 247, 0.2);
          outline: none;
        }
      }
    }

    .profile-details {
      text-align: left;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;

      .detail-item {
        margin-bottom: 2rem;

        label {
          display: block;
          font-size: 1rem;
          color: #37474f;
          margin-bottom: 0.6rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        p {
          font-size: 1.1rem;
          color: #263238;
          margin: 0;
          padding: 0.8rem;
          background: #f5f6fa;
          border-radius: 8px;
          border: 1px solid #e0e7ff;
          line-height: 1.6;
        }

        .edit-input {
          width: 100%;
          padding: 0.9rem;
          font-size: 1.1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;

          &:focus {
            border-color: #4fc3f7;
            box-shadow: 0 0 0 4px rgba(79, 195, 247, 0.2);
            outline: none;
          }
        }

        textarea.edit-input {
          resize: vertical;
          min-height: 120px;
          line-height: 1.5;
        }
      }
    }

    .edit-button,
    .change-password-button,
    .save-button,
    .cancel-button {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
      margin-bottom: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      &:active {
        transform: translateY(0);
      }

      &:disabled {
        background-color: #b0bec5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    }

    .edit-button {
      background: linear-gradient(90deg, #4fc3f7, #0288d1);
      color: #fff;

      &:hover {
        background: linear-gradient(90deg, #0288d1, #4fc3f7);
      }
    }

    .change-password-button {
      background: linear-gradient(90deg, #66bb6a, #388e3c);
      color: #fff;

      &:hover {
        background: linear-gradient(90deg, #388e3c, #66bb6a);
      }
    }

    .save-button {
      background: linear-gradient(90deg, #26a69a, #00796b);
      color: #fff;

      &:hover {
        background: linear-gradient(90deg, #00796b, #26a69a);
      }
    }

    .cancel-button {
      background: linear-gradient(90deg, #ef5350, #d32f2f);
      color: #fff;

      &:hover {
        background: linear-gradient(90deg, #d32f2f, #ef5350);
      }
    }

    .change-password-form {
      margin-top: 3rem;
      text-align: left;
      background: #fafbff;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #e0e7ff;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      animation: slideIn 0.3s ease;

      h3 {
        font-size: 1.8rem;
        color: #263238;
        margin-bottom: 1.8rem;
        font-weight: 700;
        text-align: center;
        letter-spacing: 0.5px;
      }

      .detail-item {
        margin-bottom: 1.8rem;

        label {
          display: block;
          font-size: 1rem;
          color: #37474f;
          margin-bottom: 0.6rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        input {
          width: 100%;
          padding: 0.9rem;
          font-size: 1.1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;

          &:focus {
            border-color: #4fc3f7;
            box-shadow: 0 0 0 4px rgba(79, 195, 247, 0.2);
            outline: none;
          }
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
    margin-top: 0.8rem;
    color: #4fc3f7;
    cursor: pointer;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #0288d1;
    }
  }

  .file-input {
    display: none;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .profile-container {
      padding: 2rem;
    }

    .profile-details {
      grid-template-columns: 1fr;
    }

    .profile-image {
      width: 120px;
      height: 120px;
    }

    h2 {
      font-size: 1.8rem;
    }
  }
`;

export default AdopterProfilePage;