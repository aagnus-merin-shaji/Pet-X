import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { recordsaddAPI } from "../services/medicalRecordServices";

const PetMedicalDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pet } = location.state || {};
  const componentRef = useRef();

  // Define validation schema
  const validationSchema = Yup.object().shape({
    checkupDate: Yup.date().required("Checkup date is required"),
    diagnosis: Yup.string().required("Diagnosis is required"),
    treatment: Yup.string().required("Treatment is required"),
    medications: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Medication name is required"),
        dosage: Yup.string().required("Dosage is required"),
        frequency: Yup.string().required("Frequency is required"),
      })
    ),
    vaccinations: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Vaccine name is required"),
        dateGiven: Yup.date().required("Date given is required"),
        nextDueDate: Yup.date().required("Next due date is required"),
      })
    ),
  });

  // API mutation using React Query
  const { mutate: createMedicalRecord, isPending } = useMutation({
    mutationFn: recordsaddAPI,
    mutationKey: ["add-record"],
    onSuccess: () => {
      alert("Medical record created successfully!");
      navigate("/clinic/animals");
    },
    onError: (error) => {
      alert(`Error creating medical record: ${error.message}`);
    },
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      petId: pet?._id || "",
      clinicId: "", // Initialize as empty string
      shelterId: pet?.shelterId || "",
      checkupDate: new Date().toISOString().split("T")[0],
      diagnosis: "",
      treatment: "",
      medications: [{ name: "", dosage: "", frequency: "" }],
      vaccinations: [{ name: "", dateGiven: "", nextDueDate: "" }],
      spayedNeutered: false,
      specialNeeds: "",
      notes: "",
      attachments: [],
    },
    validationSchema,
    onSubmit: (values) => {
      // Filter out empty IDs before submission
      const submissionData = {
        ...values,
        clinicId: values.clinicId || undefined,
        shelterId: values.shelterId || undefined
      };
      createMedicalRecord(submissionData);
    },
  });

  // Rest of your component remains exactly the same...
  // [Keep all the existing helper functions and JSX return statement]
  // ...

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `MedicalDetails_${pet?.name}`,
  });

  // Helper functions for dynamic fields
  const addMedication = () => {
    formik.setFieldValue("medications", [
      ...formik.values.medications,
      { name: "", dosage: "", frequency: "" },
    ]);
  };

  const removeMedication = (index) => {
    const medications = [...formik.values.medications];
    medications.splice(index, 1);
    formik.setFieldValue("medications", medications);
  };

  const addVaccination = () => {
    formik.setFieldValue("vaccinations", [
      ...formik.values.vaccinations,
      { name: "", dateGiven: "", nextDueDate: "" },
    ]);
  };

  const removeVaccination = (index) => {
    const vaccinations = [...formik.values.vaccinations];
    vaccinations.splice(index, 1);
    formik.setFieldValue("vaccinations", vaccinations);
  };

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("attachments", [
      ...formik.values.attachments,
      ...files,
    ]);
  };

  const handleSubmit = (values) => {
    const submissionData = {
      ...values,
      clinicId: values.clinicId || undefined, // Send undefined instead of null/empty
      shelterId: values.shelterId || undefined
    };
    createMedicalRecord.mutate(submissionData);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Medical Details for {pet?.name}</h2>
      <form onSubmit={formik.handleSubmit} style={styles.form} ref={componentRef}>
        {/* Hidden fields for IDs */}
        <input type="hidden" name="clinicId" value={formik.values.clinicId} />
        <input type="hidden" name="shelterId" value={formik.values.shelterId} />

        {/* Checkup Date */}
        <label style={styles.label}>
          Checkup Date:
          <input
            type="date"
            name="checkupDate"
            value={formik.values.checkupDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
          />
          {formik.touched.checkupDate && formik.errors.checkupDate ? (
            <div style={styles.error}>{formik.errors.checkupDate}</div>
          ) : null}
        </label>

        {/* Diagnosis */}
        <label style={styles.label}>
          Diagnosis:
          <textarea
            name="diagnosis"
            value={formik.values.diagnosis}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.textarea}
          />
          {formik.touched.diagnosis && formik.errors.diagnosis ? (
            <div style={styles.error}>{formik.errors.diagnosis}</div>
          ) : null}
        </label>

        {/* Treatment */}
        <label style={styles.label}>
          Treatment:
          <textarea
            name="treatment"
            value={formik.values.treatment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.textarea}
          />
          {formik.touched.treatment && formik.errors.treatment ? (
            <div style={styles.error}>{formik.errors.treatment}</div>
          ) : null}
        </label>

        {/* Medications */}
        <h3 style={styles.subHeading}>Medications</h3>
        {formik.values.medications.map((medication, index) => (
          <div key={index} style={styles.medicationContainer}>
            <label style={styles.label}>
              Medication Name:
              <input
                type="text"
                name={`medications[${index}].name`}
                value={medication.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={styles.input}
              />
              {formik.touched.medications?.[index]?.name &&
              formik.errors.medications?.[index]?.name ? (
                <div style={styles.error}>
                  {formik.errors.medications[index].name}
                </div>
              ) : null}
            </label>
            <label style={styles.label}>
              Dosage:
              <input
                type="text"
                name={`medications[${index}].dosage`}
                value={medication.dosage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={styles.input}
              />
              {formik.touched.medications?.[index]?.dosage &&
              formik.errors.medications?.[index]?.dosage ? (
                <div style={styles.error}>
                  {formik.errors.medications[index].dosage}
                </div>
              ) : null}
            </label>
            <label style={styles.label}>
              Frequency:
              <input
                type="text"
                name={`medications[${index}].frequency`}
                value={medication.frequency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={styles.input}
              />
              {formik.touched.medications?.[index]?.frequency &&
              formik.errors.medications?.[index]?.frequency ? (
                <div style={styles.error}>
                  {formik.errors.medications[index].frequency}
                </div>
              ) : null}
            </label>
            <button
              type="button"
              onClick={() => removeMedication(index)}
              style={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addMedication} style={styles.addButton}>
          Add Medication
        </button>

        {/* Vaccinations */}
        <h3 style={styles.subHeading}>Vaccinations</h3>
        {formik.values.vaccinations.map((vaccination, index) => (
          <div key={index} style={styles.vaccinationContainer}>
            <label style={styles.label}>
              Vaccine Name:
              <input
                type="text"
                name={`vaccinations[${index}].name`}
                value={vaccination.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={styles.input}
              />
              {formik.touched.vaccinations?.[index]?.name &&
              formik.errors.vaccinations?.[index]?.name ? (
                <div style={styles.error}>
                  {formik.errors.vaccinations[index].name}
                </div>
              ) : null}
            </label>
            <label style={styles.label}>
              Date Given:
              <input
                type="date"
                name={`vaccinations[${index}].dateGiven`}
                value={vaccination.dateGiven}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={styles.input}
              />
              {formik.touched.vaccinations?.[index]?.dateGiven &&
              formik.errors.vaccinations?.[index]?.dateGiven ? (
                <div style={styles.error}>
                  {formik.errors.vaccinations[index].dateGiven}
                </div>
              ) : null}
            </label>
            <label style={styles.label}>
              Next Due Date:
              <input
                type="date"
                name={`vaccinations[${index}].nextDueDate`}
                value={vaccination.nextDueDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={styles.input}
              />
              {formik.touched.vaccinations?.[index]?.nextDueDate &&
              formik.errors.vaccinations?.[index]?.nextDueDate ? (
                <div style={styles.error}>
                  {formik.errors.vaccinations[index].nextDueDate}
                </div>
              ) : null}
            </label>
            <button
              type="button"
              onClick={() => removeVaccination(index)}
              style={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addVaccination} style={styles.addButton}>
          Add Vaccination
        </button>

        

        {/* Special Needs */}
        <label style={styles.label}>
          Special Needs:
          <textarea
            name="specialNeeds"
            value={formik.values.specialNeeds}
            onChange={formik.handleChange}
            style={styles.textarea}
          />
        </label>

        {/* Notes */}
        <label style={styles.label}>
          Notes:
          <textarea
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            style={styles.textarea}
          />
        </label>

        {/* Attachments */}
        <label style={styles.label}>
          Attachments:
          <input
            type="file"
            multiple
            onChange={handleAttachmentChange}
            style={styles.input}
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          style={styles.submitButton}
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Details"}
        </button>
      </form>

      {/* Print PDF Button */}
      <button onClick={handlePrint} style={styles.printButton}>
        Print PDF
      </button>
    </div>
  );
};

// Styles remain the same as in your original code
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  subHeading: {
    fontSize: "20px",
    fontWeight: "500",
    marginTop: "16px",
    marginBottom: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  label: {
    fontSize: "16px",
    color: "#4a5568",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e0",
    marginTop: "8px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e0",
    marginTop: "8px",
  },
  medicationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    border: "1px solid #cbd5e0",
    padding: "12px",
    borderRadius: "8px",
    position: "relative",
  },
  vaccinationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    border: "1px solid #cbd5e0",
    padding: "12px",
    borderRadius: "8px",
    position: "relative",
  },
  addButton: {
    backgroundColor: "#4299e1",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "8px",
  },
  removeButton: {
    backgroundColor: "#e53e3e",
    color: "#ffffff",
    padding: "4px 8px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    marginTop: "8px",
  },
  submitButton: {
    backgroundColor: "#48bb78",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  printButton: {
    backgroundColor: "#4299e1",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "16px",
    width: "100%",
  },
  checkbox: {
    marginLeft: "8px",
  },
  error: {
    color: "#e53e3e",
    fontSize: "14px",
    marginTop: "4px",
  },
};

export default PetMedicalDetailsForm;