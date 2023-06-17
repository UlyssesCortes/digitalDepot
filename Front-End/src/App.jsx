import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "@stripe/stripe-js"

import Hero from './components/Hero/Hero'
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import Register from './components/Login-Register/Register';
import Login from './components/Login-Register/Login';
import Cart from './components/Products/Cart';
import Offers from './components/SpecialOffers/Offers';
import Header from './components/Navbar/Header';
import NotFound from './components/NotFound';
import Success from './components/Products/Success';

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
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [showProfile, setShowProfile] = useState(false)
  const [showOrder, setShowOrder] = useState(false);
  const [isCategorieOpen, setIsCategorieOpen] = useState(false);
  const [showCart, setShowCart] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [pageTitle, setPageTitle] = useState("SHOPPING CART");
  const [modalEmail, setModalEmail] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [checkoutSum, setCheckoutSum] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  // let checkoutSum = 0

  // localStorage.setItem('currentOrderId', "");
  useEffect(() => {
    const currentOrderId = window.localStorage.getItem('currentOrderId');
    if (!currentOrderId) {
      fetchOrder()
    }
    if (filterName == "") {
      setFilterName("all")
    }
  }, [])

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    const currentOrderId = window.localStorage.getItem('currentOrderId');
    const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');
    setCurrentOrderId(currentOrderId)
    // If not currentOrderId then fetch throught myOrders to grab the id and if none then just dont do nothing
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
      getProducts();
      fetchFavorites();
      fetchOrders();
      getCartTest()
      console.log(checkoutSum)
    } else {
      fetchGuestProducts()
    }
  }, [token]);

  useEffect(() => {
    if (filterName) {
      setActiveCategory(filterName)
    }

  }, [filterName])

  const getProducts = async () => {
    try {
      if (isLoggedIn) {
        const response = await fetch(`${API_URL}products/all`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result) {
          setProducts(result);
        }
        return result;
      } else {
        const response = await fetch(`${API_URL}products`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (result) {
          setProducts(result);
        }
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCartTest = async () => {
    try {
      const localToken = window.localStorage.getItem('token');

      const response = await fetch(`${API_URL}order/cart`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localToken}`,
        },
      })
      const items = await response.json();
      setCartItems(items)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGuestProducts = async () => {
    const localToken = window.localStorage.getItem('token');
    if (!localToken) {
      const response = await fetch(`${API_URL}products`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result) {
        setProducts(result);
      }
      return result;
    }
  }


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
      setFinalizedOrders(data)
    }
  }

  const fetchOrder = async () => {
    if (token) {
      const response = await fetch(`${API_URL}order/myOrders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      const orderId = data[0].id
      localStorage.setItem('currentOrderId', orderId);
    }
  }

  return (
    <>
      <BrowserRouter>
        {!hideNav &&
          <div className='marginReducer'>
            <Header API_URL={API_URL} setHideNav={setHideNav} hideNav={hideNav} setIsLoggedIn={setIsLoggedIn} setFilterName={setFilterName} filterName={filterName} token={token} setFavorites={setFavorites} showProfile={showProfile} setShowProfile={setShowProfile} setShowFavorite={setShowFavorite} setShowOrder={setShowOrder} setPageTitle={setPageTitle} setShowCart={setShowCart} setCurrentPage={setCurrentPage} currentPage={currentPage} setFinalizedOrders={setFinalizedOrders} noResult={noResult} setIsCategorieOpen={setIsCategorieOpen} isCategorieOpen={isCategorieOpen} />
          </div>
        }

        <Routes>
          <Route
            path='/'
            element={<Hero API_URL={API_URL} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setFilterName={setFilterName} setShowProfile={setShowProfile} setIsCategorieOpen={setIsCategorieOpen} />}
          />
          <Route
            path='/paymentSuccess'
            element={<Success API_URL={API_URL} token={token} currentOrderId={currentOrderId} setCurrentOrderId={setCurrentOrderId} setCartItems={setCartItems} checkoutSum={checkoutSum} />}
          />

          <Route
            path='/register'
            element={<Register API_URL={API_URL} setHideNav={setHideNav} />}
          />
          <Route
            path='/login'
            element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} setUser={setUser} setToken={setToken} user={user} token={token} setHideNav={setHideNav} modalEmail={modalEmail} />}
          />
          <Route
            path='/cart'
            element={<Cart API_URL={API_URL} token={token} setCurrentOrderId={setCurrentOrderId} currentOrderId={currentOrderId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setQuantity={setQuantity} quantity={quantity} setFilterName={setFilterName} setShowProfile={setShowProfile} favorites={favorites} finializedOrders={finializedOrders} showOrder={showOrder} setShowOrder={setShowOrder} showFavorite={showFavorite} setShowFavorite={setShowFavorite} pageTitle={pageTitle} setPageTitle={setPageTitle} setShowCart={setShowCart} showCart={showCart} cartItems={cartItems} setCartItems={setCartItems} setCheckoutSum={setCheckoutSum} checkoutSum={checkoutSum} />}
          />
          <Route
            path='/products'
            element={<Products API_URL={API_URL} user={user} token={token} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} filterName={filterName} setFilterName={setFilterName} setShowProfile={setShowProfile} setModalEmail={setModalEmail} modalEmail={modalEmail} products={products} setCurrentPage={setCurrentPage} currentPage={currentPage} setProducts={setProducts} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setNoResult={setNoResult} noResult={noResult} />}
          />
          <Route
            path='/offers'
            element={<Offers setShowProfile={setShowProfile} setFilterName={setFilterName} setActiveCategory={setActiveCategory} />}
          />
          <Route path="/products/:id"
            element={<ProductDetails API_URL={API_URL} user={user} token={token} currentOrderId={currentOrderId} setCurrentOrderId={setCurrentOrderId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setQuantity={setQuantity} quantity={quantity} setShowProfile={setShowProfile} setModalEmail={setModalEmail} modalEmail={modalEmail} setProducts={setProducts} setCartItems={setCartItems} />}
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
