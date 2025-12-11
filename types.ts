// Enums for user roles, loan statuses, payment methods, and loan durations
export enum Role {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'super_admin',
}

export enum LoanStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Paid = 'Paid',
}

export enum PaymentMethod {
  bKash = 'bKash',
  Nagad = 'Nagad',
  Rocket = 'Rocket',
}

export enum LoanDuration {
  ThreeMonths = '3',
  SixMonths = '6',
}

export enum Language {
  EN = 'en',
  BN = 'bn',
}

// User interface
export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: Role;
  token: string;
}

// Loan Application interface
export interface LoanApplication {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  phoneNumber: string;
  address: string;
  nationalIdNumber: string;
  nidFrontUrl: string;
  nidBackUrl: string;
  salaryAmount: number;
  jobType: string;
  bankAccountNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  loanAmount: number;
  loanDuration: LoanDuration;
  downpaymentMethod: PaymentMethod;
  downpaymentScreenshotUrl: string;
  status: LoanStatus;
  appliedAt: string; // ISO date string
  approvedRejectedAt?: string; // ISO date string
  emiAmount?: number;
  totalRepayment?: number;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'role' | 'token'>) => Promise<void>;
  logout: () => void;
}

// Language context type
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Loan limits interface
export interface LoanLimits {
  min: number;
  max: number;
}

// Payment numbers interface
export interface PaymentNumbers {
  bKash: string;
  Nagad: string;
  Rocket: string;
}
