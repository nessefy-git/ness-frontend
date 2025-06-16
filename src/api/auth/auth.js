import axiosInstance from './axios';

// Register user
export const registerUser = async (data) => {
  const response = await axiosInstance.post('/Auth/register', data);
  return response.data;
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
  const response = await axiosInstance.post('/Auth/verify-otp', {
    email,
    otp,
  });
  return response.data;
};

// Resend OTP
export const resendOtp = async (email) => {
  const response = await axiosInstance.post('/Auth/resend-otp', { email });
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post('/Auth/forgot-password', { email });
  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await axiosInstance.post('/Auth/reset-password', data);
  return response.data;
};

// Login
export const loginUser = async (data) => {
  const response = await axiosInstance.post('Auth/login', data);
  return response.data;
};