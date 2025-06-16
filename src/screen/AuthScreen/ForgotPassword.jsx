import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
    console.log('Reset link sent to:', email);
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
          />

          <button type="submit" className={`${styles.button} ${styles.forgotPasswordButton}`}>
            Send Reset Link
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
