import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';
import classNames from 'classnames';

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
      <div className={styles.logocont}>
        <div className={styles.nessefyLogo}>nessefy up ...</div>
        <p className={styles.nessefyDes}>Founders, builders, and early teams 🤝 share wins 🏆, ask for help 🙋‍♀️, and grow side by side 🌱.
Post updates 🧵, find collaborators 🤓, test ideas 💡, and build in public.
No flexing, no fluff — just real momentum and real entrepreneurs. 🔥</p>
      </div>

      <div className={styles.verticalLine}></div>

      <form onSubmit={handleSubmit} className={styles.form}>
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

          <button type="submit" className={styles.button}>Log in</button>
        </div>

        <div className={styles.linksContainer}>
          <Link to="/forgot-password" className={styles.link}>Forgot Password?</Link>
          {/* <Link to="/register" className={styles.link}>Create Account</Link> */}
        </div>
        <div className={styles.createaccount}>
          <div className={styles.drawline}></div>
          <button type="register" className={classNames(styles.button, styles.cabutton)}>
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
