// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import DashboardLayout from './components/DashboardLayout';

export default function DashboardLayoutWrapper({ children }: { children: ReactNode }) {
  const userName = "John Doe"; // Example user name, replace with dynamic data as needed

  return (
    <DashboardLayout userName={userName}>
      {children}
    </DashboardLayout>
  );
}
