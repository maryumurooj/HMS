import React, { useState } from "react";
import styles from "./dynamicForm.module.css";

const DynamicForm = ({ formSchema, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {formSchema.sections.map((section, index) => (
        <div key={index} className={styles.formSection}>
          <div className={styles.sectionTitleContainer}>
            <h2 className={styles.sectionTitle}>{section.sectionTitle}</h2>
          </div>
          {section.fields.map((field, fieldIndex) => (
            <div key={fieldIndex} className={styles.formGroup}>
              <label htmlFor={field.name} className={styles.label}>
                {field.label}
              </label>
              {field.type === "text" || field.type === "email" || field.type === "date" || field.type === "number" || field.type === "datetime-local" ? (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className={styles.input}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className={styles.select}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className={styles.textarea}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              ) : field.type === "radio" ? (
                <div className={styles.radioGroupContainer}>{
                field.options.map((option, optIndex) => (
                  <div key={optIndex} className={styles.radioGroup}>
                    <input
                      type="radio"
                      id={`${field.name}-${optIndex}`}
                      name={field.name}
                      value={option.value} // Corrected
                      className={styles.radioInput}
                      onChange={handleChange}
                      required={field.required || false} // Corrected
                    />
                    <label htmlFor={`${field.name}-${optIndex}`} className={styles.radioLabel}>
                      {option.label} {/* Corrected */}
                    </label>
                  </div>
                ))}</div>
              ) : field.type === "checkbox" ? (
                <div className={styles.checkboxgroup}><input
                  type="checkbox"
                  id={field.name}
                  name={field.name}
                  className={styles.checkbox}
                  onChange={handleChange}
                /></div>
              ) : field.type === "file" ? (
                <input
                  type="file"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className={styles.fileInput}
                  onChange={handleChange}
                />
                
              ) :
              
              field.type === "time" ? (
                <div className={styles.timegroup}>
                <input
                  type="time"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className={styles.timeInput}
                  onChange={handleChange}
                /></div>
              ) :
              field.type === "file" ? (
                <input
                  type="file"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className={styles.fileInput}
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: files,
                    }));
                  }}
                />
              ) :
              field.type === "checkbox-group" ? (
                <div className={styles.checkboxGroupContainer}>
                  {field.options.map((option, optIndex) => (
                    <div key={optIndex} className={styles.checkboxGroup}>
                      <input
                        type="checkbox"
                        id={`${field.name}-${optIndex}`}
                        name={field.name}
                        value={option}
                        className={styles.checkbox}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          setFormData((prev) => {
                            const existing = prev[field.name] || [];
                            return {
                              ...prev,
                              [field.name]: checked
                                ? [...existing, value]
                                : existing.filter((v) => v !== value),
                            };
                          });
                        }}
                      />
                      <label htmlFor={`${field.name}-${optIndex}`} className={styles.checkboxLabel}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ) :

              field.type === "multi-select" ? (
                <div className={styles.checkboxGroupContainer}>
                  {field.options.map((option, optIndex) => (
                    <div key={optIndex} className={styles.checkboxGroup}>
                      <input
                        type="checkbox"
                        id={`${field.name}-${optIndex}`}
                        name={field.name}
                        value={option}
                        className={styles.checkbox}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          setFormData((prev) => {
                            const existing = prev[field.name] || [];
                            return {
                              ...prev,
                              [field.name]: checked
                                ? [...existing, value]
                                : existing.filter((v) => v !== value),
                            };
                          });
                        }}
                      />
                      <label htmlFor={`${field.name}-${optIndex}`} className={styles.checkboxLabel}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ) :
              null}
            </div>
          ))}
        </div>
      ))}
      <div className={styles.buttons}>
        <button type="submit" className={styles.button}>
          Submit
        </button>
        <button type="submit" className={styles.button}>
          Print
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
