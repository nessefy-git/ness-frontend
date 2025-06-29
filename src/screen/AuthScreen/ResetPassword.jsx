import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { resetPassword } from "../../api/auth/auth.js"; // Adjust the import path as necessary
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const togglePassword = () => setShowPassword((prev) => !prev);

  // Get email and token from query string (e.g., ?email=abc@example.com&token=XYZ)
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formData;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
      alert("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      console.log({ email: decodeURIComponent(email), token: encodeURIComponent(token), newPassword: encodeURIComponent(newPassword) })
      const response = await resetPassword({ email: email, token: encodeURIComponent(token), newPassword: encodeURIComponent(newPassword) });
      alert(response.message || "Password reset successfully.");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Reset Password</h2>

        <div className={styles.formGroup}>

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`${styles.input} ${styles.passwordInput}`}
            />
            <span className={styles.eyeIcon} onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.button}>Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
