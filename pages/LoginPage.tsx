import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ROUTES } from '../constants';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Logo from '../components/common/Logo';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      window.location.hash = ROUTES.HOME; // Redirect to home on successful login
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    window.location.hash = ROUTES.REGISTER;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-8">
      <Logo size="lg" className="mb-8" />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {t('auth.login.title')}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            id="password"
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<FaLock />}
            aria-label={t('auth.password')}
          />
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? t('common.loading') : t('auth.login.button')}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {t('auth.no_account')}{' '}
          <button
            onClick={navigateToRegister}
            className="text-blue-600 hover:text-blue-800 font-medium"
            aria-label={t('nav.register')}
          >
            {t('nav.register')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;