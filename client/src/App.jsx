import { useState } from 'react'
import { Route, Routes } from "react-router-dom"


import './App.css'
import SearchBar from './components/searchBar/SearchBar'
import Home from './views/home/Home'
import Detail from './views/detail/Detail'
import Create from './views/create/Create'
import Landing from "./views/landing/Landing"
import Footer from './components/footer/Footer'

function App() {


  return (
    <>
    <SearchBar />
      <Routes>
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/create" element={<Create></Create>}></Route>
        <Route path={`/detail/:id`} element={<Detail />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
