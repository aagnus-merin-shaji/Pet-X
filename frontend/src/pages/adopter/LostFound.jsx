import React, { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { lostaddAPI } from "../../services/lostfoundServices";

// Styled Components (same as before)
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
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
  background-color: #007bff;
  color: white;
  margin-right: 10px;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
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

const Alert = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  background-color: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.success ? '#c3e6cb' : '#f5c6cb'};
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
      animal: "",
      animalType: "",
      lastSeenLocation: "",
      dateLostOrFound: "",
      contact: "",
      photos: [],
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      try {
        // Simulate API call to backend
        const response = await mutateAsync(values);
        
        // If successful
        setSubmitStatus('success');
        setSubmitMessage('Report submitted successfully!');
        formik.resetForm();
        
        // Show success alert
        alert('Report submitted successfully!');
        
        console.log("Form submitted successfully:", response);
      } catch (error) {
        // If error
        setSubmitStatus('error');
        setSubmitMessage('Failed to submit report. Please try again.');
        
        // Show error alert
        alert('Failed to submit report. Please try again.');
        
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Mock function to simulate backend save
  const saveToBackend = async (formData) => {
    // In a real app, you would use fetch or axios to send data to your backend
    // This is a mock implementation that simulates a network request
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demonstration
        const isSuccess = Math.random() > 0.2; // 80% success rate
        
        if (isSuccess) {
          resolve({
            status: 'success',
            data: {
              id: Date.now(),
              ...formData,
              // Don't include files in the mock response
              photos: formData.photos ? `Received ${formData.photos.length} photos` : 'No photos'
            }
          });
        } else {
          reject(new Error('Network error: Failed to save data'));
        }
      }, 1500); // Simulate network delay
    });
  };

  return (
    <Container>
      <Title>Lost Pet Report</Title>

      {submitStatus && (
        <Alert success={submitStatus === 'success'}>
          {submitMessage}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        {/* All your form fields remain the same */}
        <FormGroup>
          <Label>Animal Name</Label>
          <Input
            type="text"
            name="animal"
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
          <Label>Date Lost </Label>
          <Input
            type="date"
            name="dateLostOrFound"
            value={formik.values.dateLostOrFound}
            onChange={formik.handleChange}
          />
        </FormGroup>

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

        <FormGroup>
          <Label>Upload Photos</Label>
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

        <Button 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </form>
    </Container>
  );
};

export default LostFound;