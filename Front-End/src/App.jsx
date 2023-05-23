import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Hero from './components/Hero/Hero'
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import Register from './components/Login-Register/Register';
import Login from './components/Login-Register/Login';
import Cart from './components/Products/Cart';
function App() {

  const API_URL = "https://digital-depot.onrender.com/api/";
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState("")
  const [user, setUser] = useState("")
  const [currentOrderId, setCurrentOrderId] = useState("")

  // Save currentOrderId in local storage

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    setToken(localToken)
    if (localToken) {
      setIsLoggedIn(true)
    }
    if (token) {
      fetch(`${API_URL}users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setUser(result)
        })
        .catch((error) => console.log(error));
    }
  }, [token]);
  console.log(user)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Hero API_URL={API_URL} isLoggedIn={isLoggedIn} />}
          />

          <Route
            path='/register'
            element={<Register API_URL={API_URL} />}
          />
          <Route
            path='/login'
            element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} setUser={setUser} setToken={setToken} user={user} token={token} />}
          />
          <Route
            path='/cart'
            element={<Cart API_URL={API_URL} token={token} setCurrentOrderId={setCurrentOrderId} currentOrderId={currentOrderId} />}
          />

          <Route
            path='/products'
            element={<Products API_URL={API_URL} user={user} token={token} />}
          />
          <Route path="/product/:id"
            element={<ProductDetails API_URL={API_URL} user={user} token={token} currentOrderId={currentOrderId} setCurrentOrderId={setCurrentOrderId} />}
          />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
