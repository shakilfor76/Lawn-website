import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Role } from './types';
import { ROUTES } from './constants';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import LoanCalculatorPage from './pages/LoanCalculatorPage';
import LoanApplicationPage from './pages/LoanApplicationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SuperAdminDashboardPage from './pages/SuperAdminDashboardPage';
import WithdrawalPage from './pages/WithdrawalPage';
import NotFoundPage from './pages/NotFoundPage';

// Main application component responsible for layout and routing
const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>(ROUTES.HOME);

  // Simple hash-based routing simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      setCurrentPage(hash || ROUTES.HOME);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Set initial page based on hash

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
        <div className="text-xl font-semibold text-[#444444]">{('common.loading')}...</div>
      </div>
    );
  }

  // Determine if the global Header/Footer should be rendered
  // UserDashboardPage, LoginPage, RegisterPage, WithdrawalPage will manage their own look/feel
  const hideGlobalHeaderFooter = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.DASHBOARD, 
    ROUTES.CASH_OUT,
  ].includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case ROUTES.HOME:
        return <HomePage />;
      case ROUTES.CALCULATOR:
        return <LoanCalculatorPage />;
      case ROUTES.APPLY_LOAN:
        return user ? <LoanApplicationPage /> : <LoginPage />;
      case ROUTES.LOGIN:
        return user ? <HomePage /> : <LoginPage />;
      case ROUTES.REGISTER:
        return user ? <HomePage /> : <RegisterPage />;
      case ROUTES.CASH_OUT:
        return user ? <WithdrawalPage /> : <LoginPage />;
      case ROUTES.DASHBOARD:
        if (!user) return <LoginPage />;
        if (user.role === Role.User) return <UserDashboardPage />;
        if (user.role === Role.Admin) return <AdminDashboardPage />;
        if (user.role === Role.SuperAdmin) return <SuperAdminDashboardPage />;
        return <NotFoundPage />; // Should not happen with valid roles
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {!hideGlobalHeaderFooter && <Header />}
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      {!hideGlobalHeaderFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;