import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { applyForLoan, getLoanLimits, getPaymentNumbers } from '../services/loanService';
import {
  LoanApplication,
  LoanDuration,
  PaymentMethod,
  LoanLimits,
  PaymentNumbers,
  Language,
} from '../types';
import { LOAN_DURATIONS, JOB_TYPE_OPTIONS, PAYMENT_METHODS, ROUTES, DOWN_PAYMENT_PERCENTAGE } from '../constants'; // Updated import

import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileUpload from '../components/common/FileUpload';
import Button from '../components/common/Button';

// Utility to convert file to Base64 string (mocking for frontend)
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const LoanApplicationPage: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<
    Omit<
      LoanApplication,
      'id' | 'status' | 'appliedAt' | 'approvedRejectedAt' | 'userId' | 'emiAmount' | 'totalRepayment'
    >
  >({
    fullName: user?.fullName || '',
    dateOfBirth: '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    nationalIdNumber: '',
    nidFrontUrl: '',
    nidBackUrl: '',
    salaryAmount: 0,
    jobType: '',
    bankAccountNumber: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    loanAmount: 0,
    loanDuration: LoanDuration.ThreeMonths,
    downpaymentMethod: PaymentMethod.bKash,
    downpaymentScreenshotUrl: '',
  });

  const [nidFrontFile, setNidFrontFile] = useState<File | null>(null);
  const [nidBackFile, setNidBackFile] = useState<File | null>(null);
  const [downpaymentScreenshotFile, setDownpaymentScreenshotFile] = useState<File | null>(null);

  const [loanLimits, setLoanLimits] = useState<LoanLimits>({
    min: 5000,
    max: 100000,
  });
  const [paymentNumbers, setPaymentNumbers] = useState<PaymentNumbers>({
    bKash: '',
    Nagad: '',
    Rocket: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const limits = await getLoanLimits();
        const numbers = await getPaymentNumbers();
        setLoanLimits(limits);
        setPaymentNumbers(numbers);
        setFormData((prev) => ({
          ...prev,
          loanAmount: limits.min,
        }));
      } catch (err) {
        setError(t('common.error') + ' ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [t]);

  // Use the refactored JOB_TYPE_OPTIONS directly
  const translatedJobTypeOptions = JOB_TYPE_OPTIONS.map(option => ({
    value: option.value,
    label: option.label[language],
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(numValue) ? 0 : numValue,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName) errors.fullName = t('common.required');
    if (!formData.dateOfBirth) errors.dateOfBirth = t('common.required');
    if (!formData.phoneNumber) errors.phoneNumber = t('common.required');
    if (!formData.address) errors.address = t('common.required');
    if (!formData.nationalIdNumber) errors.nationalIdNumber = t('common.required');
    if (!nidFrontFile && !formData.nidFrontUrl) errors.nidFrontUrl = t('common.required');
    if (!nidBackFile && !formData.nidBackUrl) errors.nidBackUrl = t('common.required');
    if (!formData.salaryAmount || formData.salaryAmount <= 0)
      errors.salaryAmount = t('common.invalid_number');
    if (!formData.jobType) errors.jobType = t('common.required');
    if (!formData.bankAccountNumber) errors.bankAccountNumber = t('common.required');
    if (!formData.emergencyContactName) errors.emergencyContactName = t('common.required');
    if (!formData.emergencyContactPhone) errors.emergencyContactPhone = t('common.required');
    if (
      !formData.loanAmount ||
      formData.loanAmount < loanLimits.min ||
      formData.loanAmount > loanLimits.max
    ) {
      errors.loanAmount = t('common.min_max_error', { min: loanLimits.min, max: loanLimits.max });
    }
    if (!formData.loanDuration) errors.loanDuration = t('common.required');
    if (!formData.downpaymentMethod) errors.downpaymentMethod = t('common.required');
    if (!downpaymentScreenshotFile && !formData.downpaymentScreenshotUrl)
      errors.downpaymentScreenshotUrl = t('common.required');

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      setError(t('common.error') + ' ' + t('common.fill_all_required_fields'));
      return;
    }

    if (!user) {
      setError(t('common.error') + ' ' + t('common.login_required'));
      window.location.hash = ROUTES.LOGIN;
      return;
    }

    setSubmitting(true);
    try {
      // Simulate file uploads to get URLs (in a real app, these would be actual uploads)
      const uploadedNidFrontUrl = nidFrontFile
        ? `mock-nid-front-${Date.now()}.png` // await fileToBase64(nidFrontFile)
        : formData.nidFrontUrl;
      const uploadedNidBackUrl = nidBackFile
        ? `mock-nid-back-${Date.now()}.png` // await fileToBase64(nidBackFile)
        : formData.nidBackUrl;
      const uploadedDownpaymentScreenshotUrl = downpaymentScreenshotFile
        ? `mock-downpayment-${Date.now()}.png` // await fileToBase64(downpaymentScreenshotFile)
        : formData.downpaymentScreenshotUrl;


      const loanApplicationData: Omit<
        LoanApplication,
        'id' | 'status' | 'appliedAt' | 'approvedRejectedAt' | 'emiAmount' | 'totalRepayment'
      > = {
        ...formData,
        userId: user.id, // Add userId from authenticated user
        nidFrontUrl: uploadedNidFrontUrl,
        nidBackUrl: uploadedNidBackUrl,
        downpaymentScreenshotUrl: uploadedDownpaymentScreenshotUrl,
      };

      await applyForLoan(loanApplicationData);
      setSuccess(t('common.success') + ' ' + t('loan_form.application_success'));
      setFormErrors({});
      // Optionally reset form or redirect
    } catch (err) {
      setError(t('common.error') + ' ' + (err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-700">
        {t('common.loading')} {t('dashboard.settings')}...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {t('loan_form.title')}
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {/* Borrower Information */}
        <div className="md:col-span-2 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Borrower Information</h3>
          <Input
            id="fullName"
            name="fullName"
            label={t('loan_form.full_name')}
            value={formData.fullName}
            onChange={handleChange}
            error={formErrors.fullName}
            required
          />
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            label={t('loan_form.dob')}
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={formErrors.dateOfBirth}
            required
          />
          <Input
            id="phoneNumber"
            name="phoneNumber"
            label={t('loan_form.phone')}
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={formErrors.phoneNumber}
            required
          />
          <Input
            id="address"
            name="address"
            label={t('loan_form.address')}
            value={formData.address}
            onChange={handleChange}
            error={formErrors.address}
            required
          />
          <Input
            id="nationalIdNumber"
            name="nationalIdNumber"
            label={t('loan_form.nid_number')}
            value={formData.nationalIdNumber}
            onChange={handleChange}
            error={formErrors.nationalIdNumber}
            required
          />
          <FileUpload
            id="nidFront"
            label={t('loan_form.nid_front')}
            onFileChange={setNidFrontFile}
            currentFileUrl={formData.nidFrontUrl}
            error={formErrors.nidFrontUrl}
          />
          <FileUpload
            id="nidBack"
            label={t('loan_form.nid_back')}
            onFileChange={setNidBackFile}
            currentFileUrl={formData.nidBackUrl}
            error={formErrors.nidBackUrl}
          />
          <Input
            id="salaryAmount"
            name="salaryAmount"
            label={t('loan_form.salary_amount')}
            type="number"
            value={formData.salaryAmount}
            onChange={handleNumberChange}
            error={formErrors.salaryAmount}
            required
          />
          <Select
            id="jobType"
            name="jobType"
            label={t('loan_form.job_type')}
            value={formData.jobType}
            onChange={handleChange}
            options={translatedJobTypeOptions} // Use the translated options
            placeholder={t('common.select_option')}
            error={formErrors.jobType}
            required
          />
          <Input
            id="bankAccountNumber"
            name="bankAccountNumber"
            label={t('loan_form.bank_account')}
            value={formData.bankAccountNumber}
            onChange={handleChange}
            error={formErrors.bankAccountNumber}
            required
          />
          <Input
            id="emergencyContactName"
            name="emergencyContactName"
            label={t('loan_form.emergency_contact_name')}
            value={formData.emergencyContactName}
            onChange={handleChange}
            error={formErrors.emergencyContactName}
            required
          />
          <Input
            id="emergencyContactPhone"
            name="emergencyContactPhone"
            label={t('loan_form.emergency_contact_phone')}
            type="tel"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            error={formErrors.emergencyContactPhone}
            required
          />
        </div>

        {/* Loan Details */}
        <div className="md:col-span-2 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Loan Details</h3>
          <Input
            id="loanAmount"
            name="loanAmount"
            label={t('calculator.loan_amount')}
            type="number"
            value={formData.loanAmount}
            onChange={handleNumberChange}
            min={loanLimits.min}
            max={loanLimits.max}
            step="1000"
            error={formErrors.loanAmount}
            required
          />
          <p className="text-sm text-gray-500 mt-1 mb-4">
            {t('common.min')}: {loanLimits.min}, {t('common.max')}: {loanLimits.max}
          </p>

          <Select
            id="loanDuration"
            name="loanDuration"
            label={t('calculator.loan_duration')}
            value={formData.loanDuration}
            onChange={handleChange}
            options={LOAN_DURATIONS}
            error={formErrors.loanDuration}
            required
          />
          <Select
            id="downpaymentMethod"
            name="downpaymentMethod"
            label={t('loan_form.downpayment_method')}
            value={formData.downpaymentMethod}
            onChange={handleChange}
            options={PAYMENT_METHODS}
            error={formErrors.downpaymentMethod}
            required
          />
          
          {/* Down Payment Amount Display */}
          <div className="mb-6 p-4 bg-[#FFF5F5] border-2 border-[#EE1C25] rounded-lg">
            <h4 className="font-bold text-[#EE1C25] text-lg mb-2">
              Down Payment Required
            </h4>
            <p className="text-[#444444] text-xl font-semibold">
              BDT {(formData.loanAmount * DOWN_PAYMENT_PERCENTAGE).toLocaleString()} 
              <span className="text-sm text-[#777777] ml-2">
                ({(DOWN_PAYMENT_PERCENTAGE * 100)}% of loan amount)
              </span>
            </p>
          </div>
          
          <div className="mb-4 text-gray-700" role="region" aria-labelledby="downpayment-instructions">
            <p id="downpayment-instructions" className="font-medium">Please send down payment to:</p>
            <ul className="list-disc list-inside ml-4">
              {formData.downpaymentMethod === PaymentMethod.bKash && (
                <li>bKash: {paymentNumbers.bKash}</li>
              )}
              {formData.downpaymentMethod === PaymentMethod.Nagad && (
                <li>Nagad: {paymentNumbers.Nagad}</li>
              )}
              {formData.downpaymentMethod === PaymentMethod.Rocket && (
                <li>Rocket: {paymentNumbers.Rocket}</li>
              )}
            </ul>
          </div>
          <FileUpload
            id="downpaymentScreenshot"
            label={t('loan_form.downpayment_screenshot')}
            onFileChange={setDownpaymentScreenshotFile}
            currentFileUrl={formData.downpaymentScreenshotUrl}
            error={formErrors.downpaymentScreenshotUrl}
            required
          />
        </div>

        <div className="md:col-span-2 text-center mt-6">
          <Button type="submit" disabled={submitting} size="lg">
            {submitting ? t('common.loading') : t('loan_form.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationPage;