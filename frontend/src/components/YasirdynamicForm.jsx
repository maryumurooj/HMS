import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardHeader,
  Box,
} from "@mui/material";
import styles from "./YasirdynamicForm.module.css";

const DynamicForm = ({ formSchema, onSubmit, defaultValues = {} }) => {
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
        <Card
          key={index}
          className={styles.formSection}
          elevation={3}
          sx={{
            height: "100%",
            margin: "0px",
          }}
        >
          <CardHeader
            title={section.sectionTitle}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              margin: "0",
              padding: "8px 16px",
              "& .MuiCardHeader-title": {
                fontSize: "1.1rem",
                fontWeight: 500,
              },
            }}
          />
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className={styles.formGroup}>
                  {/* Label for all inputs */}
                  {(field.type === "date" ||
                    field.type === "datetime-local" ||
                    field.type === "checkbox" ||
                    field.type === "radio" ||
                    field.type === "time") && (
                    <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
                  )}

                  {/* TextField for text, email, date, number, datetime-local */}
                  {field.type === "text" ||
                  field.type === "email" ||
                  field.type === "number" ? (
                    <TextField
                      size="small"
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
                  ) : field.type === "date" ||
                    field.type === "datetime-local" ||
                    field.type === "time" ? (
                    <TextField
                      size="small"
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      className={styles.input}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  ) : field.type === "select" ? (
                    <TextField
                      select
                      size="small"
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      required={field.required}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        {field.placeholder || "Select an option"}
                      </MenuItem>
                      {field.options.map((option, optIndex) => (
                        <MenuItem 
                          key={optIndex} 
                          value={option.value || option}
                        >
                          {option.label || option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : field.type === "textarea" ? (
                    <TextField
                      size="small"
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      className={styles.textarea}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      multiline
                      rows={3}
                      fullWidth
                    />
                  ) : field.type === "radio" ? (
                    <FormControl size="small">
                      <RadioGroup
                        name={field.name}
                        onChange={handleChange}
                        row
                        sx={{ "& .MuiRadio-root": { padding: "4px" } }}
                      >
                        {field.options.map((option, optIndex) => (
                          <FormControlLabel
                            key={optIndex}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  ) : field.type === "checkbox" ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          id={field.name}
                          name={field.name}
                          checked={formData[field.name] || false}
                          onChange={handleChange}
                          className={styles.checkbox}
                        />
                      }
                      label={field.label}
                    />
                  ) : field.type === "file" ? (
                    <TextField
                      size="small"
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
                      <p>{field.label}</p>{" "}
                      {/* Label for multi-select checkbox */}
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
            </Box>
          </CardContent>
        </Card>
      ))}
      <Card className={styles.buttonsSection}>
        <CardContent>
          <Box className={styles.buttons}>
            <Button
              type="submit"
              variant="contained"
              className={styles.button}
              sx={{
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                  transform: "scale(1.02)",
                },
              }}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              className={styles.button}
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  borderColor: "primary.dark",
                  backgroundColor: "primary.light",
                  transform: "scale(1.02)",
                },
              }}
            >
              Print
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export default DynamicForm;
