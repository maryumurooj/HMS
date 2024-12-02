import React, { useState } from "react";
import { TextField, MenuItem, Checkbox, Radio, RadioGroup, FormControlLabel, Button, InputLabel, FormControl } from "@mui/material";
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
              {/* Label for all inputs */}
              {(field.type === "date" || field.type === "datetime-local" || field.type === "checkbox" || field.type === "radio" || field.type === "time") && (
                <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
              )}

              {/* TextField for text, email, date, number, datetime-local */}
              {field.type === "text" || field.type === "email" || field.type === "number" ? (
                <TextField
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  required={field.required}
                  className={styles.input}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  fullWidth
                />
              ) : field.type === "date" || field.type === "datetime-local" || field.type === "time" ? (
                <>
                  <TextField
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    className={styles.input}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    fullWidth
                  />
                </>
              ) : field.type === "select" ? (
                <TextField
                  select
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    {field.placeholder}
                  </MenuItem>
                  {field.options.map((option, optIndex) => (
                    <MenuItem key={optIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ) : field.type === "textarea" ? (
                <TextField
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className={styles.textarea}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  multiline
                  rows={4}
                  fullWidth
                />
              ) : field.type === "radio" ? (
                <>
                  
                  <RadioGroup name={field.name} onChange={handleChange} row>
                    {field.options.map((option, optIndex) => (
                      <FormControlLabel
                        key={optIndex}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </>
              ) : field.type === "checkbox" ? (
                <div>
                
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={formData[field.name] || false}
                        onChange={handleChange}
                        className={styles.checkbox}
                      />
                    }
                    label={field.label}
                  />
                </div>
              ) : field.type === "file" ? (
                <TextField
                  type="file"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className={styles.fileInput}
                  onChange={handleChange}
                  fullWidth
                />
              ) : field.type === "checkbox-group" ? (
                <div className={styles.checkboxGroupContainer}>
                  <p>{field.label}</p> {/* Label for checkbox group */}
                  {field.options.map((option, optIndex) => (
                    <FormControlLabel
                      key={optIndex}
                      control={
                        <Checkbox
                          name={field.name}
                          value={option}
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
                      }
                      label={option}
                    />
                  ))}
                </div>
              ) : field.type === "multi-select" ? (
                <div className={styles.checkboxGroupContainer}>
                  <p>{field.label}</p> {/* Label for multi-select checkbox */}
                  {field.options.map((option, optIndex) => (
                    <FormControlLabel
                      key={optIndex}
                      control={
                        <Checkbox
                          name={field.name}
                          value={option}
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
                      }
                      label={option}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
      <div className={styles.buttons}>
        <Button type="submit" variant="contained" className={styles.button}>
          Submit
        </Button>
        <Button type="button" variant="outlined" className={styles.button}>
          Print
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
