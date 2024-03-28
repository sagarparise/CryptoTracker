
import './App.css'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import ErrorP from './components/404Error'
import Compare from './components/Compare/Compare'
import Dashboard from './components/Dashboard/Dashboard'
import Watchlist from './components/Watchlist/Watchlist'
import CoinPage from './components/CoinPage/CoinPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
function App() {


  return (
    <>   
      <ToastContainer />  
     <BrowserRouter>
   
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
           <Route path='/dashboard' element={<Dashboard />} />
           <Route path='/compare' element={<Compare />} />
           <Route path='/watchlist' element={<Watchlist />} />
           <Route path='/coin/:id' element={<CoinPage />} />
          <Route path='*' element={<ErrorP />} />
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
