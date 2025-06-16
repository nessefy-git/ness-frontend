import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Login / Email Verification</h2>

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

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.button}>Submit</button>
        </div>

        <div className={styles.linksContainer}>
          <Link to="/forgot-password" className={styles.link}>Forgot Password?</Link>
          <Link to="/register" className={styles.link}>Create Account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
