import React, { useState } from "react";
import doctorRegistrationSchema from "./doctorRegistrationSchema.json";
import DynamicForm from "../dynamicForm";
import { Box, Snackbar, Alert } from "@mui/material";
import doctorService from "../../services/doctorService";

const DoctorRegistration = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <DynamicForm
        formSchema={doctorRegistrationSchema}
        onSubmit={handleFormSubmit}
      />
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
    </Box>
  );
};

export default DoctorRegistration;
