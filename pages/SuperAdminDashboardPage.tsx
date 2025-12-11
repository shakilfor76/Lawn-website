import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getLoanLimits, updateLoanLimits, getPaymentNumbers, updatePaymentNumbers } from '../services/loanService';
import { getAllUsers, updateUserRole } from '../services/authService';
import { LoanLimits, PaymentNumbers, Role, User } from '../types';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { ROUTES } from '../constants';

const SuperAdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loanLimits, setLoanLimits] = useState<LoanLimits>({ min: 0, max: 0 });
  const [paymentNumbers, setPaymentNumbers] = useState<PaymentNumbers>({ bKash: '', Nagad: '', Rocket: '' });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'settings' | 'admins'>('settings');

  const fetchSettingsAndUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const limits = await getLoanLimits();
      const numbers = await getPaymentNumbers();
      const fetchedUsers = await getAllUsers();

      setLoanLimits(limits);
      setPaymentNumbers(numbers);
      setUsers(fetchedUsers.filter(u => u.role !== Role.SuperAdmin)); // SuperAdmin can manage Users and Admins
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (user && user.role === Role.SuperAdmin) {
      fetchSettingsAndUsers();
    } else {
      setError('Unauthorized access.');
      setLoading(false);
    }
  }, [user, fetchSettingsAndUsers]);

  const handleUpdateLoanLimits = async () => {
    setError(null);
    setSuccess(null);
    try {
      await updateLoanLimits(loanLimits.min, loanLimits.max);
      setSuccess(t('common.success') + ' Loan limits updated successfully!');
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    }
  };

  const handleUpdatePaymentNumbers = async () => {
    setError(null);
    setSuccess(null);
    try {
      await updatePaymentNumbers(paymentNumbers);
      setSuccess(t('common.success') + ' Payment numbers updated successfully!');
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    }
  };

  const handleUpdateUserRole = useCallback(async (userId: string, newRole: Role) => {
    setError(null);
    setSuccess(null);
    try {
      await updateUserRole(userId, newRole);
      setSuccess(t('common.success') + ` User role updated to ${newRole}.`);
      await fetchSettingsAndUsers(); // Refresh user list
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    }
  }, [fetchSettingsAndUsers, t]);


  if (!user || user.role !== Role.SuperAdmin) {
    return (
      <div className="text-center py-8 text-[#C6001E]">
        {error || 'You do not have permission to view this page.'}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8 text-[#444444]">
        {t('common.loading')} {t('dashboard.settings')} & {t('dashboard.user_management')}...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-[#444444] mb-6 text-center">
        {t('dashboard.super_admin.title')}
      </h2>

      {error && (
        <div className="bg-[#FFE5E6] border border-[#C6001E] text-[#C6001E] px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {success}
        </div>
      )}

      {/* Tabs for navigation */}
      <div className="border-b-2 border-[#E5E5E5] mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('settings')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'settings'
                ? 'border-[#EE1C25] text-[#EE1C25]'
                : 'border-transparent text-[#777777] hover:text-[#444444] hover:border-[#E5E5E5]'
              }`}
          >
            {t('dashboard.settings')}
          </button>
          <button
            onClick={() => setActiveTab('admins')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'admins'
                ? 'border-[#EE1C25] text-[#EE1C25]'
                : 'border-transparent text-[#777777] hover:text-[#444444] hover:border-[#E5E5E5]'
              }`}
          >
            {t('dashboard.admin_management')}
          </button>
        </nav>
      </div>

      {activeTab === 'settings' && (
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-[#444444] mb-4">
            {t('dashboard.loan_limits')}
          </h3>
          <div className="bg-[#F5F5F5] p-6 rounded-md shadow-inner mb-8 border border-[#E5E5E5]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="minLoanAmount"
                label={t('common.min') + ' ' + t('calculator.loan_amount')}
                type="number"
                value={loanLimits.min}
                onChange={(e) => setLoanLimits({ ...loanLimits, min: parseFloat(e.target.value) })}
              />
              <Input
                id="maxLoanAmount"
                label={t('common.max') + ' ' + t('calculator.loan_amount')}
                type="number"
                value={loanLimits.max}
                onChange={(e) => setLoanLimits({ ...loanLimits, max: parseFloat(e.target.value) })}
              />
            </div>
            <Button onClick={handleUpdateLoanLimits} className="mt-4" variant="primary">
              {t('common.save')} {t('dashboard.loan_limits')}
            </Button>
          </div>

          <h3 className="text-2xl font-semibold text-[#444444] mb-4">
            {t('dashboard.payment_numbers')}
          </h3>
          <div className="bg-[#F5F5F5] p-6 rounded-md shadow-inner border border-[#E5E5E5]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                id="bKashNumber"
                label="bKash Number"
                type="text"
                value={paymentNumbers.bKash}
                onChange={(e) => setPaymentNumbers({ ...paymentNumbers, bKash: e.target.value })}
              />
              <Input
                id="nagadNumber"
                label="Nagad Number"
                type="text"
                value={paymentNumbers.Nagad}
                onChange={(e) => setPaymentNumbers({ ...paymentNumbers, Nagad: e.target.value })}
              />
              <Input
                id="rocketNumber"
                label="Rocket Number"
                type="text"
                value={paymentNumbers.Rocket}
                onChange={(e) => setPaymentNumbers({ ...paymentNumbers, Rocket: e.target.value })}
              />
            </div>
            <Button onClick={handleUpdatePaymentNumbers} className="mt-4" variant="primary">
              {t('common.save')} {t('dashboard.payment_numbers')}
            </Button>
          </div>
        </section>
      )}

      {activeTab === 'admins' && (
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            {t('dashboard.admin_management')}
          </h3>
          {users.length === 0 ? (
            <p className="text-gray-600">No users found to manage roles.</p>
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
                      Current Role
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      New Role
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
                        {u.role}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                        <Select
                          id={`user-role-select-${u.id}`}
                          value={u.role}
                          onChange={(e) => handleUpdateUserRole(u.id, e.target.value as Role)}
                          options={[
                            { value: Role.User, label: 'User' },
                            { value: Role.Admin, label: 'Admin' },
                          ]}
                          className="!py-1 !px-2 text-xs"
                          disabled={u.id === user.id || u.role === Role.SuperAdmin} // Cannot change own role or SuperAdmin's role
                        />
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          onClick={() => handleUpdateUserRole(u.id, u.role === Role.Admin ? Role.User : Role.Admin)}
                          variant="secondary"
                          size="sm"
                          disabled={u.id === user.id || u.role === Role.SuperAdmin}
                        >
                          {u.role === Role.Admin ? 'Demote to User' : 'Promote to Admin'}
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
    </div>
  );
};

export default SuperAdminDashboardPage;