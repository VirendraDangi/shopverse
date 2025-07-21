import axios from '../../api/Axiosconfig'
import { loadproduct } from '../../reducer/ProductSlice';


  export const Asyncloadproduct = ()=>async(dispatch,getState)=>{
      try { 
      const {data} = await axios.get("/products")
      dispatch(loadproduct(data))
    } catch (error) {
      console.log(error);
    }
  }
  