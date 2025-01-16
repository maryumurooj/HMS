import React from 'react';
import { Drawer as MUIDrawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import RegisterIcon from '@mui/icons-material/HowToReg';
import LocalHospital from '@mui/icons-material/LocalHospital';
import TripOrigin from '@mui/icons-material/TripOrigin';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import BiotechIcon from '@mui/icons-material/Biotech';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'Registration',
    title: 'Registration',
    icon: <RegisterIcon />,
  },
  {
    segment: 'DoctorMaster',
    title: 'DoctorMaster',
    icon: <LocalHospital />,
  },
  {
    segment: 'DepartmentMaster',
    title: 'DepartmentMaster',
    icon: <TripOrigin />,
  },
  {
    segment: 'WardtMaster',
    title: 'WardMaster',
    icon: <BedroomChildIcon />,
  },
  {
    segment: 'PackageMaster',
    title: 'PackageMaster',
    icon: <BiotechIcon />,
  },
];

const StyledDrawer = styled(MUIDrawer)(({ theme }) => ({
  width: 240, // Full width when open
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240, // Set width of drawer
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    marginTop: 64, // Ensure drawer doesn't overlap with header
    transition: 'width 0.3s ease', // Smooth transition when opening and closing
  },
}));

const Drawer = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? 240 : 70, // Adjust width based on the `open` state
        transition: 'width 0.3s ease',
      }}
    >
      <List>
        {NAVIGATION.map((item) => {
          if (item.kind === 'header') {
            return (
              <ListItem key={item.title}>
                <ListItemText primary={item.title} />
              </ListItem>
            );
          }
          return (
            <ListItem button key={item.title} onClick={() => navigate(`/${item.segment}`)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.title} />} {/* Show text only when the drawer is open */}
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </StyledDrawer>
  );
};

export default Drawer;
