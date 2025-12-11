import { LoanDuration, Language, PaymentMethod } from './types';

// Loan Configuration
export const LOAN_MIN = 5000;
export const LOAN_MAX = 100000;
export const INTEREST_RATE_FLAT = 0.03; // 3% flat rate
export const DOWN_PAYMENT_PERCENTAGE = 0.10; // 10% down payment required

// Loan Application Options
// Refactored JOB_TYPES to include translated labels directly
export const JOB_TYPE_OPTIONS = [
  { value: 'Salaried Employee', label: { [Language.EN]: 'Salaried Employee', [Language.BN]: 'বেসরকারী চাকুরীজীবী' } },
  { value: 'Business Owner', label: { [Language.EN]: 'Business Owner', [Language.BN]: 'ব্যবসায়ী' } },
  { value: 'Freelancer', label: { [Language.EN]: 'Freelancer', [Language.BN]: 'ফ্রিল্যান্সার' } },
  { value: 'Student', label: { [Language.EN]: 'Student', [Language.BN]: 'ছাত্র' } },
  { value: 'Unemployed', label: { [Language.EN]: 'Unemployed', [Language.BN]: 'বেকার' } },
];


export const LOAN_DURATIONS = [
  { value: LoanDuration.ThreeMonths, label: '3 Months' },
  { value: LoanDuration.SixMonths, label: '6 Months' },
];

export const PAYMENT_METHODS = [
  { value: PaymentMethod.bKash, label: 'bKash' },
  { value: PaymentMethod.Nagad, label: 'Nagad' },
  { value: PaymentMethod.Rocket, label: 'Rocket' },
];

// Routing Paths
export const ROUTES = {
  HOME: '/',
  CALCULATOR: 'calculator',
  APPLY_LOAN: 'apply-loan',
  LOGIN: 'login',
  REGISTER: 'register',
  DASHBOARD: 'dashboard',
  CASH_OUT: 'cash-out', // New route for withdrawal
  // Admin-specific paths can be handled within the dashboard component
};

// Default Payment Numbers (Admin editable)
export const DEFAULT_PAYMENT_NUMBERS = {
  bKash: '01XXXXXXXXX',
  Nagad: '01XXXXXXXXX',
  Rocket: '01XXXXXXXXX',
};

// Translations (Simplified)
interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const defaultTranslations: Translations = {
  'app.name': {
    [Language.EN]: 'Loan Management System',
    [Language.BN]: 'ঋণ ব্যবস্থাপনা সিস্টেম',
  },
  'app.logo_text': {
    [Language.EN]: 'CL65',
    [Language.BN]: 'CL65',
  },
  'home.hero.title': {
    [Language.EN]: 'Your Financial Partner',
    [Language.BN]: 'আপনার আর্থিক অংশীদার',
  },
  'home.hero.subtitle': {
    [Language.EN]: 'Quick and Easy Loans for Everyone',
    [Language.BN]: 'সবার জন্য দ্রুত এবং সহজ ঋণ',
  },
  'button.apply_now': {
    [Language.EN]: 'Apply Now',
    [Language.BN]: 'এখনই আবেদন করুন',
  },
  'nav.home': {
    [Language.EN]: 'Home',
    [Language.BN]: 'হোম',
  },
  'nav.calculator': {
    [Language.EN]: 'Calculator',
    [Language.BN]: 'ক্যালকুলেটর',
  },
  'nav.apply_loan': {
    [Language.EN]: 'Apply Loan',
    [Language.BN]: 'ঋণের জন্য আবেদন',
  },
  'nav.dashboard': {
    [Language.EN]: 'Dashboard',
    [Language.BN]: 'ড্যাশবোর্ড',
  },
  'nav.login': {
    [Language.EN]: 'Login',
    [Language.BN]: 'লগইন',
  },
  'nav.register': {
    [Language.EN]: 'Register',
    [Language.BN]: 'নিবন্ধন করুন',
  },
  'nav.logout': {
    [Language.EN]: 'Logout',
    [Language.BN]: 'লগআউট',
  },
  'footer.copyright': {
    [Language.EN]: '© 2024 Loan Management System. All rights reserved.',
    [Language.BN]: '© ২০২৪ ঋণ ব্যবস্থাপনা সিস্টেম। সর্বস্বত্ব সংরক্ষিত।',
  },
  'calculator.title': {
    [Language.EN]: 'Loan EMI Calculator',
    [Language.BN]: 'ঋণ ইএমআই ক্যালকুলেটর',
  },
  'calculator.loan_amount': {
    [Language.EN]: 'Loan Amount',
    [Language.BN]: 'ঋণের পরিমাণ',
  },
  'calculator.loan_duration': {
    [Language.EN]: 'Loan Duration (Months)',
    [Language.BN]: 'ঋণের মেয়াদ (মাস)',
  },
  'calculator.interest_rate': {
    [Language.EN]: 'Flat Interest Rate',
    [Language.BN]: 'ফ্ল্যাট সুদের হার',
  },
  'calculator.emi': {
    [Language.EN]: 'Monthly EMI',
    [Language.BN]: 'মাসিক ইএমআই',
  },
  'calculator.total_interest': {
    [Language.EN]: 'Total Interest',
    [Language.BN]: 'মোট সুদ',
  },
  'calculator.total_repayment': {
    [Language.EN]: 'Total Repayment',
    [Language.BN]: 'মোট পরিশোধ',
  },
  'loan_form.title': {
    [Language.EN]: 'Apply for Emergency Loan',
    [Language.BN]: 'জরুরী ঋণের জন্য আবেদন করুন',
  },
  'loan_form.full_name': {
    [Language.EN]: 'Full Name',
    [Language.BN]: 'পুরো নাম',
  },
  'loan_form.dob': {
    [Language.EN]: 'Date of Birth',
    [Language.BN]: 'জন্ম তারিখ',
  },
  'loan_form.phone': {
    [Language.EN]: 'Phone Number',
    [Language.BN]: 'ফোন নম্বর',
  },
  'loan_form.address': {
    [Language.EN]: 'Address',
    [Language.BN]: 'ঠিকানা',
  },
  'loan_form.nid_number': {
    [Language.EN]: 'National ID Number',
    [Language.BN]: 'জাতীয় পরিচয়পত্র নম্বর',
  },
  'loan_form.nid_front': {
    [Language.EN]: 'Upload NID Front',
    [Language.BN]: 'জাতীয় পরিচয়পত্রের সামনের দিক আপলোড করুন',
  },
  'loan_form.nid_back': {
    [Language.EN]: 'Upload NID Back', // Added missing English translation
    [Language.BN]: 'জাতীয় পরিচয়পত্রের পিছনের দিক আপলোড করুন',
  },
  'loan_form.salary_amount': {
    [Language.EN]: 'Salary Amount',
    [Language.BN]: 'বেতনের পরিমাণ',
  },
  'loan_form.job_type': {
    [Language.EN]: 'Job Type',
    [Language.BN]: 'পেশার ধরণ',
  },
  'loan_form.bank_account': {
    [Language.EN]: 'Bank Account Number',
    [Language.BN]: 'ব্যাঙ্ক হিসাব নম্বর',
  },
  'loan_form.emergency_contact_name': {
    [Language.EN]: 'Emergency Contact Name',
    [Language.BN]: 'জরুরী যোগাযোগের নাম',
  },
  'loan_form.emergency_contact_phone': {
    [Language.EN]: 'Emergency Contact Phone',
    [Language.BN]: 'জরুরী যোগাযোগের ফোন',
  },
  'loan_form.downpayment_method': {
    [Language.EN]: 'Downpayment Method',
    [Language.BN]: 'ডাউন পেমেন্টের ধরণ',
  },
  'loan_form.downpayment_screenshot': {
    [Language.EN]: 'Upload Downpayment Screenshot',
    [Language.BN]: 'ডাউন পেমেন্টের স্ক্রিনশট আপলোড করুন',
  },
  'loan_form.submit': {
    [Language.EN]: 'Submit Application',
    [Language.BN]: 'আবেদন জমা দিন',
  },
  'loan_form.application_success': {
    [Language.EN]: 'Loan application submitted successfully!',
    [Language.BN]: 'ঋণের আবেদন সফলভাবে জমা দেওয়া হয়েছে!',
  },
  'auth.login.title': {
    [Language.EN]: 'Login to Your Account',
    [Language.BN]: 'আপনার অ্যাকাউন্টে লগইন করুন',
  },
  'auth.register.title': {
    [Language.EN]: 'Create New Account',
    [Language.BN]: 'নতুন অ্যাকাউন্ট তৈরি করুন',
  },
  'auth.email': {
    [Language.EN]: 'Email',
    [Language.BN]: 'ইমেল',
  },
  'auth.password': {
    [Language.EN]: 'Password',
    [Language.BN]: 'পাসওয়ার্ড',
  },
  'auth.confirm_password': {
    [Language.EN]: 'Confirm Password',
    [Language.BN]: 'পাসওয়ার্ড নিশ্চিত করুন',
  },
  'auth.password_mismatch': { // New translation key
    [Language.EN]: 'Passwords do not match.',
    [Language.BN]: 'পাসওয়ার্ড মেলে না।',
  },
  'auth.login.button': {
    [Language.EN]: 'Login',
    [Language.BN]: 'লগইন',
  },
  'auth.register.button': {
    [Language.EN]: 'Register',
    [Language.BN]: 'নিবন্ধন করুন',
  },
  'auth.no_account': {
    [Language.EN]: 'Don\'t have an account?',
    [Language.BN]: 'একটি অ্যাকাউন্ট নেই?',
  },
  'auth.already_account': {
    [Language.EN]: 'Already have an account?',
    [Language.BN]: 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে?',
  },
  'dashboard.user.title': {
    [Language.EN]: 'User Dashboard',
    [Language.BN]: 'ব্যবহারকারী ড্যাশবোর্ড',
  },
  'dashboard.admin.title': {
    [Language.EN]: 'Admin Dashboard',
    [Language.BN]: 'অ্যাডমিন ড্যাশবোর্ড',
  },
  'dashboard.super_admin.title': {
    [Language.EN]: 'Super Admin Dashboard',
    [Language.BN]: 'সুপার অ্যাডমিন ড্যাশবোর্ড',
  },
  'dashboard.loan_applications': {
    [Language.EN]: 'Loan Applications',
    [Language.BN]: 'ঋণের আবেদনসমূহ',
  },
  'dashboard.user_management': {
    [Language.EN]: 'User Management',
    [Language.BN]: 'ব্যবহারকারী ব্যবস্থাপনা',
  },
  'dashboard.admin_management': {
    [Language.EN]: 'Admin Management',
    [Language.BN]: 'অ্যাডমিন ব্যবস্থাপনা',
  },
  'dashboard.settings': {
    [Language.EN]: 'Settings',
    [Language.BN]: 'সেটিংস',
  },
  'dashboard.loan_limits': {
    [Language.EN]: 'Loan Limits',
    [Language.BN]: 'ঋণের সীমা',
  },
  'dashboard.payment_numbers': {
    [Language.EN]: 'Payment Numbers',
    [Language.BN]: 'পেমেন্ট নম্বর',
  },
  'common.min': {
    [Language.EN]: 'Min',
    [Language.BN]: 'সর্বনিম্ন',
  },
  'common.max': {
    [Language.EN]: 'Max',
    [Language.BN]: 'সর্বোচ্চ',
  },
  'common.save': {
    [Language.EN]: 'Save',
    [Language.BN]: 'সংরক্ষণ করুন',
  },
  'common.approve': {
    [Language.EN]: 'Approve',
    [Language.BN]: 'অনুমোদন করুন',
  },
  'common.reject': {
    [Language.EN]: 'Reject',
    [Language.BN]: 'প্রত্যাখ্যান করুন',
  },
  'common.view_proof': {
    [Language.EN]: 'View Proof',
    [Language.BN]: 'প্রমাণ দেখুন',
  },
  'common.verify_payment': {
    [Language.EN]: 'Verify Payment',
    [Language.BN]: 'পেমেন্ট যাচাই করুন',
  },
  'common.add_balance': {
    [Language.EN]: 'Add Balance',
    [Language.BN]: 'ব্যালেন্স যোগ করুন',
  },
  'common.status': {
    [Language.EN]: 'Status',
    [Language.BN]: 'অবস্থা',
  },
  'common.action': {
    [Language.EN]: 'Action',
    [Language.BN]: 'কার্যক্রম',
  },
  'common.loading': {
    [Language.EN]: 'Loading',
    [Language.BN]: 'লোড হচ্ছে',
  },
  'common.error': {
    [Language.EN]: 'Error:',
    [Language.BN]: 'ত্রুটি:',
  },
  'common.success': {
    [Language.EN]: 'Success:',
    [Language.BN]: 'সফল:',
  },
  'common.required': {
    [Language.EN]: 'This field is required.',
    [Language.BN]: 'এই ক্ষেত্রটি আবশ্যক।',
  },
  'common.invalid_number': {
    [Language.EN]: 'Please enter a valid number.',
    [Language.BN]: 'একটি বৈধ সংখ্যা প্রবেশ করান।',
  },
  'common.invalid_email': {
    [Language.EN]: 'Please enter a valid email.',
    [Language.BN]: 'একটি বৈধ ইমেল প্রবেশ করান।',
  },
  'common.min_max_error': {
    [Language.EN]: 'Loan amount must be between {{min}} and {{max}}.',
    [Language.BN]: 'ঋণের পরিমাণ {{min}} এবং {{max}} এর মধ্যে হতে হবে।',
  },
  'common.file_upload_success': {
    [Language.EN]: 'File uploaded successfully!',
    [Language.BN]: 'ফাইল সফলভাবে আপলোড করা হয়েছে!',
  },
  'common.file_upload_error': {
    [Language.EN]: 'File upload failed.',
    [Language.BN]: 'ফাইল আপলোড ব্যর্থ হয়েছে।',
  },
  'common.select_option': {
    [Language.EN]: 'Select an option',
    [Language.BN]: 'একটি বিকল্প নির্বাচন করুন',
  },
  'common.select_language': {
    [Language.EN]: 'Select language',
    [Language.BN]: 'ভাষা নির্বাচন করুন',
  },
  'common.fill_all_required_fields': {
    [Language.EN]: 'Please fill all required fields.',
    [Language.BN]: 'দয়া করে সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন।',
  },
  'common.login_required': {
    [Language.EN]: 'You must be logged in to perform this action.',
    [Language.BN]: 'এই কাজটি করার জন্য আপনাকে লগইন করতে হবে।',
  },
  // Dashboard specific
  'welcome.sir': {
    [Language.EN]: 'Welcome, Sir!',
    [Language.BN]: 'স্বাগতম, জনাব!',
  },
  'dashboard.welcome_subtitle': {
    [Language.EN]: 'We are ready for your financial assistance.',
    [Language.BN]: 'আপনার আর্থিক সহায়তার জন্য আমরা প্রস্তুত।',
  },
  'dashboard.tap_to_balance': {
    [Language.EN]: 'Tap To Balance',
    [Language.BN]: 'ব্যালেন্স দেখতে ট্যাপ করুন',
  },
  'dashboard.loan_application_card': {
    [Language.EN]: 'Loan Application',
    [Language.BN]: 'লোন আবেদন',
  },
  'dashboard.cash_out_card': {
    [Language.EN]: 'Cash Out',
    [Language.BN]: 'ক্যাশ আউট',
  },
  'dashboard.my_loans_card': {
    [Language.EN]: 'My Loans',
    [Language.BN]: 'আমার লোন',
  },
  'dashboard.profile_card': {
    [Language.EN]: 'Profile',
    [Language.BN]: 'প্রোফাইল',
  },
  'dashboard.emi_card': {
    [Language.EN]: 'EMI',
    [Language.BN]: 'ইএমআই',
  },
  'dashboard.withdrawal_card': {
    [Language.EN]: 'Withdrawal',
    [Language.BN]: 'উইথড্রয়াল',
  },
  'dashboard.loan_offer_banner': {
    [Language.EN]: 'Loan Offer - Don\'t miss out!',
    [Language.BN]: 'লোন অফার - যেন মিস না হয়!',
  },
  'dashboard.our_partners': {
    [Language.EN]: 'Our Partners',
    [Language.BN]: 'আমাদের পার্টনার',
  },
  'dashboard.my_loans': { // New key for user loans list title
    [Language.EN]: 'My Loan Applications',
    [Language.BN]: 'আমার ঋণের আবেদনসমূহ',
  },
  // Bottom navigation
  'nav.bottom.loan': {
    [Language.EN]: 'Loan',
    [Language.BN]: 'লোন',
  },
  'nav.bottom.inbox': {
    [Language.EN]: 'Inbox',
    [Language.BN]: 'ইনবক্স',
  },
  // Job Types in Bengali (moved from comments to dedicated entries)
  'job_type.salaried_employee': {
    [Language.EN]: 'Salaried Employee',
    [Language.BN]: 'বেসরকারী চাকুরীজীবী',
  },
  'job_type.business_owner': {
    [Language.EN]: 'Business Owner',
    [Language.BN]: 'ব্যবসায়ী',
  },
  'job_type.freelancer': {
    [Language.EN]: 'Freelancer',
    [Language.BN]: 'ফ্রিল্যান্সার',
  },
  'job_type.student': {
    [Language.EN]: 'Student',
    [Language.BN]: 'ছাত্র',
  },
  'job_type.unemployed': {
    [Language.EN]: 'Unemployed',
    [Language.BN]: 'বেকার',
  },
  // Withdrawal Page
  'withdrawal.title': {
    [Language.EN]: 'Cash Out',
    [Language.BN]: 'ক্যাশ আউট',
  },
  'withdrawal.amount': {
    [Language.EN]: 'Amount',
    [Language.BN]: 'পরিমাণ',
  },
  'withdrawal.your_number': {
    [Language.EN]: 'Your Number',
    [Language.BN]: 'আপনার নম্বর',
  },
  'withdrawal.submit': {
    [Language.EN]: 'Submit Withdrawal',
    [Language.BN]: 'উইথড্রয়াল জমা দিন',
  },
  'common.clear_file': {
    [Language.EN]: 'Clear file',
    [Language.BN]: 'ফাইল সরান',
  },
  // Important Instructions Modal
  'modal.important_instructions.title': {
    [Language.EN]: 'Important Instructions',
    [Language.BN]: 'গুরুত্বপূর্ণ নির্দেশনা',
  },
  'modal.important_instructions.text': {
    [Language.EN]: 'As a member, remember: you can apply for a loan once using your mobile number and National ID.',
    [Language.BN]: 'সদস্য হয়ে মনে রাখবেন: আপনার একটি মোবাইল নম্বর এবং জাতীয় আইডি ব্যবহার করে একবার লোন আবেদন করতে পারবেন।',
  },
  'modal.important_instructions.view_details': {
    [Language.EN]: 'View Details',
    [Language.BN]: 'বিস্তারিত দেখুন',
  },
  'modal.important_instructions.understood': {
    [Language.EN]: 'Understood',
    [Language.BN]: 'বুঝতে পেরেছি',
  },
  // Confirmation Modal
  'confirm_modal.approve.title': {
    [Language.EN]: 'Confirm Loan Approval',
    [Language.BN]: 'ঋণ অনুমোদন নিশ্চিত করুন',
  },
  'confirm_modal.approve.message': {
    [Language.EN]: 'Are you sure you want to APPROVE this loan application?',
    [Language.BN]: 'আপনি কি নিশ্চিত যে আপনি এই ঋণের আবেদনটি অনুমোদন করতে চান?',
  },
  'confirm_modal.reject.title': {
    [Language.EN]: 'Confirm Loan Rejection',
    [Language.BN]: 'ঋণ প্রত্যাখ্যান নিশ্চিত করুন',
  },
  'confirm_modal.reject.message': {
    [Language.EN]: 'Are you sure you want to REJECT this loan application?',
    [Language.BN]: 'আপনি কি নিশ্চিত যে আপনি এই ঋণের আবেদনটি প্রত্যাখ্যান করতে চান?',
  },
  'confirm_modal.button.confirm': {
    [Language.EN]: 'Confirm',
    [Language.BN]: 'নিশ্চিত করুন',
  },
  'confirm_modal.button.cancel': {
    [Language.EN]: 'Cancel',
    [Language.BN]: 'বাতিল করুন',
  },
  // Slideshow
  'slideshow.title': {
    [Language.EN]: 'City Bank Instant Loan',
    [Language.BN]: 'সিটি ব্যাংক ইনস্ট্যান্ট লোন',
  },
  'slideshow.apply_now_button': {
    [Language.EN]: 'Apply Now',
    [Language.BN]: 'এখনই আবেদন করুন',
  },
};

// Slideshow images for homepage - City Bank Instant Loan promotional banners
export const SLIDESHOW_IMAGES = [
  '/images/slide1.png', // City Bank instant loan card application
  '/images/slide2.png', // City Bank instant loan with card and cash
  '/images/slide3.png', // City Bank instant loan card approval
  '/images/slide4.png', // City Bank instant loan card approval (alternate)
];