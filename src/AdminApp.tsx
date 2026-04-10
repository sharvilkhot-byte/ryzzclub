import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';

export default function AdminApp() {
  return (
    <>
      <AdminDashboard />
      <Toaster />
    </>
  );
}