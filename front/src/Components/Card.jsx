import { useEffect, useRef, useState } from "react";
import React from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
 
  const [quantity, setquantity] = useState(1);
  const [size, setsize] = useState("");
  let dispatch = useDispatchCart();
  let data = useCart();
const priceRef=useRef();
  const HandleCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food != []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE",  id: props.foodItem._id, price: fullPrice,  quantity: quantity, })
        return
      }
      else if (food.size != size) {
        await dispatch({ type: "Add", id: props.foodItem._id, name: props.foodItem.name, price: fullPrice,  quantity: quantity, size: size,img: props.foodItem.img })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    // await dispatch({
    //   type: "Add",
    //   id: props.foodItem._id,
    //   name: props.foodItem.name,
    //   price: fullPrice,
    //   quantity: quantity,
    //   size: size,
    // });

    // console.log(data);
  };
  let options = props.options;
  let priceOptions = Object.keys(options);
  let fullPrice=quantity* parseInt(options[size])
  useEffect(()=>{
    setsize(priceRef.current.value)
  },[])

  return (

    <div className=" flex max-w-sm rounded overflow-hidden shadow-lg m-3 bg-black text-gray-200">
      <div className="p-4 bg-black border rounded shadow-md">
        <img
          className="w-full h-48 object-cover rounded-t"
          src={props.foodItem.img}
          alt="Food Image"
        />
        <div className="p-4">
          <div className="font-bold text-xl my-2">{props.foodItem.name}</div>
          <p className="text-gray-100 text-base mb-4">
            {props.foodItem.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <select
                name=""
                id=""
                className="bg-green-500 text-white p-2 rounded"
                onChange={(e) => setquantity(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name=""
                id=""
                className="bg-red-500 text-white p-2 rounded"
                ref={priceRef}
                onChange={(e) => setsize(e.target.value)}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xl font-bold tracking-wider text-green-400 hover:underline"> Price: {fullPrice}/-</div>
          </div>
          <button
            className="bg-red-400 text-black px-3 py-2 my-2"
            onClick={HandleCart}
          >
            {" "}
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
