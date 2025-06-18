import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Auth.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    // Add your registration logic here
    console.log(formData);

    navigate('/user-details');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Register Account</h2>

        <div className={styles.formGroup}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
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

           {error && <p className={styles.errorText}>{error}</p>}

          <input
            type="text"
            name="verificationCode"
            placeholder="Verification Code"
            value={formData.verificationCode}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.button}>Register</button>
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
