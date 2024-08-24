import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/Main/NavBar";
import Login from "./Components/Main/Login";
import ProtectedRoute from "./Components/Main/ProtectedRoute";
import ProfileDashboard from "./Components/Profile/ProfileDashboard";
import AddCandidate from "./Components/Profile/AddCandidate";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  );
}

function Layout() {
  
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && (
        <ProtectedRoute>
          <NavBar  />
        </ProtectedRoute>
      )}
      <Routes>
        <Route path="/login" element={<Login/>} />
        {/* Navigation Bar Routes */}
        <Route path="/live" element={<Login/>} />
        <Route path="/" element={<ProfileDashboard  />} />
        <Route path="/company" element={<Company />} />
        <Route path="/account" element={<Account />} />
        <Route path="/bulkupload" element={<BulkUpload />} />
        {/* Candidate Routes */}
        <Route path="/addcandidate" element={<AddCandidate/>} />
      </Routes>
    </>
  );
}

function Company() {
  return <h1>Company Page</h1>;
}

function Account() {
  return <h1>Account Page</h1>;
}

function BulkUpload() {
  return <h1>Bulk Upload Page</h1>;
}

export default App;
