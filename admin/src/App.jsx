import React, { useEffect, useState } from "react";
import { Navbar } from "./Components/Navbar.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Order } from "./pages/Order.jsx";
import { ListItem } from "./pages/ListItem.jsx";
import { Sidebar } from "./Components/Sidebar.jsx";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import backendUrl from "./constanst/backendUrl.js";
import { Add } from "./pages/Add.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/admin-check-auth`, { withCredentials: true });
      if (response.data.success) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
    console.log(isAuthenticated);
  }, [isAuthenticated]);


  return (
    <>
      {/* Navbar at the Top */}
      {!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navbar setIsAuthenticated={setIsAuthenticated} />}

      {/* Sidebar + Main Content Layout */}
      <div className="flex h-screen">
        {/* Sidebar (Left) */}
        {isAuthenticated ? <Sidebar /> : null}

        {/* Main Content (Right) */}
        <div className="p-0 flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated}/> : <Add />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated}/> : <Order />} />
            <Route path="/list-items" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated}/> : <ListItem />} />
          </Routes>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default App;
