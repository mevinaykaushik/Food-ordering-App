import React from 'react'

import { useCart, useDispatchCart } from '../Components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='text-3xl text-gray-200 text-center'>The Cart is Empty!</div>
      </div>
    )
  } 


  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
   
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div className='flex'>

      {console.log(data)}
      <div className=" mx-auto mt-5 text-gray-100" >
  <div className="overflow-x-auto ">
    <table className="table-auto border">
      <thead className="text-success text-lg">
        <tr>
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Option</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((food, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{food.name}</td>
            <td className="px-4 py-2">{food.quantity}</td>
            <td className="px-4 py-2">{food.size}</td>
            <td className="px-4 py-2">{food.price}</td>
            <td className="px-4 py-2">
              <button
                className="b"
                onClick={() => {
                  dispatch({ type: "REMOVE", index: index });
                }}
              >
                 🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div>
    <h1 className="text-xl mt-5">Total Price: {totalPrice}/-</h1>
  </div>
  <div>
    <button
      className="px-10 py-1 my-4 rounded-lg font-serif bg-red-600 text-gray-300 hover:bg-green-500 hover:text-black"
      onClick={handleCheckOut}
    >
      Check Out
    </button>
  </div>
</div>




    </div>
  )
}