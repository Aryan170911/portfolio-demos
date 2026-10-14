import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Chatbot from './pages/Chatbot'
import Clinic from './pages/Clinic'
import Restaurant from './pages/Restaurant'
createRoot(document.getElementById('root')).render(<HashRouter><Layout><Routes>
<Route path="/" element={<Home/>}/><Route path="/chatbot-demo" element={<Chatbot/>}/><Route path="/clinic" element={<Clinic/>}/><Route path="/restaurant" element={<Restaurant/>}/>
</Routes></Layout></HashRouter>)
