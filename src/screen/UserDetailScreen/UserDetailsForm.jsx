import React, { useState } from 'react';
import styles from './UserDetailsForm.module.css';

const UserDetailsForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    mobileNumber: '',
    selectedOption: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setFormData((prev) => ({
      ...prev,
      selectedOption,
      additionalInfo: '', // reset additional info on option change
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add form submission logic here
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>User Details</h2>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <input
            type="tel"
            name="mobileNumber"
            placeholder="Enter 10-digit mobile number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={styles.input}
          />
       
        <fieldset className={styles.radioGroup}>
          <legend className={styles.legend}>Select an option:</legend>

          {['rocky', 'autnherporniur', 'company', 'collage'].map((option) => (
            <label key={option} className={styles.radioLabel}>
              <input
                type="radio"
                name="selectedOption"
                value={option}
                checked={formData.selectedOption === option}
                onChange={handleOptionChange}
                required
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </fieldset>

        {formData.selectedOption && (
          <input
            type="text"
            name="additionalInfo"
            placeholder={`Enter details for ${formData.selectedOption}`}
            value={formData.additionalInfo}
            onChange={handleChange}
            required
            className={styles.input}
          />
        )}

        <button type="submit" className={styles.button}>Submit</button>
         </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;
