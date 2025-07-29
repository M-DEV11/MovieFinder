import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import AboutMovie from './pages/AboutMovie.jsx'
import Watchlist from './pages/Watchlist.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/about/:id" element={<AboutMovie />} />
    </Routes>
  )
}

export default App
