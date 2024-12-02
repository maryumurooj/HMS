import React from "react";
import WardData from "./MasterWard.json";
import DynamicForm from "../../../components/dynamicForm";
import styles from "../master.module.css"

const WardMaster = () => {
  const handleFormSubmit = (formData) => {
    console.log("Submitted Data:", formData);
    // Handle the form submission logic here
  };

  return (
    <div className={styles.form}>
      <DynamicForm formSchema={WardData} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default WardMaster;