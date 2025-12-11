import express from 'express';
import LoanApplication from '../models/LoanApplication.js';
import User from '../models/User.js';
import Settings from '../models/Settings.js';
import { protect, admin, superAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   PUT /api/admin/loans/:id/status
// @desc    Update loan application status
// @access  Private/Admin
router.put('/loans/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const loan = await LoanApplication.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: 'Loan application not found' });
    }

    loan.status = status;
    if (status === 'Approved' || status === 'Rejected') {
      loan.approvedRejectedAt = new Date();
    }

    await loan.save();
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private/SuperAdmin
router.put('/users/:id/role', protect, superAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/settings/loan-limits
// @desc    Update loan limits
// @access  Private/SuperAdmin
router.put('/settings/loan-limits', protect, superAdmin, async (req, res) => {
  try {
    const { min, max } = req.body;
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    settings.loanLimits.min = min;
    settings.loanLimits.max = max;
    await settings.save();

    res.json(settings.loanLimits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/settings/payment-numbers
// @desc    Update payment numbers
// @access  Private/SuperAdmin
router.put('/settings/payment-numbers', protect, superAdmin, async (req, res) => {
  try {
    const { bKash, Nagad, Rocket } = req.body;
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    settings.paymentNumbers = { bKash, Nagad, Rocket };
    await settings.save();

    res.json(settings.paymentNumbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
