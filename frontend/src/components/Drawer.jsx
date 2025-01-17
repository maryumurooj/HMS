import React from "react";
import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import RegisterIcon from "@mui/icons-material/HowToReg";
import LocalHospital from "@mui/icons-material/LocalHospital";
import TripOrigin from "@mui/icons-material/TripOrigin";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import BiotechIcon from "@mui/icons-material/Biotech";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "Registration",
    title: "Registration",
    icon: <RegisterIcon />,
  },
  {
    segment: "DoctorMaster",
    title: "DoctorMaster",
    icon: <LocalHospital />,
  },
  {
    segment: "DepartmentMaster",
    title: "DepartmentMaster",
    icon: <TripOrigin />,
  },
  {
    segment: "WardtMaster",
    title: "WardMaster",
    icon: <BedroomChildIcon />,
  },
  {
    segment: "PackageMaster",
    title: "PackageMaster",
    icon: <BiotechIcon />,
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const StyledDrawer = styled(MUIDrawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    marginTop: 64,
    height: "calc(100% - 64px)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

const Drawer = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <StyledDrawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      <DrawerHeader>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {NAVIGATION.map((item) => {
          if (item.kind === "header") {
            return (
              <ListItem key={item.title}>
                <ListItemText primary={item.title} />
              </ListItem>
            );
          }
          return (
            <ListItem
              button
              key={item.title}
              onClick={() => {
                navigate(`/${item.segment}`);
                toggleDrawer(); // Close drawer after navigation
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </StyledDrawer>
  );
};

export default Drawer;
