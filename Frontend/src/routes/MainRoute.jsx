import React from 'react'
import Home from '../pages/Home'
import About from '../pages/About'
import Products from '../pages/Products'
import { Route, Routes } from 'react-router-dom'
import Card from '../pages/Card'
import ProductDetail from '../pages/ProductDetail'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProtectedRoute from '../component/ProtectedRoute';
// import { AuthProvider } from '../context/AuthContext'; // If you have it



const MainRoute = () => {
  return (
           <div>
      
          <Routes>
            <Route path='/' element={<ProtectedRoute> <Home/> </ProtectedRoute> }/>
             <Route path='/About' element={  <ProtectedRoute><About/></ProtectedRoute> }/>
              <Route path='/Products' element={ <ProtectedRoute> <Products/> </ProtectedRoute> }/>
               <Route path='/Card' element={<ProtectedRoute><Card/></ProtectedRoute>}/>
               <Route path = "/Product/detail/:id" element = {<ProtectedRoute><ProductDetail/></ProtectedRoute>} />
                 <Route path = "/login" element = {<Login/>} />
                  <Route path = "/Register" element = {<Register/>} />
        </Routes>


    </div>
   
  )
}

export default MainRoute