import { useEffect, useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center rounded-xl">
      <div className="flex flex-col justify-center sm:flex-row mt-10">
        <div className="sm:w-1/3 flex justify-center flex-col items-center text-center sm:pr-8 sm:py-8">
          <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex flex-col items-center text-center justify-center">
            <h2 className="font-black  title-font mt-4 text-gray-900 text-xl">
              Username: {username}
            </h2>
            <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
            <p className="font-black  title-font mt-4 text-gray-900 text-xl">
              Password: {password}
            </p>
          </div>

          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
