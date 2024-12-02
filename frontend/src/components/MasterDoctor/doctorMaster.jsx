import React from "react";
import doctorRegistrationSchema from "./doctorRegistrationSchema.json";
import DynamicForm from "../dynamicForm";

const DoctorRegistration = () => {

  
  const handleFormSubmit = (formData) => {
    console.log("Submitted Data:", formData);
    // Handle the form submission logic here
  };

  return (
    <div>
      
      <DynamicForm formSchema={doctorRegistrationSchema} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default DoctorRegistration;
