import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Asynccarddelete, Asyncloadcard } from '../store/action/CardAction'
import { RiDeleteBin6Line } from "react-icons/ri"
import { toast } from 'react-toastify'
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'

const Card = () => {
    const navigate = useNavigate()
  const products = useSelector((state) => state.cardReducer.products)
  const [quantities, setQuantities] = useState({})
  const shoppinghandler = ()=>{
    console.log("clicked");
    
     navigate("/products")
  }
  
  const dispatch = useDispatch()

  useEffect(()=>{
     dispatch(Asyncloadcard());
  },[ ])

  // Initialize quantities when products load
  useEffect(() => {
    if (products && products.length > 0) {
      const initialQuantities = {}
      products.forEach(product => {
        initialQuantities[product.id] = 1
      })
      setQuantities(initialQuantities)
    }
  }, [products])

  const carddelete = async (id) => {
    console.log("Attempting to delete item with ID:", id);
    if (!id) {
      console.error("Invalid ID:", id);
      toast.error("Error: Invalid item ID");
      return;
    }

    try {
      // Remove from quantities state
      setQuantities(prev => {
        const newQuantities = { ...prev }
        delete newQuantities[id]
        return newQuantities
      })
      
      // Dispatch delete action
      await dispatch(Asynccarddelete(id));
      toast.error("Item removed from cart");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [id]: newQuantity
    }))
  }
  
  if(products.length === 0){
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2 font-helvetica">Loading your cart...</h3>
          <p className="text-gray-500">Please wait while we fetch your items</p>
        </div>
      </div>
    )
  }

  const calculateTotal = () => {
    if (!products || products.length === 0) return "0.00";
    return products.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      return total + (parseFloat(item.price) * quantity);
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    if (!products || products.length === 0) return 0;
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <div className="min-h-screen  bg-amber-50 py-20 px-4 ">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl space-x-5 font-black font-helvetica tracking-tight mb-6">
            <span className="bg-gradient-to-r  from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
              Your
            </span>
          
            <span className="bg-gradient-to-r absolute top-[14%] from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-4xl">
              <BsCart4 />
            </span>
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Review your selected items and proceed to checkout when ready
          </p>
          
          {/* Decorative Line */}
          <div className="mt-8 flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="mx-4 w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {products?.length === 0 ? (
          <div className="text-center py-32">
            <div className="max-w-lg mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-16 h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4 font-helvetica">Your Cart is Empty</h3>
              <p className="text-gray-500 text-lg mb-8">Looks like you haven't added anything to your cart yet. Start shopping now!</p>
              <button
              onClick={()=>shoppinghandler()}
               className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg font-helvetica tracking-wide">
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {products && products?.length > 0 && products?.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 border border-amber-100/50 overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Decorative Background Elements */}
                  {/* <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></div> */}
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full opacity-60 group-hover:opacity-80 transition-all duration-500"></div>

                  <div className="flex flex-col md:flex-row p-6">
                    {/* Image Container */}
                    <div className="relative mb-4 md:mb-0 md:mr-6">
                      <div className="w-full md:w-40 h-40 bg-gradient-to-br from-gray-50 to-amber-50/50 rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute -top-2 -left-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full shadow-lg capitalize tracking-wide">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300 font-helvetica">
                          {item.title}
                        </h2>
                        
                        {/* Features */}
                        <div className="flex flex-wrap items-center space-x-4 mb-4">
                          <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">✓ Free Shipping</span>
                          <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-1 rounded-full">✓ 30-Day Returns</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline space-x-2 mb-4">
                          <span className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-helvetica">
                            ${(item.price * (quantities[item.id] || 1)).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${((item.price * (quantities[item.id] || 1)) * 1.3).toFixed(2)}
                          </span>
                          {quantities[item.id] > 1 && (
                            <span className="text-sm text-gray-600">
                              (${item.price} each)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                          <div className="flex items-center border-2 border-amber-300 rounded-lg bg-white shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) - 1)}
                              disabled={(quantities[item.id] || 1) <= 1}
                              className={`px-3 py-2 text-amber-600 hover:bg-amber-50 transition-colors duration-200 font-bold text-lg ${
                                (quantities[item.id] || 1) <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-amber-700'
                              }`}
                            >
                              −
                            </button>
                            <span className="px-4 py-2 text-gray-800 font-semibold border-x-2 border-amber-300 bg-amber-50 min-w-[50px] text-center">
                              {quantities[item.id] || 1}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) + 1)}
                              className="px-3 py-2 text-amber-600 hover:bg-amber-50 transition-colors duration-200 font-bold text-lg hover:text-amber-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div className="flex items-start justify-end mt-4 md:mt-0">
                      <button
                        onClick={() => carddelete(item.id)}
                        className="group/delete p-3 bg-red-50 hover:bg-red-100 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg border border-red-200 hover:border-red-300"
                        title="Remove from cart"
                      >
                        
                     <div className='p-3'>
                           <RiDeleteBin6Line className=" text-red-500 text-xl  group-hover/delete:text-red-600 transition-colors duration-200" />
                     </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-100/50 p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 font-helvetica">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-amber-100">
                      <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                      <span className="font-semibold text-gray-800">${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-amber-100">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-emerald-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-amber-100">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span className="font-semibold text-gray-800">${(calculateTotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-amber-200">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        ${(parseFloat(calculateTotal()) + parseFloat(calculateTotal()) * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-helvetica tracking-wide mb-4">
                    Proceed to Checkout
                  </button>

                  <button 
                   onClick={()=>shoppinghandler()}
                  className="w-full border-2 cursor-pointer border-amber-300 hover:border-amber-500 text-amber-700 hover:text-amber-800 font-bold py-3 px-6 rounded-2xl transition-all duration-300 hover:bg-amber-50 font-helvetica tracking-wide">
                    Continue Shopping
                  </button>

                  {/* Security Badges */}
                  <div className="mt-6 pt-6 border-t border-amber-100">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Checkout</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>SSL Protected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card