// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { products } = useSelector((state) => state.productReducer);

//   if (!products || products.length === 0) {
//     return <div className="p-8 text-center text-gray-600 text-lg">⏳ Loading product details...</div>;
//   }

//   const product = products.find(p => String(p.id) === String(id));

//   if (!product) {
//     return <div className="p-8 text-center text-red-500 text-lg">❌ Product not found for ID: {id}</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6 md:p-10">
//       <div className="grid md:grid-cols-2 gap-8 bg-white shadow-xl rounded-3xl overflow-hidden">
//         <div className="bg-gray-100 p-6 flex items-center justify-center">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="h-[400px] object-contain transition-transform duration-300 hover:scale-105"
//           />
//         </div>

//         <div className="p-6 flex flex-col justify-between">
//           <div>
//             <span className="inline-block px-3 py-1 mb-3 text-sm rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-sm">
//               {product.category}
//             </span>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
//             <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
//             <div className="flex items-center gap-4 mt-4">
//               <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
//               <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md">
//                 ⭐ {product.rating?.rate ?? "4.5"} ({product.rating?.count ?? "100+"} reviews)
//               </span>
//             </div>
//           </div>

//           <button className="mt-8 bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg">
//             🛒 Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import { useState } from "react";
import { Heart, Share2, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AsyncPostCart } from "../store/action/CardAction";

const ProductDetail = () => {
    const { id } = useParams();
  const { products } = useSelector((state) => state.productReducer);
 
   const product = products.find(p => String(p.id) === String(id));

     const dispatch = useDispatch()
      const navigate = useNavigate();
       
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);


    const cardhandler = (product) => {
       dispatch(AsyncPostCart(product));
    //    toast.success("Added to cart!");
       navigate("/Card");
     };
    
  // Mock additional images for demo
  const productImages = [product.image, product.image2, product.image];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with breadcrumb */}
        <div className="mb-8">
          <nav className="text-amber-600 mb-4">
            <span className="hover:text-amber-700 cursor-pointer transition-colors font-medium">Home</span>
            <span className="mx-2 text-amber-400">/</span>
            <span className="hover:text-amber-700 cursor-pointer transition-colors font-medium">{product.category}</span>
            <span className="mx-2 text-amber-400">/</span>
            <span className="text-amber-800 font-semibold">{product.title.slice(0, 30)}...</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-amber-200/50 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-white to-amber-50/50 rounded-2xl p-6 relative overflow-hidden">
                  <img
                  src={productImages[selectedImage]}
                    // src={productImages[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Image indicators */}
                {/* <div className="flex justify-center mt-6 gap-3">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-xl border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-amber-400 bg-amber-100/50' 
                          : 'border-amber-300/50 bg-white/60 hover:bg-amber-50/50'
                      }`}
                    >
                      <img src={product.image} alt="" className="w-full h-full object-cover rounded-lg" />
                    </button>
                  ))}
                </div> */}
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-amber-200/50 shadow-2xl">
              {/* Category & Actions */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium shadow-lg font-helvetica">
                  ✨ {product.category}
                </span>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isLiked 
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                        : 'bg-amber-100/80 text-amber-600 hover:bg-amber-200/80'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full bg-amber-100/80 text-amber-600 hover:bg-amber-200/80 transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent mb-4 leading-tight font-helvetica">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating?.rate || 4.5) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                    />
                  ))}
                  <span className="text-yellow-400 font-medium ml-2">{product.rating?.rate || "4.5"}</span>
                </div>
                <span className="text-amber-600">({product.rating?.count || "100+"} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-helvetica">
                    ${product.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                  <span className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-full animate-pulse font-semibold">
                    20% OFF
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <Shield className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-emerald-700 font-semibold">Secure</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <Truck className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-amber-700 font-semibold">Fast Ship</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <RotateCcw className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-orange-700 font-semibold">Returns</p>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-800 font-medium font-helvetica">Quantity:</span>
                  <div className="flex items-center bg-amber-100/60 rounded-xl border border-amber-200">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-amber-700 hover:bg-amber-200/60 transition-colors rounded-l-xl font-semibold"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 text-amber-800 border-x border-amber-200 font-semibold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-amber-700 hover:bg-amber-200/60 transition-colors rounded-r-xl font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="py-4 px-6 bg-amber-100/80 text-amber-700 border border-amber-300 rounded-xl font-semibold hover:bg-amber-200/80 transition-all duration-300 backdrop-blur-sm font-helvetica">
                    Add to Wishlist
                  </button>
                  <button 
                       onClick={() => cardhandler(product)}
                  className="py-4 cursor-pointer px-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transform font-helvetica">
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-100/80 to-green-100/80 backdrop-blur-lg rounded-2xl p-6 border border-emerald-200/50 shadow-lg">
                <h3 className="text-emerald-700 font-semibold mb-2 font-helvetica">Free Shipping</h3>
                <p className="text-emerald-600 text-sm">On orders over $50</p>
              </div>
              <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 backdrop-blur-lg rounded-2xl p-6 border border-amber-200/50 shadow-lg">
                <h3 className="text-amber-700 font-semibold mb-2 font-helvetica">24/7 Support</h3>
                <p className="text-amber-600 text-sm">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;