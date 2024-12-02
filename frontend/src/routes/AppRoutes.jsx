import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/Dashboard';
import DoctorMaster from '../pages/masters/MasterDoctor/doctorMaster';
import Registration from '../pages/transactions/Registration/Registration';
import DepartmentMaster from '../pages/masters/MasterDepartment/departmentMaster';
import WardtMaster from '../pages/masters/MasterWard/wardMaster';
import PackageMaster from '../pages/masters/MasterPackage/masterPackage';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="Registration" element={<Registration />} />
        <Route path="DoctorMaster" element={<DoctorMaster />} />
        <Route path="DepartmentMaster" element={<DepartmentMaster />} />
        <Route path="WardtMaster" element={<WardtMaster />} />
        <Route path="PackageMaster" element={<PackageMaster />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;
