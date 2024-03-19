import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface TypeProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}
const Login = ({ setIsLoggedIn }: TypeProps) => {
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
    <div className="h-screen w-1/3 mx-auto gap-y-4 flex justify-center flex-col items-center">
      <h2 className="text-bold-900 font-black text-3xl">Login to Page</h2>
      <TextInput
        className="w-full"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        className="w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between items-center w-full">
        <Button onClick={handleLogin}>Login</Button>
        <span>Click to register</span>
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to={"/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
