import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ListPage from './pages/ListPage'
import DetailRecord from './pages/DetailRecord'
import Comparator from './pages/Comparator'
import FavouriteProducts from './pages/FavouriteProducts'
import NotFound from './pages/NotFound'

import Navbar from './components/Navbar'

import { FavoriteProvider } from './context/FavoriteContext';

function App() {

  return (
    <FavoriteProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/gpu/:id" element={<DetailRecord />} />
          <Route path="/compare" element={<Comparator />} />
          <Route path="/favourites" element={<FavouriteProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </FavoriteProvider>

  )
}

export default App
