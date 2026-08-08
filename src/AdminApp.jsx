import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminLayout from './components/admin/AdminLayout';
import AppointmentsList from './components/admin/AppointmentsList';
import UpcomingAppointments from './components/admin/UpcomingAppointments';
import UserManagement from './components/admin/UserManagement';
import CustomerManagement from './components/admin/CustomerManagement';
import ChatHistory from './components/admin/ChatHistory';
import StaffMessages from './components/admin/StaffMessages';
import ContentManagement from './components/admin/ContentManagement';

function AdminContent() {
  const { currentUser, loading } = useAuth();
  const [page, setPage] = useState('appointments');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg className="animate-spin h-10 w-10 text-nature-green-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!currentUser) {
    window.location.href = '/dang-nhap';
    return null;
  }

  return (
    <AdminLayout currentPage={page} onNavigate={setPage}>
      {page === 'upcoming' && <UpcomingAppointments />}
      {page === 'appointments' && <AppointmentsList />}
      {page === 'customers' && <CustomerManagement />}
      {page === 'chat' && <ChatHistory />}
      {page === 'messages' && <StaffMessages />}
      {page === 'users' && <UserManagement />}
      {page === 'content' && <ContentManagement />}
    </AdminLayout>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}
