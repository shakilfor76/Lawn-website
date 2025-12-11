import express from 'express';
import LoanApplication from '../models/LoanApplication.js';
import Settings from '../models/Settings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Calculate EMI
const calculateLoanDetails = (loanAmount, loanDuration, interestRate = 0.03) => {
  const durationMonths = parseInt(loanDuration, 10);
  const totalInterest = loanAmount * interestRate * durationMonths;
  const totalRepayment = loanAmount + totalInterest;
  const emiAmount = totalRepayment / durationMonths;
  return {
    emiAmount: parseFloat(emiAmount.toFixed(2)),
    totalRepayment: parseFloat(totalRepayment.toFixed(2)),
  };
};

// @route   POST /api/loans/apply
// @desc    Apply for a loan
// @access  Private
router.post('/apply', protect, async (req, res) => {
  try {
    const loanData = req.body;
    const { emiAmount, totalRepayment } = calculateLoanDetails(
      loanData.loanAmount,
      loanData.loanDuration
    );

    const loan = await LoanApplication.create({
      ...loanData,
      userId: req.user._id,
      emiAmount,
      totalRepayment,
      status: 'Pending',
    });

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/loans
// @desc    Get loan applications (user's own or all for admin)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    // Regular users can only see their own loans
    if (req.user.role === 'user') {
      query.userId = req.user._id;
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    const loans = await LoanApplication.find(query)
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });

    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/loans/:id
// @desc    Get single loan application
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const loan = await LoanApplication.findById(req.params.id).populate(
      'userId',
      'fullName email'
    );

    if (!loan) {
      return res.status(404).json({ message: 'Loan application not found' });
    }

    // Users can only view their own loans
    if (
      req.user.role === 'user' &&
      loan.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/loans/settings/limits
// @desc    Get loan limits
// @access  Public
router.get('/settings/limits', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings.loanLimits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/loans/settings/payment-numbers
// @desc    Get payment numbers
// @access  Public
router.get('/settings/payment-numbers', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings.paymentNumbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
