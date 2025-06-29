import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/auth/auth.js'; // Adjust the import path as needed
import styles from './Auth.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await forgotPassword(email);
      
      // Success - show success message
      setSuccess('Password reset link has been sent to your email address.');
      setEmail(''); // Clear the email field
      
    } catch (err) {
      // Handle error
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to send reset link. Please try again.';
      setError(errorMessage);
      console.error('Forgot password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Forgot Password</h2>

        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            disabled={loading}
          />

          {error && <p className={styles.errorText}>{error}</p>}
          {success && <p className={styles.successText}>{success}</p>}

          <button 
            type="submit" 
            className={`${styles.button} ${styles.forgotPasswordButton}`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>

        <div className={styles.linksContainer}>
          <p className={styles.linkText}>
            Remembered your password? <Link to="/" className={styles.link}>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;