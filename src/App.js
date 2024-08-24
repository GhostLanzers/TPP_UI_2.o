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
  const [user, setUser] = React.useState();
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && (
        <ProtectedRoute user={user} setUser={setUser}>
          <NavBar user={user} setUser={setUser} />
        </ProtectedRoute>
      )}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* Navigation Bar Routes */}
        <Route path="/live" element={<Login setUser={setUser} />} />
        <Route path="/" element={<ProfileDashboard user={user} />} />
        <Route path="/company" element={<Company user={user} />} />
        <Route path="/account" element={<Account user={user} />} />
        <Route path="/bulkupload" element={<BulkUpload user={user} />} />
        {/* Candidate Routes */}
        <Route path="/addcandidate" element={<AddCandidate user={user}/>} />
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
