import React from "react";
import doctorRegistrationSchema from "./doctorRegistrationSchema.json";
import DynamicForm from "../../../components/dynamicForm";
import styles from "../master.module.css"

const DoctorRegistration = () => {
  const handleFormSubmit = (formData) => {
    console.log("Submitted Data:", formData);
    // Handle the form submission logic here
  };

  return (
    <div className={styles.form}>

      <DynamicForm formSchema={doctorRegistrationSchema} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default DoctorRegistration;