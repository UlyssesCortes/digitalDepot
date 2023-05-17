import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Hero from './components/Hero/Hero'
import Products from './components/Products/Products';
function App() {
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
            element={<Products />}
          />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
