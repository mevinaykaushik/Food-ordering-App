import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";

import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../Screens/Cart";

const Navbar = () => {
  const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
  

  const HandleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const loadCart = () => {
    setCartView(true)
}
const items = useCart();
  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <ul className="flex">
            <Link to="/" className="text-white text-2xl font-bold">
              My Food App
            </Link>
            {localStorage.getItem("authToken") ? (
              <li>
                <Link
                  to="/myorder"
                  className="hover:underline mx-2 font-semibold text-slate-800"
                >
                  My Orders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="flex mx-2">
              <Link to="/login" className="text-white hover:underline mx-2">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:underline">
                Sign-up
              </Link>
            </div>
          ) : (
            <div className="flex"> 
              <div
                className="flex"
                onClick={loadCart}
              >
                 <pre> <button className="text-gray-50 font-bold text-lg">Cart  <Badge color="secondary" badgeContent={items.length}>
                  
                  </Badge> </button>  </pre>
                
               
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart></Cart>
                </Modal>
              ) : (
                ""
              )}
              <Link
                to="/login"
                className="text-white hover:underline mx-2"
                onClick={HandleLogout}
              >
                LogOut
              </Link>
             
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
