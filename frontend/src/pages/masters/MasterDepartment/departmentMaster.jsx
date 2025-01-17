import React, { useState } from "react";
import departmentMasterSchema from "./departmentMasterSchema.json";
import DynamicForm from "../../../components/YasirdynamicForm";
import { Paper, Snackbar, Alert } from "@mui/material";

const DepartmentMaster = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleFormSubmit = (formData) => {
    try {
      console.log("Submitted Data:", formData);
      setAlert({
        open: true,
        message: "Department saved successfully!",
        severity: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message || "Error saving department",
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
        formSchema={departmentMasterSchema}
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

export default DepartmentMaster;
