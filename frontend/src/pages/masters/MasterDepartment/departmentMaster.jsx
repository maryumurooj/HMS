import React from "react";
import departmentMasterSchema from "./departmentMasterSchema.json";
import DynamicForm from "../../../components/dynamicForm";
import styles from "../master.module.css"

const DepartmentMaster = () => {
  const handleFormSubmit = (formData) => {
    console.log("Submitted Data:", formData);
    // Handle the form submission logic here
  };

  return (
    <div className={styles.form}>
      <DynamicForm formSchema={departmentMasterSchema} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default DepartmentMaster;
