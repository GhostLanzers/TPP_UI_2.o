import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./Components/Main/NavBar";
import Login from "./Components/Main/Login";
import ProtectedRoute from "./Components/Main/ProtectedRoute";
import ProfileDashboard from "./Components/Profile/ProfileDashboard";

function App() {

  const [user, setUser] = React.useState();

  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>          
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            element={
              <ProtectedRoute user={user} setUser={setUser}>
                <NavBar user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          >
            <Route path="/live" element={<Login setUser={setUser}/>} />
            <Route path="/" element={<ProfileDashboard user={user}/>} />
            <Route path="/company" element={<Company setUser={setUser}/>} />
            <Route path="/account" element={<Account setUser={setUser}/>} />
            <Route path="/bulkupload" element={<BulkUpload setUser={setUser}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
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
