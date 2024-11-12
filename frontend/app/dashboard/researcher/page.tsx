import React from 'react';
import UserProtectedRoute from '../../hooks/userProtectedRoute';

const ResearcherDashboard = () => {
  return (
    <UserProtectedRoute requiredRole="researcher">
  
  <div>
    <h2 className="text-2xl font-bold">Researcher Dashboard</h2>
    {/* Researcher-specific content goes here */}
  </div>

    </UserProtectedRoute>
  );
};

export default ResearcherDashboard;
