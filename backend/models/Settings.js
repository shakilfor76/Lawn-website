import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    loanLimits: {
      min: {
        type: Number,
        default: 5000,
      },
      max: {
        type: Number,
        default: 100000,
      },
    },
    paymentNumbers: {
      bKash: {
        type: String,
        default: '01XXXXXXXXX',
      },
      Nagad: {
        type: String,
        default: '01XXXXXXXXX',
      },
      Rocket: {
        type: String,
        default: '01XXXXXXXXX',
      },
    },
    interestRate: {
      type: Number,
      default: 0.03, // 3% flat rate
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
