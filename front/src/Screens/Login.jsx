import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";


const Login = () => {
  const [Credential, setCredential] = useState({ email: "", password: "" });

  let navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Credential.email,
        password: Credential.password,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (!data.success) {
      alert("Enter valid credntials");
    }
    if (data.success) {
      navigate("/");
      localStorage.setItem("authToken",data.authToken);
      localStorage.setItem("userEmail",Credential.email);
      console.log(localStorage.getItem("authToken"));
    }
  };

  const HandleOnChange = (event) => {
    setCredential({ ...Credential, [event.target.name]: event.target.value });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={HandleOnChange}
          value={Credential.email}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={HandleOnChange}
          value={Credential.password}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        className=" bg-blue-500 text-white p-2 rounded-md mb-6 hover:bg-blue-600 focus:outline-none "
      >
        Login
      </button>
      <Link to ="/signup " className='p-2 bg-red-500 mx-9 rounded-lg text-gray-50 font-bold'>I am new User</Link>
      </form>
    </div>
  );
};

export default Login;
