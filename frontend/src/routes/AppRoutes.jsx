// AppRoutes.jsx (updated)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/Dashboard';
import DoctorMaster from '../pages/masters/MasterDoctor/doctorMaster';
import Registration from '../pages/transactions/Registration/Registration';
import DepartmentMaster from '../pages/masters/MasterDepartment/departmentMaster';
import WardtMaster from '../pages/masters/MasterWard/wardMaster';
import PackageMaster from '../pages/masters/MasterPackage/masterPackage';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes (within DashboardLayout) */}
      <Route path="/" element={<DashboardLayout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="Registration"
          element={
            <ProtectedRoute allowedRoles={['admin', 'receptionist']}>
              <Registration />
            </ProtectedRoute>
          }
        />
        <Route
          path="DoctorMaster"
          element={
            <ProtectedRoute allowedRoles={['admin', 'doctor']}>
              <DoctorMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="DepartmentMaster"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DepartmentMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="WardtMaster"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <WardtMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="PackageMaster"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PackageMaster />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all route for invalid URLs */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
