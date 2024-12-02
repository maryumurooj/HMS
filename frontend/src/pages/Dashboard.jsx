import React from 'react';
import Drawer from '../components/Drawer';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Drawer */}
      <Drawer />

      {/* Page Content */}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet /> {/* This renders the current page based on routing */}
      </div>
    </div>
  );
};

export default DashboardLayout;
