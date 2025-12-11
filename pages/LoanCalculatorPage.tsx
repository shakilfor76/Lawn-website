import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LOAN_MIN, LOAN_MAX, INTEREST_RATE_FLAT, LOAN_DURATIONS } from '../constants';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import { LoanDuration } from '../types';

const LoanCalculatorPage: React.FC = () => {
  const { t } = useLanguage();
  const [loanAmount, setLoanAmount] = useState<number>(LOAN_MIN);
  const [loanDuration, setLoanDuration] = useState<LoanDuration>(LOAN_DURATIONS[0].value as LoanDuration);
  const [emiAmount, setEmiAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalRepayment, setTotalRepayment] = useState<number>(0);

  const calculateEMI = useCallback((amount: number, duration: LoanDuration) => {
    const durationMonths = parseInt(duration, 10);
    if (amount <= 0 || durationMonths <= 0) {
      setEmiAmount(0);
      setTotalInterest(0);
      setTotalRepayment(0);
      return;
    }

    const totalInterestCalc = amount * INTEREST_RATE_FLAT * durationMonths;
    const totalRepaymentCalc = amount + totalInterestCalc;
    const emiCalc = totalRepaymentCalc / durationMonths;

    setTotalInterest(parseFloat(totalInterestCalc.toFixed(2)));
    setTotalRepayment(parseFloat(totalRepaymentCalc.toFixed(2)));
    setEmiAmount(parseFloat(emiCalc.toFixed(2)));
  }, []);

  useEffect(() => {
    calculateEMI(loanAmount, loanDuration);
  }, [loanAmount, loanDuration, calculateEMI]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setLoanAmount(Math.max(LOAN_MIN, Math.min(LOAN_MAX, value)));
    } else {
      setLoanAmount(0); // Or keep previous valid state, depending on UX
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanDuration(e.target.value as LoanDuration);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {t('calculator.title')}
      </h2>

      <div className="mb-6">
        <Input
          id="loanAmount"
          label={t('calculator.loan_amount')}
          type="number"
          value={loanAmount}
          onChange={handleAmountChange}
          min={LOAN_MIN}
          max={LOAN_MAX}
          step="1000"
        />
        <p className="text-sm text-gray-500 mt-1">
          {t('common.min')}: {LOAN_MIN}, {t('common.max')}: {LOAN_MAX}
        </p>
      </div>

      <div className="mb-6">
        <Select
          id="loanDuration"
          label={t('calculator.loan_duration')}
          value={loanDuration}
          onChange={handleDurationChange}
          options={LOAN_DURATIONS}
        />
      </div>

      <div className="mb-6">
        <Input
          id="interestRate"
          label={t('calculator.interest_rate')}
          type="text"
          value={`${(INTEREST_RATE_FLAT * 100).toFixed(0)}% Flat Rate`}
          readOnly
          disabled
          className="bg-gray-50 cursor-not-allowed"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-sm font-medium text-gray-600">{t('calculator.emi')}</p>
            <p className="text-2xl font-bold text-blue-700">BDT {emiAmount.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-md">
            <p className="text-sm font-medium text-gray-600">{t('calculator.total_interest')}</p>
            <p className="text-2xl font-bold text-green-700">BDT {totalInterest.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-md col-span-full">
            <p className="text-sm font-medium text-gray-600">{t('calculator.total_repayment')}</p>
            <p className="text-2xl font-bold text-indigo-700">BDT {totalRepayment.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculatorPage;