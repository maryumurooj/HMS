import React, { useState } from 'react';
import Drawer from '../components/Drawer'; // Ensure correct import path
import Header from '../components/Header'; // Ensure you have Header component
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [open, setOpen] = useState(false); // Manages drawer state

  // Toggle Drawer open/close
  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header toggleDrawer={toggleDrawer} />
      
      <div>
        {/* Drawer component to manage navigation */}
        <Drawer open={open} toggleDrawer={toggleDrawer} />
        
        {/* Page Content */}
        <div
          style={{
            flexGrow: 1,
            padding: '20px',
            marginLeft: open ? 240 : 0, // Shift content when drawer is open
            transition: 'margin-left 0.2s ease', // Smooth transition
            marginTop: '64px', // Ensure content starts below header
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
