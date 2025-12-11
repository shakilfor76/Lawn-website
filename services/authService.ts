import { User, Role } from '../types';
import { apiCall } from './api';

export const login = async (
  email: string,
  password: string,
): Promise<User> => {
  const data = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  // Map MongoDB _id to id for frontend compatibility
  return {
    ...data,
    id: data._id || data.id,
  };
};

export const register = async (
  userData: Omit<User, 'id' | 'role' | 'token'>,
): Promise<User> => {
  const data = await apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  // Map MongoDB _id to id for frontend compatibility
  return {
    ...data,
    id: data._id || data.id,
  };
};

export const logout = async (): Promise<void> => {
  return Promise.resolve();
};

export const getAllUsers = async (): Promise<User[]> => {
  const users = await apiCall('/admin/users', {
    method: 'GET',
  });
  // Map MongoDB _id to id for frontend compatibility
  return users.map((user: any) => ({
    ...user,
    id: user._id || user.id,
  }));
};

export const updateUserRole = async (
  userId: string,
  newRole: Role,
): Promise<void> => {
  await apiCall(`/admin/users/${userId}/role`, {
    method: 'PUT',
    body: JSON.stringify({ role: newRole }),
  });
};
