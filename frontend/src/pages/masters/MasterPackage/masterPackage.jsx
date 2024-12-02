import React from "react";
import PackageData from "./MasterPackage.json";
import DynamicForm from "../../../components/dynamicForm";
import styles from "../master.module.css"

const WardMaster = () => {
  const handleFormSubmit = (formData) => {
    console.log("Submitted Data:", formData);
    // Handle the form submission logic here
  };

  return (
    <div className={styles.form}>
      <DynamicForm formSchema={PackageData} onSubmit={handleFormSubmit} />
      
    </div>
  );
};

export default WardMaster;



  