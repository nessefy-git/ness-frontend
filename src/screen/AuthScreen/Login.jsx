import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../api/auth/auth.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await loginUser(formData);  // assume this returns { token }
      localStorage.setItem('token', response.token);
      navigate('/home');
    } catch (err) {
      // pick the most descriptive message available
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logocont}>
        <div className={styles.nessefyLogo}>nessefy up ...</div>
        <p className={styles.nessefyDes}>Founders, builders, and early teams 🤝 share wins 🏆, ask for help 🙋‍♀️, and grow side by side 🌱.
Post updates 🧵, find collaborators 🤓, test ideas 💡, and build in public.
No flexing, no fluff — just real momentum and real entrepreneurs. 🔥</p>
      </div>

      <div className={styles.verticalLine}></div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <h2 className={styles.heading}>Welcome to nessefy</h2>

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

          <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Logging in…' : 'Log in'}
      </button>

        </div>

        <div className={styles.linksContainer}>
          <Link to="/forgot-password" className={styles.link}>Forgot Password?</Link>
          {/* <Link to="/register" className={styles.link}>Create Account</Link> */}
        </div>
        <div className={styles.createaccount}>
          <div className={styles.drawline}></div>
          <Link to="/register" type="register" className={`${styles.button} ${styles.cabutton}`}>
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
