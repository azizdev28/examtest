import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <Router>
      <div className="flex w-full min-h-screen">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="addproducts" element={<AddProducts />} />
              <Route path="products" element={<Products />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
