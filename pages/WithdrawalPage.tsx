import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ROUTES } from '../constants';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Logo from '../components/common/Logo';
import { FaMoneyBillWave, FaPhone, FaTimes } from 'react-icons/fa';
import { GiPayMoney } from 'react-icons/gi';

// Using visually appealing placeholder images for bKash, Nagad, Rocket
const BkashIcon = () => <img src="https://via.placeholder.com/40x40/E11961/FFFFFF?text=bK" alt="bKash" className="w-10 h-10 rounded-full" />;
const NagadIcon = () => <img src="https://via.placeholder.com/40x40/FF7F27/FFFFFF?text=NG" alt="Nagad" className="w-10 h-10 rounded-full" />;
const RocketIcon = () => <img src="https://via.placeholder.com/40x40/8D2C8E/FFFFFF?text=RK" alt="Rocket" className="w-10 h-10 rounded-full" />;


const WithdrawalPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(0);
  const [yourNumber, setYourNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!user) {
      setError(t('common.error') + ' ' + t('common.login_required'));
      window.location.hash = ROUTES.LOGIN;
      setLoading(false);
      return;
    }

    if (amount <= 0 || !yourNumber) {
      setError(t('common.error') + ' ' + t('common.fill_all_required_fields'));
      setLoading(false);
      return;
    }

    try {
      // Simulate withdrawal request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Withdrawal request: User ${user.id}, Amount: ${amount}, Number: ${yourNumber}`);
      setSuccess(t('common.success') + ' ' + 'Your withdrawal request has been submitted.'); // Placeholder success message
      setAmount(0);
      setYourNumber('');
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    // Redirect to login or show unauthorized message
    window.location.hash = ROUTES.LOGIN;
    return null;
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pb-4">
      {/* Top Bar for this page (similar to dashboard) */}
      <div className="w-full bg-blue-700 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Logo size="sm" className="mr-3" />
          <p className="text-lg font-bold">{t('withdrawal.title')}</p>
        </div>
        <Button onClick={() => window.location.hash = ROUTES.DASHBOARD} variant="secondary-outline" size="sm">
          <FaTimes />
        </Button>
      </div>

      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mt-4 md:mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {t('withdrawal.title')}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            {success}
          </div>
        )}

        {/* Payment Method Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="flex flex-col items-center text-gray-600">
            <BkashIcon />
            <span className="text-sm">bKash</span>
          </div>
          <div className="flex flex-col items-center text-gray-600">
            <NagadIcon />
            <span className="text-sm">Nagad</span>
          </div>
          <div className="flex flex-col items-center text-gray-600">
            <RocketIcon />
            <span className="text-sm">Rocket</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            id="amount"
            label={t('withdrawal.amount')}
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            required
            icon={<FaMoneyBillWave />}
            min="1"
            aria-label={t('withdrawal.amount')}
          />
          <Input
            id="yourNumber"
            label={t('withdrawal.your_number')}
            type="tel"
            value={yourNumber}
            onChange={(e) => setYourNumber(e.target.value)}
            required
            icon={<FaPhone />}
            aria-label={t('withdrawal.your_number')}
          />
          <Button type="submit" className="w-full mt-6" disabled={loading} icon={<GiPayMoney className="text-lg" />}>
            {loading ? t('common.loading') : t('withdrawal.submit')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalPage;