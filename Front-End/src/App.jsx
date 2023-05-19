import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Hero from './components/Hero/Hero'
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';

function App() {

  const API_URL = "https://digitaldepot-ger8.onrender.com/api/";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Hero />}
          />
          <Route
            path='/products'
            element={<Products API_URL={API_URL} />}
          />
          <Route path="/product/:id"
            element={<ProductDetails API_URL={API_URL} />}
          />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
