import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import Register from './Auth/Register';
import Home from './Pages/Home';
import Login from './Auth/Login';

function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
