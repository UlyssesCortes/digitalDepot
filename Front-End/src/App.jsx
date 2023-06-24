import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "@stripe/stripe-js"
import axios from 'axios';

import Hero from './components/Hero/Hero'
import Products from './components/Products/ProductList/Products';
import ProductDetails from './components/Products/ProductDetails/ProductDetails';
import Register from './components/Login-Register/Register';
import Login from './components/Login-Register/Login';
import Cart from './components/Products/Cart/Cart';
import Offers from './components/SpecialOffers/Offers';
import Header from './components/Navbar/Header';
import NotFound from './components/NotFound';
import Success from './components/Products/Cart/Success';

const App = () => {
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
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [showProfile, setShowProfile] = useState(false)
  const [demoUser, setDemoUser] = useState(false)
  const [showOrder, setShowOrder] = useState(false);
  const [isCategorieOpen, setIsCategorieOpen] = useState(false);
  const [showCart, setShowCart] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [pageTitle, setPageTitle] = useState("SHOPPING CART");
  const [modalEmail, setModalEmail] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  // localStorage.setItem('currentOrderId', "");
  useEffect(() => {
    const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');
    setIsLoggedIn(isLoggedInLocal)
    const localCurrentOrderId = window.localStorage.getItem('currentOrderId');
    setCurrentOrderId(localCurrentOrderId)

    if (!isLoggedInLocal) {
      localStorage.setItem('currentOrderId', "");
    }

    if (isLoggedInLocal) {
      const localToken = window.localStorage.getItem('token');
      const currentOrderId = window.localStorage.getItem('currentOrderId');
      setToken(localToken)
      setIsLoggedIn(isLoggedInLocal)
      setCurrentOrderId(currentOrderId)
    }

  }, [])

  useEffect(() => {
    const localCurrentOrderId = window.localStorage.getItem('currentOrderId');
    if (!localCurrentOrderId && isLoggedIn) {
      fetchOrder()
    }
    if (filterName == "") {
      setFilterName("all")
    }
  }, [isLoggedIn])

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    const currentOrderId = window.localStorage.getItem('currentOrderId');
    const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');
    setCurrentOrderId(currentOrderId)
    setIsLoggedIn(isLoggedInLocal)
    setToken(localToken)

    if (localToken) {
      setIsLoggedIn(true)
      getUser();
      getCartTest()
    } else {
      fetchGuestProducts()
    }
  }, [token]);

  useEffect(() => {
    if (filterName) {
      setActiveCategory(filterName)
    }

  }, [filterName])

  const getUser = async () => {
    const response = await axios.get(`${API_URL}users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    const result = response.data
    setUser(result)
  }

  const getCartTest = async () => {
    try {
      const localToken = window.localStorage.getItem('token');
      if (localToken) {
        const response = await axios.get(`${API_URL}order/cart`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localToken}`,
          },
        })
        const items = await response.data;
        setCartItems(items)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGuestProducts = async () => {
    const localToken = window.localStorage.getItem('token');
    if (!localToken) {
      const response = await axios.get(`${API_URL}products`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.data;
      if (result) {
        setProducts(result);
      }
      return result;
    }
  }

  const fetchOrder = async () => {
    if (token) {
      const response = await axios.get(`${API_URL}order/myOrders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.data;
      const orderId = data[0].id
      localStorage.setItem('currentOrderId', orderId);
      setCurrentOrderId(orderId)
    }
  }

  return (
    <>
      <BrowserRouter>
        {!hideNav &&
          <div className='marginReducer'>
            <Header API_URL={API_URL} setHideNav={setHideNav} hideNav={hideNav} setIsLoggedIn={setIsLoggedIn} setFilterName={setFilterName} filterName={filterName} token={token} setFavorites={setFavorites} showProfile={showProfile} setShowProfile={setShowProfile} setShowFavorite={setShowFavorite} setShowOrder={setShowOrder} setPageTitle={setPageTitle} setShowCart={setShowCart} setCurrentPage={setCurrentPage} currentPage={currentPage} setFinalizedOrders={setFinalizedOrders} noResult={noResult} setIsCategorieOpen={setIsCategorieOpen} isCategorieOpen={isCategorieOpen} setCartItems={setCartItems} setCurrentOrderId={setCurrentOrderId} setProducts={setProducts} />
          </div>
        }
        <Routes>
          <Route
            path='/'
            element={<Hero API_URL={API_URL} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setFilterName={setFilterName} setShowProfile={setShowProfile} setIsCategorieOpen={setIsCategorieOpen} />}
          />
          <Route
            path='/paymentSuccess'
            element={<Success API_URL={API_URL} setCurrentOrderId={setCurrentOrderId} setCartItems={setCartItems} />}
          />
          <Route
            path='/register'
            element={<Register API_URL={API_URL} setHideNav={setHideNav} setDemoUser={setDemoUser} />}
          />
          <Route
            path='/login'
            element={<Login setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} setUser={setUser} setToken={setToken} user={user} token={token} setHideNav={setHideNav} modalEmail={modalEmail} demoUser={demoUser} setDemoUser={setDemoUser} />}
          />
          <Route
            path='/cart'
            element={<Cart API_URL={API_URL} token={token} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setQuantity={setQuantity} quantity={quantity} setFilterName={setFilterName} setShowProfile={setShowProfile} favorites={favorites} finializedOrders={finializedOrders} showOrder={showOrder} setShowOrder={setShowOrder} showFavorite={showFavorite} setShowFavorite={setShowFavorite} pageTitle={pageTitle} setPageTitle={setPageTitle} setShowCart={setShowCart} showCart={showCart} cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path='/products'
            element={<Products API_URL={API_URL} user={user} token={token} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} filterName={filterName} setFilterName={setFilterName} setShowProfile={setShowProfile} setModalEmail={setModalEmail} modalEmail={modalEmail} products={products} setCurrentPage={setCurrentPage} currentPage={currentPage} setProducts={setProducts} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setNoResult={setNoResult} noResult={noResult} setDemoUser={setDemoUser} />}
          />
          <Route
            path='/offers'
            element={<Offers setShowProfile={setShowProfile} setFilterName={setFilterName} setActiveCategory={setActiveCategory} />}
          />
          <Route path="/products/:id"
            element={<ProductDetails API_URL={API_URL} user={user} token={token} currentOrderId={currentOrderId} setCurrentOrderId={setCurrentOrderId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setQuantity={setQuantity} quantity={quantity} setShowProfile={setShowProfile} setModalEmail={setModalEmail} modalEmail={modalEmail} setCartItems={setCartItems} setDemoUser={setDemoUser} />}
          />
          <Route
            path="/*"
            element={(
              <NotFound setHideNav={setHideNav} />
            )}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
