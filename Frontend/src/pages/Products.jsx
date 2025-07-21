import { Asyncloadproduct } from '../store/action/Product.action';
import { AsyncPostCart } from '../store/action/CardAction';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Lenis from '@studio-freight/lenis';

const Products = () => {
  
 const handlecol = ()=>{
   toast.info("it will available soon")
 }


const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(Asyncloadproduct());
  }, [dispatch]);

  const cardhandler = (product) => {
    dispatch(AsyncPostCart(product));
    toast.success("Added to cart!");
    navigate("/Card");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('☆');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16 px-4">
      {/* Hero Header */}
      <div className="text-center mb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black font-helvetica tracking-tight mb-6">
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
              Premium
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Discover our curated selection of exceptional footwear, crafted for those who appreciate quality, comfort, and timeless style
          </p>
          
          {/* Decorative Line */}
          <div className="mt-8 flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="mx-4 w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 ease-out hover:-translate-y-4 border border-amber-100/50 overflow-hidden transform hover:rotate-1"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Decorative Background Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-br from-emerald-200/40 to-green-200/40 rounded-full opacity-60 group-hover:opacity-80 transition-all duration-500"></div>

                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-50 to-amber-50/50 p-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out rounded-xl shadow-lg"
                  />
                  
                  {/* Floating Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full shadow-lg capitalize tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-6 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-1.5 flex items-center space-x-2 shadow-lg border border-amber-100">
                      <span className="text-amber-500 text-sm font-medium">{renderStars(product.rating.rate)}</span>
                      <span className="text-xs text-gray-600 font-semibold">({product.rating.count})</span>
                    </div>
                  </div>

                  {/* Wishlist Heart */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors duration-300">
                      <svg className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300 font-helvetica">
                    {product.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price Section */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-helvetica">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${(product.price * 1.3).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-emerald-600 font-semibold">✓ Free Shipping</span>
                      <span className="text-xs text-amber-600 font-semibold">✓ 30-Day Returns</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => cardhandler(product)}
                      className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-helvetica tracking-wide"
                    >
                      Add to Cart
                    </button>
                    <Link 
                      to={`/Product/detail/${product.id}`}
                      className="w-full block text-center px-6 py-3 border-2 border-amber-300 hover:border-amber-500 text-amber-700 hover:text-amber-800 rounded-2xl transition-all duration-300 hover:bg-amber-50 font-semibold font-helvetica tracking-wide"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Premium Badge */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                    PREMIUM QUALITY
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-32">
              <div className="max-w-lg mx-auto">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <svg className="w-16 h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-700 mb-4 font-helvetica">No Products Available</h3>
                <p className="text-gray-500 text-lg">Our amazing collection is being updated. Check back soon for exciting new arrivals!</p>
                
                {/* Decorative Elements */}
                <div className="mt-8 flex justify-center space-x-4">
                  <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-24 text-center">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-12 max-w-4xl mx-auto border border-amber-200/50 shadow-xl">
          <h2 className="text-4xl font-black text-gray-800 mb-4 font-helvetica">
            Step Into <span className="text-emerald-600">Excellence</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their footwear needs. Quality, comfort, and style guaranteed.
          </p>
          <button
          onClick={()=>handlecol}
           className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg font-helvetica tracking-wide">
            Explore All Collections
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;