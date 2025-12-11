import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  getLoanApplications,
  updateLoanStatus,
  verifyPayment,
  getDownpaymentProof,
} from '../services/loanService';
import { getAllUsers, updateUserRole } from '../services/authService';
import { LoanApplication, LoanStatus, Role, User } from '../types';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import Input from '../components/common/Input';
import ConfirmationModal from '../components/common/ConfirmationModal'; // Import ConfirmationModal
import { ROUTES } from '../constants';

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingLoans, setLoadingLoans] = useState<boolean>(true);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'loans' | 'users'>('loans');
  const [showDownpaymentModal, setShowDownpaymentModal] = useState<boolean>(false);
  const [currentDownpaymentProof, setCurrentDownpaymentProof] = useState<string | null>(null);

  // State for Confirmation Modal
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [confirmModalTitle, setConfirmModalTitle] = useState<string>('');
  const [confirmModalMessage, setConfirmModalMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const fetchLoans = useCallback(async () => {
    try {
      setLoadingLoans(true);
      const loans = await getLoanApplications();
      setLoanApplications(loans);
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    } finally {
      setLoadingLoans(false);
    }
  }, [t]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers.filter(u => u.role !== Role.SuperAdmin)); // Admins can't manage SuperAdmins
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    } finally {
      setLoadingUsers(false);
    }
  }, [t]);

  useEffect(() => {
    if (user && (user.role === Role.Admin || user.role === Role.SuperAdmin)) {
      fetchLoans();
      fetchUsers();
    } else {
      setError('Unauthorized access.');
      setLoadingLoans(false);
      setLoadingUsers(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, fetchLoans, fetchUsers]);

  const handleStatusUpdateConfirmed = useCallback(async () => {
    if (confirmAction) {
      await confirmAction();
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  }, [confirmAction]);

  const triggerLoanStatusUpdate = useCallback(
    (loanId: string, status: LoanStatus) => {
      const titleKey = status === LoanStatus.Approved ? 'confirm_modal.approve.title' : 'confirm_modal.reject.title';
      const messageKey = status === LoanStatus.Approved ? 'confirm_modal.approve.message' : 'confirm_modal.reject.message';

      setConfirmModalTitle(t(titleKey));
      setConfirmModalMessage(t(messageKey));
      setConfirmAction(() => async () => {
        setError(null);
        try {
          await updateLoanStatus(loanId, status);
          await fetchLoans(); // Refresh list
        } catch (err) {
          setError(t('common.error') + ' ' + (err as Error).message);
        }
      });
      setShowConfirmModal(true);
    },
    [fetchLoans, t],
  );

  const handleVerifyPayment = useCallback(
    async (loanId: string) => {
      setError(null);
      try {
        await verifyPayment(loanId);
        alert(t('common.success') + ' Payment verified for loan ' + loanId);
        // Optionally update loan status to 'Paid' if this action implies full payment
        // await updateLoanStatus(loanId, LoanStatus.Paid);
        await fetchLoans(); // Refresh list
      } catch (err) {
        setError(t('common.error') + ' ' + (err as Error).message);
      }
    },
    [fetchLoans, t],
  );

  const handleViewDownpaymentProof = useCallback(
    async (loanId: string) => {
      setError(null);
      try {
        const imageUrl = await getDownpaymentProof(loanId);
        setCurrentDownpaymentProof(imageUrl);
        setShowDownpaymentModal(true);
      } catch (err) {
        setError(t('common.error') + ' ' + (err as Error).message);
      }
    },
    [t],
  );

  const handleUpdateUserRole = useCallback(async (userId: string, newRole: Role) => {
    setError(null);
    try {
      await updateUserRole(userId, newRole);
      await fetchUsers();
      alert(t('common.success') + ` User role updated to ${newRole}.`);
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    }
  }, [fetchUsers, t]);


  if (!user || (user.role !== Role.Admin && user.role !== Role.SuperAdmin)) {
    return (
      <div className="text-center py-8 text-red-600">
        {error || 'You do not have permission to view this page.'}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-[#444444] mb-6 text-center">
        {t('dashboard.admin.title')}
      </h2>

      {error && (
        <div className="bg-[#FFE5E6] border border-[#C6001E] text-[#C6001E] px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* Tabs for navigation */}
      <div className="border-b-2 border-[#E5E5E5] mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('loans')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'loans'
                ? 'border-[#EE1C25] text-[#EE1C25]'
                : 'border-transparent text-[#777777] hover:text-[#444444] hover:border-[#E5E5E5]'
              }`}
          >
            {t('dashboard.loan_applications')}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'users'
                ? 'border-[#EE1C25] text-[#EE1C25]'
                : 'border-transparent text-[#777777] hover:text-[#444444] hover:border-[#E5E5E5]'
              }`}
          >
            {t('dashboard.user_management')}
          </button>
        </nav>
      </div>

      {activeTab === 'loans' && (
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-[#444444] mb-4">
            {t('dashboard.loan_applications')}
          </h3>
          {loadingLoans ? (
            <p className="text-[#777777]">{t('common.loading')} {t('dashboard.loan_applications')}...</p>
          ) : loanApplications.length === 0 ? (
            <p className="text-[#777777]">No loan applications found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-[#E5E5E5]">
                <thead className="bg-[#F5F5F5]">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-[#777777] uppercase tracking-wider border-b border-[#E5E5E5]">
                      ID
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-[#777777] uppercase tracking-wider border-b border-[#E5E5E5]">
                      Borrower
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-[#777777] uppercase tracking-wider border-b border-[#E5E5E5]">
                      Amount
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-[#777777] uppercase tracking-wider border-b border-[#E5E5E5]">
                      Method
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-[#777777] uppercase tracking-wider border-b border-[#E5E5E5]">
                      {t('common.status')}
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-[#777777] uppercase tracking-wider border-b border-[#E5E5E5]">
                      {t('common.action')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {loanApplications.map((loan) => (
                    <tr key={loan.id} className="hover:bg-[#F5F5F5] transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-[#444444]">
                        {loan.id}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-[#777777]">
                        {loan.fullName} ({loan.phoneNumber})
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-[#777777]">
                        BDT {loan.loanAmount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-[#777777]">
                        {loan.downpaymentMethod}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${
                              loan.status === LoanStatus.Approved
                                ? 'bg-green-100 text-green-800'
                                : loan.status === LoanStatus.Rejected
                                  ? 'bg-[#FFE5E6] text-[#C6001E]'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {loan.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-wrap gap-2">
                          {loan.status === LoanStatus.Pending && (
                            <>
                              <Button
                                onClick={() => triggerLoanStatusUpdate(loan.id, LoanStatus.Approved)}
                                variant="primary"
                                size="sm"
                              >
                                {t('common.approve')}
                              </Button>
                              <Button
                                onClick={() => triggerLoanStatusUpdate(loan.id, LoanStatus.Rejected)}
                                variant="danger"
                                size="sm"
                              >
                                {t('common.reject')}
                              </Button>
                            </>
                          )}
                          <Button
                            onClick={() => handleViewDownpaymentProof(loan.id)}
                            variant="secondary"
                            size="sm"
                          >
                            {t('common.view_proof')}
                          </Button>
                          {/* Payment verification is separate from loan approval */}
                          <Button
                            onClick={() => handleVerifyPayment(loan.id)}
                            variant="outline"
                            size="sm"
                          >
                            {t('common.verify_payment')}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {activeTab === 'users' && (
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            {t('dashboard.user_management')}
          </h3>
          {loadingUsers ? (
            <p className="text-gray-600">{t('common.loading')} {t('dashboard.user_management')}...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-600">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      ID
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Email
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Role
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      {t('common.action')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {u.id}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                        {u.fullName}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                        {u.email}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                        <Select
                          id={`user-role-${u.id}`}
                          value={u.role}
                          onChange={(e) => handleUpdateUserRole(u.id, e.target.value as Role)}
                          options={[
                            { value: Role.User, label: 'User' },
                            { value: Role.Admin, label: 'Admin' },
                          ]}
                          className="!py-1 !px-2 text-xs"
                          disabled={u.id === user.id} // Cannot change own role
                        />
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                        {/* More actions like "Add Balance" */}
                        <Button variant="secondary" size="sm" onClick={() => alert(`Add balance for ${u.fullName}`)}>
                          {t('common.add_balance')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Downpayment Proof Modal */}
      {showDownpaymentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            <h3 className="text-xl font-bold mb-4">Downpayment Screenshot</h3>
            {currentDownpaymentProof ? (
              <img
                src={currentDownpaymentProof}
                alt="Downpayment Proof"
                className="max-w-full h-auto rounded-md"
              />
            ) : (
              <p>No image available.</p>
            )}
            <Button
              onClick={() => setShowDownpaymentModal(false)}
              className="absolute top-3 right-3"
              variant="secondary"
              size="sm"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmModal}
        title={confirmModalTitle}
        message={confirmModalMessage}
        onConfirm={handleStatusUpdateConfirmed}
        onCancel={() => { setShowConfirmModal(false); setConfirmAction(null); }}
        confirmText={t('confirm_modal.button.confirm')}
        cancelText={t('confirm_modal.button.cancel')}
      />
    </div>
  );
};

export default AdminDashboardPage;