import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    // Navigate to login page after registration
    navigate("/login");
  };

  return (
    <div className="h-screen w-1/3 mx-auto gap-y-4 flex justify-center flex-col items-center">
      <h2 className="text-bold-900 font-black text-3xl">Register</h2>
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
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
};

export default Register;
