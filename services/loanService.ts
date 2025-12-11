import {
  LoanApplication,
  LoanStatus,
  LoanLimits,
  PaymentNumbers,
} from '../types';
import { apiCall } from './api';

export const applyForLoan = async (
  loanData: Omit<LoanApplication, 'id' | 'status' | 'appliedAt' | 'approvedRejectedAt' | 'emiAmount' | 'totalRepayment'>,
): Promise<LoanApplication> => {
  const data = await apiCall('/loans/apply', {
    method: 'POST',
    body: JSON.stringify(loanData),
  });
  return data;
};

export const getLoanApplications = async (
  userId?: string,
  status?: LoanStatus,
): Promise<LoanApplication[]> => {
  const queryParams = new URLSearchParams();
  if (userId) queryParams.append('userId', userId);
  if (status) queryParams.append('status', status);
  
  const query = queryParams.toString();
  const data = await apiCall(`/loans${query ? `?${query}` : ''}`, {
    method: 'GET',
  });
  
  // Map MongoDB _id to id for frontend compatibility
  return data.map((loan: any) => ({
    ...loan,
    id: loan._id || loan.id,
    userId: loan.userId?._id || loan.userId,
  }));
};

export const updateLoanStatus = async (
  loanId: string,
  newStatus: LoanStatus,
): Promise<LoanApplication> => {
  const data = await apiCall(`/admin/loans/${loanId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: newStatus }),
  });
  return {
    ...data,
    id: data._id || data.id,
    userId: data.userId?._id || data.userId,
  };
};

export const getLoanLimits = async (): Promise<LoanLimits> => {
  const data = await apiCall('/loans/settings/limits', {
    method: 'GET',
  });
  return data;
};

export const updateLoanLimits = async (
  min: number,
  max: number,
): Promise<LoanLimits> => {
  const data = await apiCall('/admin/settings/loan-limits', {
    method: 'PUT',
    body: JSON.stringify({ min, max }),
  });
  return data;
};

export const getPaymentNumbers = async (): Promise<PaymentNumbers> => {
  const data = await apiCall('/loans/settings/payment-numbers', {
    method: 'GET',
  });
  return data;
};

export const updatePaymentNumbers = async (
  numbers: PaymentNumbers,
): Promise<PaymentNumbers> => {
  const data = await apiCall('/admin/settings/payment-numbers', {
    method: 'PUT',
    body: JSON.stringify(numbers),
  });
  return data;
};

export const getDownpaymentProof = async (loanId: string): Promise<string> => {
  // For now, return the screenshot URL from the loan data
  const loans = await getLoanApplications();
  const loan = loans.find((l) => l.id === loanId);
  if (loan && loan.downpaymentScreenshotUrl) {
    return loan.downpaymentScreenshotUrl;
  }
  throw new Error("Downpayment proof not found.");
};

export const verifyPayment = async (loanId: string): Promise<void> => {
  // This would be implemented on backend
  console.log(`Loan ${loanId} payment verified.`);
  return Promise.resolve();
};

export const addBalance = async (
  userId: string,
  amount: number,
): Promise<void> => {
  // This would be implemented on backend
  console.log(`Added ${amount} to user ${userId}'s balance.`);
  return Promise.resolve();
};
