import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import DashSidebar from "./components/DashSidebar";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import AddStudents from "./pages/AddStudents";
import AddTeachers from "./pages/AddTeachers";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
// import Layout from "./components/Layout/Layout";
// import EditStudents from "./pages/EditStudents";

const App = () => {
  return (
    <Router>
      <div className="flex w-full min-h-screen">
        <DashSidebar />
        <div className="w-full">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="register" element={<Register />} />
            <Route path="addstudent" element={<AddStudents />} />
            <Route path="addteacher" element={<AddTeachers />} />
            <Route path="addproducts" element={<AddProducts />} />
            <Route path="products" element={<Products />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
