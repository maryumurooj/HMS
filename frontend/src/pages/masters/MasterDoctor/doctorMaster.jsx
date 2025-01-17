import React, { useState, useEffect } from "react";
import doctorRegistrationSchema from "./doctorRegistrationSchema.json";
import DynamicForm from "../../../components/YasirdynamicForm";
import { Box, Snackbar, Alert, Paper } from "@mui/material";
import doctorService from "../../../services/doctorService";

const DoctorRegistration = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [schema, setSchema] = useState(doctorRegistrationSchema);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitals = await doctorService.getHospitals();

        // Create a deep copy of the schema
        const updatedSchema = JSON.parse(JSON.stringify(schema));

        // Find the Professional Details section
        const professionalSection = updatedSchema.sections.find(
          (section) => section.sectionTitle === "Professional Details"
        );

        // Find the hospital field and update its options
        const hospitalField = professionalSection.fields.find(
          (field) => field.name === "hospital_id"
        );

        // Update the options with the fetched hospitals
        hospitalField.options = hospitals.map((hospital) => ({
          label: hospital.name,
          value: hospital.id,
        }));

        setSchema(updatedSchema);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      const transformedData = {
        ...formData,
        consultationType: Array.isArray(formData.consultationType)
          ? formData.consultationType
          : [formData.consultationType],
        languages: Array.isArray(formData.languages)
          ? formData.languages
          : [formData.languages],
        medicalLicense: formData.medicalLicense
          ? formData.medicalLicense[0]
          : null,
        documents: formData.documents ? Array.from(formData.documents) : [],
        hospital_id: formData.hospital_id,
      };

      const response = await doctorService.createDoctor(transformedData);

      setAlert({
        open: true,
        message: "Doctor registered successfully!",
        severity: "success",
      });

      console.log("API Response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlert({
        open: true,
        message: error.message || "Error registering doctor",
        severity: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <Paper
      elevation={3}
      variant="outlined"
      sx={{
        minWidth: "90dvw",
        maxHeight: "90dvh",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      <DynamicForm formSchema={schema} onSubmit={handleFormSubmit} />
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default DoctorRegistration;
