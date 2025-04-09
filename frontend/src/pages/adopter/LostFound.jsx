import React, { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { lostaddAPI } from "../../services/lostfoundServices";

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #555;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: white;
  margin-right: 10px;
  &:hover {
    background-color: ${(props) => (props.primary ? "#0056b3" : "#5a6268")};
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 10px;
`;

const ImagePreview = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const LostFound = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: lostaddAPI,
    mutationKey: ["add-lostanimal"],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      animalName: "",
      animalType: "",
      lastSeenLocation: "",
      dateLostOrFound: "",
      contact: "",
      photos: null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      
      // Append all fields except photos
      formData.append('animal', values.animal);
      formData.append('animalType', values.animalType);
      formData.append('lastSeenLocation', values.lastSeenLocation);
      formData.append('dateLostOrFound', values.dateLostOrFound);
      formData.append('contact', values.contact);
      
      // Append each photo file
      if (values.photos) {
        Array.from(values.photos).forEach((file) => {
          formData.append('photos', file); // Must match backend field name
        });
      }

      try {
        await mutateAsync(formData);
        formik.resetForm();
        alert('Report submitted successfully!');
      } catch (err) {
        alert('Failed to submit report. Please try again.');
      }
    },
  });

  return (
    <Container>
      <Title>Lost Pet Report</Title>

      {submitStatus && (
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          borderRadius: '4px',
          backgroundColor: submitStatus === 'success' ? '#d4edda' : '#f8d7da',
          color: submitStatus === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${submitStatus === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {submitMessage}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        {/* General Information Section */}
        <div>
          <SectionTitle>General Information</SectionTitle>
          <FormGroup>
            <Label>Animal Name</Label>
            <Input
              type="text"
              name="animalname"
              placeholder="Enter animal's name"
              value={formik.values.animal}
              onChange={formik.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Animal Type</Label>
            <Select
              name="animalType"
              value={formik.values.animalType}
              onChange={formik.handleChange}
            >
              <option value="">Select animal type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="reptile">Reptile</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>
        </div>

        {/* Lost Information Section */}
        <div>
          <SectionTitle>Lost Information</SectionTitle>
          <FormGroup>
            <Label>Last Seen Location</Label>
            <TextArea
              name="lastSeenLocation"
              placeholder="Enter detailed location where the animal was last seen"
              value={formik.values.lastSeenLocation}
              onChange={formik.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Date Lost</Label>
            <Input
              type="date"
              name="dateLostOrFound"
              value={formik.values.dateLostOrFound}
              onChange={formik.handleChange}
            />
          </FormGroup>
        </div>

        {/* Contact Information Section */}
        <div>
          <SectionTitle>Contact Information</SectionTitle>
          <FormGroup>
            <Label>Contact Information</Label>
            <Input
              type="number"
              name="contact"
              placeholder="Your phone number"
              value={formik.values.contact}
              onChange={formik.handleChange}
              required
            />
          </FormGroup>
        </div>

        {/* Upload Photo Section */}
        <div>
          <SectionTitle>Upload Photos</SectionTitle>
          <FormGroup>
            <Label>Animal Photos</Label>
            <Input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={(event) => {
                formik.setFieldValue("photos", event.currentTarget.files);
              }}
            />
          </FormGroup>

          {formik.values.photos && formik.values.photos.length > 0 && (
            <ImagePreview>
              {Array.from(formik.values.photos).map((file, index) => (
                <PreviewImage
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                />
              ))}
            </ImagePreview>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <Button 
            type="submit"
            primary
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </form>

      {isError && <ErrorMessage>{error.message}</ErrorMessage>}
    </Container>
  );
};

export default LostFound;