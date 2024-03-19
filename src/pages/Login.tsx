import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface TypeProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}
const Login = ({ setIsLoggedIn }: TypeProps) => {
  console.log(setIsLoggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (username === storedUsername && password === storedPassword) {
      setIsLoggedIn(true); // setIsLoggedIn propertisini ishlatish
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <Link to={"/register"}>Register</Link>
    </div>
  );
};

export default Login;
