import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Auth.module.css';
import { registerUser, resendOtp, verifyOtp } from '../../api/auth/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: Registration form, 2: OTP verification
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  
    const validateForm = () => {
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    
    // Strong password validation
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return false;
    }
    
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');    // clear previous errors on every change
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 1: Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser({
        email: formData.email,
        password: formData.password,
      })

       // Registration successful, move to OTP step
      setStep(2);
      setError('');
      console.log('Registration successful:', data);
    } catch (err) {
      // Handle registration error
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

   // Step 2: Handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await verifyOtp(formData.email, formData.otp);

      // OTP verification successful
      console.log('Registration completed successfully:', data);
      navigate('/user-details');
    } catch (err) {
      // Handle OTP verification error
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Invalid OTP. Please try again.';
      setError(errorMessage);
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle going back to registration form
  const handleBackToRegister = () => {
    setStep(1);
    setError('');
    setFormData((prev) => ({
      ...prev,
      otp: '',
    }));
  };

   // Resend OTP (optional feature)
  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      await resendOtp(formData.email);

      setError('OTP resent successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to resend OTP. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form 
        onSubmit={step === 1 ? handleRegister : handleVerifyOTP} 
        className={styles.form}
      >
        <h2 className={styles.heading}>
          {step === 1 ? 'Register Account' : 'Verify Email'}
        </h2>

        <div className={styles.formGroup}>
          {step === 1 ? (
            // Registration Form
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                disabled={loading}
              />

              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`${styles.input} ${styles.passwordInput}`}
                  disabled={loading}
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
                disabled={loading}
              />

              <button 
                type="submit" 
                className={styles.button}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </>
          ) : (
            // OTP Verification Form
            <>
              <p className={styles.otpInstruction}>
                We've sent a verification code to <strong>{formData.email}</strong>
              </p>

              <input
                type="text"
                name="otp"
                placeholder="Enter OTP Code"
                value={formData.otp}
                onChange={handleChange}
                required
                className={styles.input}
                disabled={loading}
                maxLength="6"
              />

              <button 
                type="submit" 
                className={styles.button}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div className={styles.otpActions}>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className={styles.linkButton}
                  disabled={loading}
                >
                  Resend OTP
                </button>
                <button
                  type="button"
                  onClick={handleBackToRegister}
                  className={styles.linkButton}
                  disabled={loading}
                >
                  Change Email
                </button>
              </div>
            </>
          )}

          {error && (
            <p className={styles.errorText}>
              {error}
            </p>
          )}
        </div>

        <div className={styles.linksContainer}>
          <p className={styles.linkText}>
            Already have an account? <Link to="/" className={styles.link}>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;