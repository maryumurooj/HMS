import React, { useState } from "react";
import departmentMasterSchema from "./departmentMasterSchema.json";
import DynamicForm from "../../../components/YasirdynamicForm";
import { Paper, Snackbar, Alert, CircularProgress } from "@mui/material";
import departmentService from "../../../services/departmentService";

const DepartmentMaster = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      console.log("Submitting department data:", formData);

      // Convert string values to appropriate types and ensure field names match
      const processedData = {
        departmentCd: formData.departmentCd,
        departmentName: formData.departmentName,
        medical: Boolean(formData.medical),
        medicalOptions: formData.medicalOptions,
        inchargeCd: formData.inchargeCd,
        contactNo1: formData.contactNo1,
        contactNo2: formData.contactNo2,
        costCenterCd: formData.costCenterCd,
        departmentNo: formData.departmentNo
          ? Number(formData.departmentNo)
          : null,
        s1: formData.s1,
        s2: formData.s2,
        gstNo: formData.gstNo,
        serviceTaxRequired: Boolean(formData.serviceTaxRequired),
        serviceTaxExempted: Boolean(formData.serviceTaxExempted),
        taxTemp: formData.taxTemp,
        active: Boolean(formData.active),
        printSetting: formData.printSetting,
        showPendingInvestigations: Boolean(formData.showPendingInvestigations),
        showDoneByDoctor2Field: Boolean(formData.showDoneByDoctor2Field),
        isPediatric: Boolean(formData.isPediatric),
        showTreatedWard: Boolean(formData.showTreatedWard),
        showBloodBankIndents: Boolean(formData.showBloodBankIndents),
      };

      const response = await departmentService.createDepartment(processedData);
      console.log("Server response:", response);

      setAlert({
        open: true,
        message: "Department saved successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error saving department:", error);
      setAlert({
        open: true,
        message: error.message || "Error saving department",
        severity: "error",
      });
    } finally {
      setLoading(false);
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
        position: "relative",
      }}
    >
      {loading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      <DynamicForm
        formSchema={departmentMasterSchema}
        onSubmit={handleFormSubmit}
        disabled={loading}
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
