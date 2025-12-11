import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Check if super admin exists
    const superAdminExists = await User.findOne({ email: 'super@example.com' });
    if (superAdminExists) {
      console.log('⚠️  Super Admin already exists');
    } else {
      await User.create({
        fullName: 'Super Admin',
        email: 'super@example.com',
        password: 'password',
        role: 'super_admin',
      });
      console.log('✅ Super Admin created');
    }

    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('⚠️  Admin already exists');
    } else {
      await User.create({
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: 'password',
        role: 'admin',
      });
      console.log('✅ Admin created');
    }

    // Check if test user exists
    const userExists = await User.findOne({ email: 'user@example.com' });
    if (userExists) {
      console.log('⚠️  Test User already exists');
    } else {
      await User.create({
        fullName: 'John Doe',
        email: 'user@example.com',
        password: 'password',
        phoneNumber: '01712345678',
        address: '123 Dhaka Road, Dhaka',
        role: 'user',
      });
      console.log('✅ Test User created');
    }

    console.log('\n📝 Login Credentials:');
    console.log('Super Admin: super@example.com / password');
    console.log('Admin: admin@example.com / password');
    console.log('User: user@example.com / password');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
