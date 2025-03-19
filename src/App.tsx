import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DocumentUpload from "./components/pages/documentUpload/documentUpload";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <DocumentUpload />
      <ToastContainer style={{ zIndex: 99999 }} />
    </>
  );
}

export default App;
