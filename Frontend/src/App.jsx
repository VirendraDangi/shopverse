import React, { useEffect } from 'react'
import Navbar from './component/Navbar'
import MainRoute from './routes/MainRoute'
import { useDispatch } from 'react-redux'
import { Asyncloadproduct } from './store/action/Product.action'
import { Asyncloadcard } from './store/action/CardAction'


const App = () => {
const dispatch = useDispatch() 

    useEffect(() => {
    dispatch(Asyncloadproduct())
     dispatch(Asyncloadcard())
  }, [])
  return (
    <div className='font-helvetica text-3xl'>
      <Navbar/>
     <MainRoute/>
    </div>
  )
}

export default App