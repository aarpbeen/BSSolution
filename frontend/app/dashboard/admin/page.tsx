// pages/dashboard/admin.tsx
import React from 'react';
import UserProtectedRoute from '../../hooks/userProtectedRoute';

const AdminDashboard = () => {
  return (
    <UserProtectedRoute requiredRole="admin">
      <div>
        <h1>Admin Dashboard</h1>
        {/* Admin content */}
      </div>
    </UserProtectedRoute>
  );
};

export default AdminDashboard;
