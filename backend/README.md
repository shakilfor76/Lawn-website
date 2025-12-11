# Loan Management System - Backend API

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Edit `.env` file with your MongoDB connection string
- Default MongoDB URI: `mongodb://localhost:27017/loan_management`

4. Seed admin users:
```bash
node scripts/seedAdmin.js
```

5. Start the server:
```bash
npm run dev
```

The API will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Loans
- `POST /api/loans/apply` - Apply for loan (requires auth)
- `GET /api/loans` - Get loan applications (requires auth)
- `GET /api/loans/:id` - Get single loan (requires auth)
- `GET /api/loans/settings/limits` - Get loan limits (public)
- `GET /api/loans/settings/payment-numbers` - Get payment numbers (public)

### Admin
- `PUT /api/admin/loans/:id/status` - Update loan status (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:id/role` - Update user role (super admin only)
- `PUT /api/admin/settings/loan-limits` - Update loan limits (super admin only)
- `PUT /api/admin/settings/payment-numbers` - Update payment numbers (super admin only)

## Default Credentials

After seeding:
- Super Admin: `super@example.com` / `password`
- Admin: `admin@example.com` / `password`
- Test User: `user@example.com` / `password`
