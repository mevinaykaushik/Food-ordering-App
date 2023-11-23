import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const Signup = () => {

  const [Credential, setCredential] = useState({name:"",email:"",password:"",location:""});

const handleSubmit =async (e)=>{
e.preventDefault();
const response =await fetch("http://localhost:5000/api/createuser",{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({name:Credential.name,email:Credential.email,password:Credential.password,location:Credential.location})
});
const data =await response.json();
console.log(data);

if(!data.success){
  alert("Enter valid credntials")
}
}

const HandleOnChange=(event)=>{
setCredential({...Credential,[event.target.name]:event.target.value})
}



  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600 ">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={Credential.name}
          onChange={HandleOnChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
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
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={HandleOnChange}
          value={Credential.password}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-600">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={Credential.location}
          onChange={HandleOnChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        className=" bg-blue-500 text-white p-2 rounded-md mb-6 hover:bg-blue-600 focus:outline-none "
      >
        Sign Up
      </button>
      <Link to ="/login " className='p-2 bg-red-500 mx-9 rounded-lg text-gray-50 font-bold'>Already a User</Link>
     
    </form>
    
  </div>
  

  )
}

export default Signup