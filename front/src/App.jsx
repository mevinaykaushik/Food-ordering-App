import React from 'react'
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import Home from './Screens/Home'
import Login from './Screens/Login';
import Signup from './Screens/Signup';

import { CartProvider } from './Components/ContextReducer';
import MyOrder from './Screens/MyOrder';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <CartProvider>

    
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/myorder' element={<MyOrder/>}/>
      </Routes>
    
    </Router>
    </CartProvider>
  )
}

export default App