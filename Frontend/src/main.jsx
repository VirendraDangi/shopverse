import React from 'react' 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/Store.jsx'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render( 
<Provider store={store}>
<BrowserRouter>
  <App />
   <ToastContainer position='top-right'/>
</BrowserRouter>    
</Provider>
)
