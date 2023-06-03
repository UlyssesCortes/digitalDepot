import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Hero from './components/Hero/Hero'
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import Register from './components/Login-Register/Register';
import Login from './components/Login-Register/Login';
import Cart from './components/Products/Cart';
import Offers from './components/SpecialOffers/Offers';
import Header from './components/Navbar/Header';

function App() {

  const API_URL = "https://digital-depot.onrender.com/api/";
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState("")
  const [user, setUser] = useState("")
  const [currentOrderId, setCurrentOrderId] = useState("")
  const [quantity, setQuantity] = useState(1);
  const [filterName, setFilterName] = useState("")
  const [hideNav, setHideNav] = useState(false)
  const [finializedOrders, setFinalizedOrders] = useState([])
  const [favorites, setFavorites] = useState([])
  const [showProfile, setShowProfile] = useState(false)
  const [showOrder, setShowOrder] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [pageTitle, setPageTitle] = useState("SHOPPING CART");

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    const currentOrderId = window.localStorage.getItem('currentOrderId');
    const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');
    setCurrentOrderId(currentOrderId)
    setIsLoggedIn(isLoggedInLocal)
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
      fetchFavorites();
      fetchOrders()
    }
  }, [token]);

  const fetchFavorites = async () => {
    try {
      try {
        const favoriteProducts = await fetch(`${API_URL}favorite/myFavorites`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const products = await favoriteProducts.json();
        console.log("FAVORITES: ", products)
        setFavorites(products)
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    if (token) {
      const response = await fetch(`${API_URL}order/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("MY ORDERS: ", data)
      setFinalizedOrders(data)
    }
  }

  return (
    <>
      <BrowserRouter>
        {!hideNav &&
          <div className='marginReducer'>
            <Header API_URL={API_URL} setHideNav={setHideNav} hideNav={hideNav} setIsLoggedIn={setIsLoggedIn} setFilterName={setFilterName} filterName={filterName} token={token} setFavorites={setFavorites} showProfile={showProfile} setShowProfile={setShowProfile} setShowFavorite={setShowFavorite} setShowOrder={setShowOrder} setPageTitle={setPageTitle} />
          </div>
        }
        <Routes>
          <Route
            path='/'
            element={<Hero API_URL={API_URL} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setFilterName={setFilterName} setShowProfile={setShowProfile} />}
          />
          <Route
            path='/home'
            element={<Hero API_URL={API_URL} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setFilterName={setFilterName} />}
          />
          <Route
            path='/register'
            element={<Register API_URL={API_URL} setHideNav={setHideNav} />}
          />
          <Route
            path='/login'
            element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} setUser={setUser} setToken={setToken} user={user} token={token} setHideNav={setHideNav} />}
          />
          <Route
            path='/cart'
            element={<Cart API_URL={API_URL} token={token} setCurrentOrderId={setCurrentOrderId} currentOrderId={currentOrderId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setQuantity={setQuantity} quantity={quantity} setFilterName={setFilterName} setShowProfile={setShowProfile} favorites={favorites} finializedOrders={finializedOrders} showOrder={showOrder} setShowOrder={setShowOrder} showFavorite={showFavorite} setShowFavorite={setShowFavorite} pageTitle={pageTitle} setPageTitle={setPageTitle} />}
          />
          <Route
            path='/products'
            element={<Products API_URL={API_URL} user={user} token={token} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} filterName={filterName} setFilterName={setFilterName} setShowProfile={setShowProfile} />}
          />
          <Route
            path='/offers'
            element={<Offers API_URL={API_URL} user={user} token={token} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setShowProfile={setShowProfile} />}
          />
          <Route path="/product/:id"
            element={<ProductDetails API_URL={API_URL} user={user} token={token} currentOrderId={currentOrderId} setCurrentOrderId={setCurrentOrderId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setQuantity={setQuantity} quantity={quantity} setShowProfile={setShowProfile} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
