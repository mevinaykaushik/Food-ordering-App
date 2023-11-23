import React, { useState, useEffect } from "react";

import Footer from "../Components/Footer";

const MyOrder = () => {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:5000/api/myOrderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div className="flex font-bold  ">
        <div className="">
          {orderData != {}
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div className="bg-green-200 text-center m-5 ">
                              {arrayData.Order_date ? (
                                <div className="m-auto mt-5">
                                  {(data = arrayData.Order_date)}
                                  <hr />
                                </div>
                              ) : (
                                <div className=" justify-around">
                                  <div className="flex">
                                    <img
                                      src={arrayData.img}
                                      className="h-48 w-full object-cover"
                                      alt="..."
                                    />

                                    <div className="mx-10 justify-around">
                                      <h5 className="">{arrayData.name}</h5>
                                      <div
                                        className=""
                                        style={{ height: "38px" }}
                                      >
                                        <span className="">
                                          {arrayData.quantity}
                                        </span>
                                        <span className="">
                                          {arrayData.size}
                                        </span>
                                        <span className="flex">{data}</span>
                                        <div className=" ">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyOrder;
