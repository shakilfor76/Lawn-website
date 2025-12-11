import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getLoanApplications } from '../services/loanService';
import { LoanApplication, Role } from '../types';
import Button from '../components/common/Button';
import Logo from '../components/common/Logo';
import DashboardCard from '../components/common/DashboardCard';
import BottomNavigationBar from '../components/common/BottomNavigationBar';
import Slideshow from '../components/common/Slideshow';
import { ROUTES, SLIDESHOW_IMAGES } from '../constants';
import {
  FaSignOutAlt,
  FaHome,
  FaMoneyBillWave,
  FaClipboardList,
  FaUserCircle,
  FaDollarSign,
  FaInbox,
  FaCreditCard, // For EMI
  FaMoneyBillAlt // For Withdrawal
} from 'react-icons/fa';

const UserDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showImportantInstructionsModal, setShowImportantInstructionsModal] = useState<boolean>(true); // Show on initial load

  const currentPath = window.location.hash.substring(1) || ROUTES.HOME;

  useEffect(() => {
    if (!user || user.role !== Role.User) {
      setError('Unauthorized access.');
      setLoading(false);
      return;
    }

    const fetchUserLoans = async () => {
      try {
        setLoading(true);
        const loans = await getLoanApplications(user.id);
        setLoanApplications(loans);
      } catch (err) {
        setError(t('common.error') + ' ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLoans();
  }, [user, t]);

  if (!user || user.role !== Role.User) {
    return (
      <div className="text-center py-8 text-red-600">
        {error || 'You do not have permission to view this page.'}
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.hash = ROUTES.HOME;
  };

  const dashboardCards = [
    { icon: <FaClipboardList />, label: t('dashboard.loan_application_card'), path: ROUTES.APPLY_LOAN },
    { icon: <FaMoneyBillWave />, label: t('dashboard.cash_out_card'), path: ROUTES.CASH_OUT },
    { icon: <FaDollarSign />, label: t('dashboard.my_loans_card'), path: ROUTES.DASHBOARD },
    { icon: <FaUserCircle />, label: t('dashboard.profile_card'), path: ROUTES.DASHBOARD },
    { icon: <FaCreditCard />, label: t('dashboard.emi_card'), path: ROUTES.CALCULATOR }, // EMI could link to calculator or a dedicated page
    { icon: <FaMoneyBillAlt />, label: t('dashboard.withdrawal_card'), path: ROUTES.CASH_OUT }, // Withdrawal could link to cash out or a separate page
  ];

  const bottomNavItems = [
    { icon: <FaHome />, label: 'nav.home', path: ROUTES.HOME },
    { icon: <FaClipboardList />, label: 'nav.bottom.loan', path: ROUTES.APPLY_LOAN },
    { icon: <FaInbox />, label: 'nav.bottom.inbox', path: '#inbox' }, // Placeholder for inbox
    { icon: <FaUserCircle />, label: 'dashboard.profile_card', path: ROUTES.DASHBOARD },
  ];

  return (
    <div className="relative min-h-screen pb-20 bg-[#F5F5F5]">
      {/* Top Bar (CL65 Brand) */}
      <div className="bg-[#EE1C25] text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Logo size="sm" className="mr-3" />
          <div>
            <p className="text-lg font-bold">{user.fullName}</p>
            <p className="text-xs text-[#FFE5E6]">{t('dashboard.tap_to_balance')}</p>
          </div>
        </div>
        <Button onClick={handleLogout} variant="secondary-outline" size="sm" className="bg-white bg-opacity-10 hover:bg-opacity-20">
          <FaSignOutAlt className="mr-1" /> {t('nav.logout')}
        </Button>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Slideshow Section */}
        <section className="mb-8">
          <Slideshow 
            images={SLIDESHOW_IMAGES} 
            interval={5000}
            className="rounded-lg shadow-lg h-[200px] md:h-[300px]"
          />
        </section>

        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          {t('welcome.sir')}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {t('dashboard.welcome_subtitle')}
        </p>

        {/* Apply Loan Button (Prominent) */}
        <div className="text-center mb-8">
          <Button onClick={() => window.location.hash = ROUTES.APPLY_LOAN} size="lg" className="min-w-[200px]" icon={<FaClipboardList />}>
            {t('nav.apply_loan')}
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-gray-700">
            {t('common.loading')} {t('dashboard.loan_applications')}...
          </div>
        ) : (
          <>
            {/* Dashboard Grid */}
            <section className="mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {dashboardCards.map((card, index) => (
                  <DashboardCard key={index} {...card} />
                ))}
              </div>
            </section>

            {/* City Bank Loan Offer Banner with Video */}
            <section className="mb-8 p-6 bg-[#EE1C25] rounded-lg shadow-lg text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* City Bank Image */}
                <div className="flex-1 w-full">
                  <img 
                    src="/images/citybank-loan-banner.png" 
                    alt="City Bank Instant Loan" 
                    className="w-full h-auto rounded-lg shadow-md"
                    onError={(e) => {
                      // Fallback styling if image doesn't load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                
                {/* Show More Button with Video Link */}
                <div className="flex-shrink-0 text-center">
                  <a 
                    href="https://youtu.be/V-exidDtkMM?si=_9wXRrl6HmA48b4V" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="bg-white text-[#EE1C25] hover:bg-[#F5F5F5] font-bold shadow-lg transform hover:scale-105 transition-transform"
                    >
                      {t('common.show_more') || 'Show More'} 📹
                    </Button>
                  </a>
                  <p className="text-xs mt-2 text-[#FFE5E6]">{t('dashboard.watch_video') || 'Watch our video guide'}</p>
                </div>
              </div>
            </section>

            {/* Our Partners Section */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-[#444444] mb-6 text-center">
                {t('dashboard.our_partners')}
              </h3>
              <div className="flex justify-center items-center gap-8 flex-wrap bg-white p-6 rounded-lg shadow-md">
                {/* City Bank */}
                <div className="flex flex-col items-center p-4 hover:transform hover:scale-105 transition-transform">
                  <div className="w-24 h-24 flex items-center justify-center bg-white rounded-lg shadow-sm border-2 border-[#E5E5E5]">
                    <div className="text-center">
                      <div className="text-[#EE1C25] font-bold text-2xl">city bank</div>
                      <div className="text-[#777777] text-xs">making sense of money</div>
                    </div>
                  </div>
                  <p className="text-[#444444] text-sm font-medium mt-2">City Bank</p>
                </div>
                
                {/* City Touch */}
                <div className="flex flex-col items-center p-4 hover:transform hover:scale-105 transition-transform">
                  <div className="w-24 h-24 flex items-center justify-center bg-white rounded-lg shadow-sm border-2 border-[#E5E5E5]">
                    <div className="text-center">
                      <div className="text-[#EE1C25] font-bold text-xl">City</div>
                      <div className="text-[#444444] font-semibold text-lg">Touch</div>
                    </div>
                  </div>
                  <p className="text-[#444444] text-sm font-medium mt-2">City Touch</p>
                </div>
                
                {/* bKash */}
                <div className="flex flex-col items-center p-4 hover:transform hover:scale-105 transition-transform">
                  <div className="w-24 h-24 flex items-center justify-center bg-[#E2136E] rounded-lg shadow-sm">
                    <div className="text-white font-bold text-2xl">bKash</div>
                  </div>
                  <p className="text-[#444444] text-sm font-medium mt-2">bKash</p>
                </div>
              </div>
            </section>

            {/* User's Loan Applications */}
            <section className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {t('dashboard.my_loans')}
              </h3>
              {loanApplications.length === 0 ? (
                <p className="text-gray-600">You have no loan applications yet.</p>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          ID
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          {t('calculator.loan_amount')}
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          {t('calculator.loan_duration')}
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          EMI
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          {t('common.status')}
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Applied At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loanApplications.map((loan) => (
                        <tr key={loan.id}>
                          <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                            {loan.id}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                            BDT {loan.loanAmount.toLocaleString()}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                            {loan.loanDuration} Months
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                            BDT {loan.emiAmount?.toLocaleString() || 'N/A'}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${
                                  loan.status === 'Approved'
                                    ? 'bg-green-100 text-green-800'
                                    : loan.status === 'Rejected'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                }`}
                            >
                              {loan.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                            {new Date(loan.appliedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>

      {/* Important Instructions Modal */}
      {showImportantInstructionsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative text-center">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {t('modal.important_instructions.title')}
            </h3>
            <p className="text-gray-700 mb-6">
              {t('modal.important_instructions.text')}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => { window.location.hash = ROUTES.HOME; setShowImportantInstructionsModal(false); }} variant="outline" size="sm">
                {t('modal.important_instructions.view_details')}
              </Button>
              <Button onClick={() => setShowImportantInstructionsModal(false)} variant="primary" size="sm">
                {t('modal.important_instructions.understood')}
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigationBar items={bottomNavItems} currentPath={currentPath} />
    </div>
  );
};

export default UserDashboardPage;