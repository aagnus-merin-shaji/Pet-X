import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { avatar } from "../../assets/imagedata";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { shelteraddAPI, sheltereditAPI } from "../../services/shelterServices";
import { profilepasswordAPI } from "../../services/userProfileServices";
import { useNavigate } from "react-router-dom";


const ShelterProfilePage = () => {
  const queryClient = useQueryClient();
  // Fetch shelter data using React Query
  const { data, isLoading, isError } = useQuery({
    queryFn: shelteraddAPI,
    queryKey: ['profile'],
    staleTime: 300000, // Cache for 5 minutes
    cacheTime: 3600000, // Keep in cache for 1 hour
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
               queryClient.invalidateQueries(['profile']); // Add this line
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

  // Add this state near your other state declarations
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Update state when data arrives
  useEffect(() => {
    if (data) {
      setVendorData({
        ...data,
        logo: data.logo || avatar, // Make sure logo is properly initialized
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

  // Update the handleImageChange function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file?.type)) {
      alert('❌ Please select a valid image file (JPEG, PNG)');
      return;
    }
  
    // Add file size validation
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      alert('❌ Image size should be less than 2MB');
      return;
    }
  
    setIsImageLoading(true); // Add loading
  
    // Compress image before uploading
    const compressImage = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            // Reduce maximum dimensions for smaller file size
            const MAX_WIDTH = 400;
            const MAX_HEIGHT = 400;
            let width = img.width;
            let height = img.height;
  
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
  
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // Reduce quality further for smaller file size
            const compressedBase64 = canvas.toDataURL(file.type, 0.6);
            resolve(compressedBase64);
          };
        };
      });
    };
  
    if (file) {
      compressImage(file)
        .then(compressedBase64 => {
          // Update local state
          setVendorData(prev => ({
            ...prev,
            logo: compressedBase64
          }));
          setIsImageLoading(false); // Remove loading
        })
        .catch(error => {
          alert('❌ Error processing image');
          console.error(error);
          setIsImageLoading(false); // Remove loading
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToUpdate = {
        ...vendorData,
        logo: vendorData.logo === avatar ? "" : vendorData.logo // Don't save default avatar
      };
      
      await updateProfileMutation(dataToUpdate);
      
      // Force a refetch of the profile data
      queryClient.invalidateQueries(['profile']);
      setIsEditMode(false);
    } catch (error) {
      alert('❌ Error saving profile changes');
      console.error(error);
    }
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
            <div className="profile-header">
              <div className="image-container">
                <img 
                  src={vendorData.logo || avatar} 
                  alt="Profile" 
                  className="profile-image"
                />
                {isEditMode && (
                  <div className="image-upload">
                    <label htmlFor="profile-image-input" className="upload-label">
                      Change Photo
                    </label>
                    <input
                      id="profile-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                  </div>
                )}
              </div>
            </div>
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
              <div className="detail-item">
                <label>Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={vendorData.organizationName}
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
            <div className="profile-header">
              <div className="image-container">
                <img 
                  src={vendorData.logo || avatar} 
                  alt="Profile" 
                  className="profile-image"
                />
                {isEditMode && (
                  <div className="image-upload">
                    <label htmlFor="profile-image-input" className="upload-label">
                      Change Photo
                    </label>
                    <input
                      id="profile-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                  </div>
                )}
              </div>
            </div>
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

      .image-container {
        position: relative;
        width: 140px;
        height: 140px;
        margin: 0 auto 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .profile-image {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #4fc3f7;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }

      .image-upload {
        margin-top: 1rem;
        width: 100%;
        text-align: center;
      }

      .upload-label {
        display: inline-block;
        background: linear-gradient(90deg, #4fc3f7, #0288d1);
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        &:hover {
          background: linear-gradient(90deg, #0288d1, #4fc3f7);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .file-input {
        display: none;
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

export default ShelterProfilePage;