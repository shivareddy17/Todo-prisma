import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Dashboard from './pages/Dashboard'
import Sinup from './pages/Sinup'
import Sinin from './pages/Signin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="">
        <BrowserRouter>
        <Routes>
          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path='/Signin' element={<Sinin/>} />
          <Route path='/Signup' element={<Sinup/>} />


        </Routes>
        </BrowserRouter>
    {/* <Dashboard/>
    <div className='p-2'>
    <Sinup/>
    <br />
    <Sinin/>
    </div> */}
      </div>
    </>
  )
}

export default App
