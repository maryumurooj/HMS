import React from "react";
import DynamicForm from "../dynamicForm";
import formSchema from "./formSchema.json"; // Import JSON file

const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Form Submitted:", formData);
    // You can send the form data to the backend API here
  };

  return (
    <div>
      <DynamicForm formSchema={formSchema} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
