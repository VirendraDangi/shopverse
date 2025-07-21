import { configureStore } from '@reduxjs/toolkit'
 import ProductSlice from '../reducer/ProductSlice'
  import CardSlice from '../reducer/CardSlice'
  import UserSlice from "../reducer/UserSlice"
  import authReducer from '../reducer/authSlice';
 
export const store = configureStore({
  reducer: {
    productReducer : ProductSlice ,
     cardReducer :  CardSlice ,
      userReducer :  UserSlice ,
       auth: authReducer,
  },
})