import React from 'react';
import UserProtectedRoute from '@/app/hooks/userProtectedRoute';

const StudentDashboard = () => {
  return (
     <UserProtectedRoute requiredRole='student'>
      <div>
        <h1>Student Dashboard</h1>
        {/* Admin content */}
      </div>
      </UserProtectedRoute>
  )
   
};

export default StudentDashboard;
