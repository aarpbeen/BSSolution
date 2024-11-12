// app/dashboard/components/DashboardLayout.tsx
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children, userName }: { children: React.ReactNode; userName: string }) => (
  <div className="flex min-h-screen bg-gray-100 font-Josefin">
    <Sidebar />
    <main className="flex-1">
      <Header userName={userName} />
      <div className="p-8">{children}</div>
    </main>
  </div>
);

export default DashboardLayout;
