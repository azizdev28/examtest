import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="flex w-full min-h-screen">
        <div className="w-full">
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
            >
              {isLoggedIn ? (
                <>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="addproducts" element={<AddProducts />} />
                  <Route path="profile" element={<Profile />} />
                </>
              ) : null}
            </Route>

            <Route path="register" element={<Register />} />
            <Route
              index
              path="login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
