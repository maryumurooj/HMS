import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./components/Registration/Registration";
import DoctorMaster from "./components/MasterDoctor/doctorMaster"

function App() {
  return (
    <>
    <Routes>
    <Route path="/doctorMaster" element={<DoctorMaster />} />
    <Route path="/Register" element={<Test />} />

    </Routes>
      <div className="App">
        <div className="Content">
          
        </div>
      </div>
    </>
  );
}

export default App;
