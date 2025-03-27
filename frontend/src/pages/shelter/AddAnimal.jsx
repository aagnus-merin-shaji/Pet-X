import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { animalsaddAPI } from "../../services/animalServices";
import { useNavigate } from "react-router-dom";

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
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 10px;
`;

const AddAnimal = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: animalsaddAPI,
    mutationKey: ["add-animal"],
  });
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      species: "dog",
      breed: "",
      age: "",
      size: "small",
      temperament: "",
      healthstatus: "",
      vaccinated: true,
      adoptionFee: "",
      description: "",
      photos: [],
    },
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (key === "photos") {
          Array.from(values.photos).forEach((file) => formData.append("photos", file));
        } else {
          formData.append(key, values[key]);
        }
      }
      mutateAsync(formData);
      navigate("/shelter/animals")
    },
    
  });

  return (
    <Container>
      <Title>Add New Animal</Title>

      <form onSubmit={formik.handleSubmit}>
        {/* General Information Section */}
        <div>
          <SectionTitle>General Information</SectionTitle>
          <FormGroup>
            <Label>Animal Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter animal name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
          <FormGroup>
            <Label>Species</Label>
            <Select
              name="species"
              onChange={formik.handleChange}
              value={formik.values.species}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="reptile">Reptile</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Breed</Label>
            <Input
              type="text"
              name="breed"
              placeholder="Enter breed (e.g., Golden Retriever)"
              onChange={formik.handleChange}
              value={formik.values.breed}
            />
          </FormGroup>
          <FormGroup>
            <Label>Age</Label>
            <Input
              type="number"
              name="age"
              placeholder="Enter age in years"
              onChange={formik.handleChange}
              value={formik.values.age}
            />
          </FormGroup>
          <FormGroup>
            <Label>Size</Label>
            <Select
              name="size"
              onChange={formik.handleChange}
              value={formik.values.size}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Temperament</Label>
            <Input
              type="text"
              name="temperament"
              placeholder="Enter temperament (e.g., friendly, shy)"
              onChange={formik.handleChange}
              value={formik.values.temperament}
            />
          </FormGroup>
        </div>

        {/* Health and Care Section */}
        <div>
          <SectionTitle>Health and Care</SectionTitle>
          <FormGroup>
            <Label>Health Status</Label>
            <Input
              type="text"
              name="healthstatus"
              placeholder="Enter health status (e.g., healthy, sick)"
              onChange={formik.handleChange}
              value={formik.values.healthstatus}
            />
          </FormGroup>
          <FormGroup>
            <Label>Vaccination Status</Label>
            <Select
              name="vaccinated"
              onChange={formik.handleChange}
              value={formik.values.vaccinated}
            >
              <option value='true'>Vaccinated</option>
              <option value='false'>Not Vaccinated</option>
            </Select>
          </FormGroup>
        </div>

        {/* Adoption Information Section */}
        <div>
          <SectionTitle>Adoption Information</SectionTitle>
          <FormGroup>
            <Label>Adoption Fee</Label>
            <Input
              type="number"
              name="adoptionFee"
              placeholder="Enter adoption fee (e.g., $50)"
              onChange={formik.handleChange}
              value={formik.values.adoptionFee}
            />
          </FormGroup>
        </div>

        {/* Description Section */}
        <div>
          <SectionTitle>Description</SectionTitle>
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              name="description"
              placeholder="Describe the animal (e.g., breed, color, personality, etc.)"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </FormGroup>
        </div>

        {/* Upload Photo Section */}
        <div>
          <SectionTitle>Upload Photo</SectionTitle>
          <FormGroup>
            <Label>Animal Photo</Label>
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
        </div>

        {/* Submit Button */}
        <div>
          <Button type="submit" primary>
            Add Animal
          </Button>
        </div>
      </form>

      {isError && <ErrorMessage>{error.message}</ErrorMessage>}
    </Container>
  );
};

export default AddAnimal;