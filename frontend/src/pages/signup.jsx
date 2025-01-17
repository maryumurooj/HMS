// Example for Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Roles exactly matching backend ENUM values
  const roles = [
    { value: "admin", label: "Admin" },
    { value: "doctor", label: "Doctor" },
    { value: "nurse", label: "Nurse" },
    { value: "receptionist", label: "Receptionist" },
    { value: "patient", label: "Patient" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    // Username validation (3-50 characters)
    if (
      !formData.username ||
      formData.username.length < 3 ||
      formData.username.length > 50
    ) {
      setError("Username must be between 3 and 50 characters");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation matching backend requirements
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
      );
      return false;
    }

    // Password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Role validation
    if (!formData.role) {
      setError("Please select a role");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      console.log("Sending registration data:", {
        username: formData.username,
        email: formData.email,
        role: formData.role,
      });

      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration response:", response.data);
      setSuccess("Registration successful! Redirecting to login...");

      // Clear form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.error("Registration error details:", {
        message: error.response?.data?.message,
        error: error.response?.data?.error,
      });

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
      minHeight: '100vh',  // Take full viewport height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ 
          p: 4,
          width: '100%',  // Take full width of container
          maxWidth: '450px'  // Maximum width
        }}>
        <Typography component="h1" variant="h5" align="center">
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            helperText="Username must be between 3 and 50 characters"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            helperText="Password must include uppercase, lowercase, number, and special character"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Button fullWidth variant="text" onClick={() => navigate("/signin")}>
            Already have an account? Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
