import React, { useState } from "react";
import DynamicForm from "../../../components/YasirdynamicForm";
import formSchema from "./RegistrationSchema.json";
import { Paper, Snackbar, Alert } from "@mui/material";

const Registration = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleFormSubmit = (formData) => {
    try {
      console.log("Form Submitted:", formData);
      setAlert({
        open: true,
        message: "Registration completed successfully!",
        severity: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message || "Error in registration",
        severity: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <Paper elevation={3} variant="outlined" sx={{ minWidth: "90dvw", maxHeight: "90dvh", margin: "0 auto", padding: "10px" }}>
      <DynamicForm
        formSchema={formSchema}
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
    </Paper>
  );
};

export default Registration;