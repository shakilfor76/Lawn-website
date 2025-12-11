import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nationalIdNumber: {
      type: String,
      required: true,
    },
    nidFrontUrl: {
      type: String,
      required: true,
    },
    nidBackUrl: {
      type: String,
      required: true,
    },
    salaryAmount: {
      type: Number,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
    },
    emergencyContactName: {
      type: String,
      required: true,
    },
    emergencyContactPhone: {
      type: String,
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    loanDuration: {
      type: String,
      enum: ['3', '6'],
      required: true,
    },
    downpaymentMethod: {
      type: String,
      enum: ['bKash', 'Nagad', 'Rocket'],
      required: true,
    },
    downpaymentScreenshotUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Paid'],
      default: 'Pending',
    },
    emiAmount: {
      type: Number,
    },
    totalRepayment: {
      type: Number,
    },
    approvedRejectedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

export default LoanApplication;
