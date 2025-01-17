import React, { useState } from "react";
import Drawer from "../components/Drawer";
import { Outlet, useLocation } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RegisterIcon from "@mui/icons-material/HowToReg";
import LocalHospital from "@mui/icons-material/LocalHospital";
import TripOrigin from "@mui/icons-material/TripOrigin";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import BiotechIcon from "@mui/icons-material/Biotech";
import { useNavigate } from "react-router-dom";

const DASHBOARD_ITEMS = [
  {
    title: "Dashboard",
    icon: <DashboardIcon sx={{ fontSize: 40 }} />,
    description: "Overview and statistics",
    path: "/dashboard",
  },
  {
    title: "Registration",
    icon: <RegisterIcon sx={{ fontSize: 40 }} />,
    description: "Patient registration management",
    path: "/Registration",
  },
  {
    title: "Doctor Master",
    icon: <LocalHospital sx={{ fontSize: 40 }} />,
    description: "Manage doctor information",
    path: "/DoctorMaster",
  },
  {
    title: "Department Master",
    icon: <TripOrigin sx={{ fontSize: 40 }} />,
    description: "Department configuration",
    path: "/DepartmentMaster",
  },
  {
    title: "Ward Master",
    icon: <BedroomChildIcon sx={{ fontSize: 40 }} />,
    description: "Ward management system",
    path: "/WardtMaster",
  },
  {
    title: "Package Master",
    icon: <BiotechIcon sx={{ fontSize: 40 }} />,
    description: "Medical package management",
    path: "/PackageMaster",
  },
];

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainDashboard = location.pathname === "/dashboard";
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <div style={{ display: "flex" }}>
      <Drawer open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Add margin top to account for the fixed header
          backgroundColor: "#f5f5f5",
          minHeight: "min-content",
        }}
      >
        {isMainDashboard ? (
          <Grid container spacing={3} padding={2}>
            {DASHBOARD_ITEMS.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(item.path)}
                    sx={{ height: "100%" }}
                  >
                    <CardContent
                      sx={{
                        textAlign: "center",
                        padding: 3,
                      }}
                    >
                      <Box sx={{ mb: 2 }}>{item.icon}</Box>
                      <Typography variant="h6" component="div" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Outlet />
        )}
      </Box>
    </div>
  );
};

export default DashboardLayout;
