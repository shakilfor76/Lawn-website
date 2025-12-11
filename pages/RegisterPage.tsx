import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ROUTES } from '../constants';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Logo from '../components/common/Logo';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';

const RegisterPage: React.FC = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError(t('common.error') + ' ' + t('auth.password_mismatch')); // Use translation for password mismatch
      setLoading(false);
      return;
    }

    try {
      await register({ fullName, email, phoneNumber, password });
      window.location.hash = ROUTES.HOME; // Redirect to home on successful registration
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    window.location.hash = ROUTES.LOGIN;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-8">
      <Logo size="lg" className="mb-8" />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {t('auth.register.title')}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            id="fullName"
            label={t('loan_form.full_name')}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            icon={<FaUser />}
            aria-label={t('loan_form.full_name')}
          />
          <Input
            id="email"
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<FaUser />}
            aria-label={t('auth.email')}
          />
          <Input
            id="phoneNumber"
            label={t('loan_form.phone')}
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            icon={<FaPhone />}
            aria-label={t('loan_form.phone')}
          />
          <Input
            id="password"
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<FaLock />}
            aria-label={t('auth.password')}
          />
          <Input
            id="confirmPassword"
            label={t('auth.confirm_password')}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            icon={<FaLock />}
            aria-label={t('auth.confirm_password')}
          />
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? t('common.loading') : t('auth.register.button')}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {t('auth.already_account')}{' '}
          <button
            onClick={navigateToLogin}
            className="text-blue-600 hover:text-blue-800 font-medium"
            aria-label={t('nav.login')}
          >
            {t('nav.login')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;