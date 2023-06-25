import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "@stripe/stripe-js"

import {
  getCartTestAPI,
  getProductsAPI,
  getUserAPI,
  fetchGuestProductsAPI,
  fetchMyOrdersAPI
} from './components/API/AppApi';

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
  const [updateFurniture, setUpdateFurniture] = useState(false)
  const [showFavorite, setShowFavorite] = useState(false);
  const [pageTitle, setPageTitle] = useState("SHOPPING CART");
  const [modalEmail, setModalEmail] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  // localStorage.setItem('currentOrderId', "");
  useEffect(() => {
    const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');
    const localToken = window.localStorage.getItem('token');
    const localCurrentOrderId = window.localStorage.getItem('currentOrderId');
    setIsLoggedIn(isLoggedInLocal)

    if (isLoggedInLocal) {
      setToken(localToken)
      setCurrentOrderId(localCurrentOrderId)
      getUser();
      getCartTest()
      getProducts()
    } else {
      localStorage.setItem('currentOrderId', "");
      fetchGuestProducts()
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
    if (filterName) {
      setActiveCategory(filterName)
    }
  }, [filterName])

  const getUser = async () => {
    const data = await getUserAPI(API_URL)
    setUser(data)
  }

  const getCartTest = async () => {
    const data = await getCartTestAPI(API_URL)
    setCartItems(data)
  }

  const getProducts = async () => {
    const data = await getProductsAPI(API_URL)
    setProducts(data)
  };

  const fetchGuestProducts = async () => {
    const data = await fetchGuestProductsAPI(API_URL)
    setProducts(data)
  }

  const fetchOrder = async () => {
    const data = await fetchMyOrdersAPI(token, API_URL)
    setCurrentOrderId(data)
  }

  return (
    <>
      <BrowserRouter>
        {!hideNav &&
          <div className='marginReducer'>
            <Header API_URL={API_URL} setHideNav={setHideNav} hideNav={hideNav} setIsLoggedIn={setIsLoggedIn} setFilterName={setFilterName} filterName={filterName} setFavorites={setFavorites} showProfile={showProfile} setShowProfile={setShowProfile} setShowFavorite={setShowFavorite} setShowOrder={setShowOrder} setPageTitle={setPageTitle} setShowCart={setShowCart} setCurrentPage={setCurrentPage} currentPage={currentPage} setFinalizedOrders={setFinalizedOrders} noResult={noResult} setIsCategorieOpen={setIsCategorieOpen} isCategorieOpen={isCategorieOpen} setCartItems={setCartItems} setCurrentOrderId={setCurrentOrderId} />
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
            element={<Products API_URL={API_URL} user={user} token={token} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} filterName={filterName} setFilterName={setFilterName} setShowProfile={setShowProfile} setModalEmail={setModalEmail} modalEmail={modalEmail} products={products} setCurrentPage={setCurrentPage} currentPage={currentPage} setProducts={setProducts} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setNoResult={setNoResult} noResult={noResult} setDemoUser={setDemoUser} updateFurniture={updateFurniture} setUpdateFurniture={setUpdateFurniture} />}
          />
          <Route
            path='/offers'
            element={<Offers setShowProfile={setShowProfile} setFilterName={setFilterName} setActiveCategory={setActiveCategory} />}
          />
          <Route path="/products/:id"
            element={<ProductDetails API_URL={API_URL} user={user} token={token} currentOrderId={currentOrderId} setCurrentOrderId={setCurrentOrderId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setQuantity={setQuantity} quantity={quantity} setShowProfile={setShowProfile} setModalEmail={setModalEmail} modalEmail={modalEmail} setCartItems={setCartItems} setDemoUser={setDemoUser} setUpdateFurniture={setUpdateFurniture} />}
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
