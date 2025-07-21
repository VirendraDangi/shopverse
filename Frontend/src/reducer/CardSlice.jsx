import { createSlice } from "@reduxjs/toolkit";
import Products from "../pages/Products";


const CardSlice = createSlice({
   name : "card" ,
   
   initialState:{
    products : [] ,
   },


   reducers: {
    loadcard : (state,action) =>{
          state.products = action.payload;
    },
   },
})

export const {loadcard} = CardSlice.actions ;
export default CardSlice.reducer ;
