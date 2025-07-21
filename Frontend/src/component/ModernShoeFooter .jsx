
import React, { useState, useEffect } from 'react';

const ModernShoeFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 2000);
    }
  };

  const handleLinkClick = (linkText) => {
    console.log('Navigating to:', linkText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-blue-600 flex flex-col justify-end">
      {/* Demo Content */}
      <div className="text-center text-white py-20">
        <h1 className="text-5xl font-black mb-5">StepForward</h1>
        <p className="text-xl opacity-80">Premium footwear for the modern lifestyle</p>
      </div>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='shoe-pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'><circle cx='10' cy='10' r='1' fill='white'/></pattern></defs><rect width='100%' height='100%' fill='url(%23shoe-pattern)'/></svg>")`
          }} />
        </div>

        {/* Animated Wave */}
        <div 
          className="absolute -top-24 left-0 w-full h-24 animate-pulse"
          style={{
            background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
            backgroundSize: '400% 400%',
            animation: 'waveGradient 8s ease-in-out infinite',
            clipPath: 'polygon(0 50%, 100% 80%, 100% 100%, 0% 100%)'
          }}
        />

        {/* Floating Shoe */}
        <div 
          className="absolute right-12 top-12 text-6xl opacity-10 hidden lg:block"
          style={{
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`,
            animation: 'float 6s ease-in-out infinite'
          }}
        >
          👟
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 pt-20 pb-10">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-12 lg:gap-15 mb-15">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div 
                className="text-4xl font-black mb-5 cursor-pointer transition-transform duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                StepForward
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Elevating your style with premium footwear designed for comfort, performance, and urban sophistication. Every step matters.
              </p>
              
              <div className="flex gap-5">
                {['📘', '📷', '🐦', '📺'].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-xl bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-10 flex items-center justify-center text-white transition-all duration-300 hover:bg-red-400 hover:bg-opacity-20 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-400/30"
                    onClick={(e) => e.preventDefault()}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 relative">
                Shop
                <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gradient-to-r from-red-400 to-cyan-400 rounded" />
              </h3>
              <ul className="space-y-4">
                {['Men\'s Shoes', 'Women\'s Shoes', 'Kids Collection', 'Athletic Wear', 'Limited Edition', 'Sale Items'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 relative group"
                      onClick={(e) => { e.preventDefault(); handleLinkClick(item); }}
                    >
                      <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 relative">
                Support
                <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gradient-to-r from-red-400 to-cyan-400 rounded" />
              </h3>
              <ul className="space-y-4">
                {['Size Guide', 'Care Instructions', 'Returns & Exchanges', 'Shipping Info', 'Contact Us', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 relative group"
                      onClick={(e) => { e.preventDefault(); handleLinkClick(item); }}
                    >
                      <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-1 md:col-span-3">
              <div className="bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 relative">
                  Stay Updated
                  <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gradient-to-r from-red-400 to-cyan-400 rounded" />
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Get the latest drops, exclusive offers, and style inspiration delivered to your inbox.
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border-none text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-opacity-15 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-400/40 relative overflow-hidden ${
                      isSubscribed 
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-500' 
                        : 'bg-gradient-to-r from-red-400 to-cyan-400'
                    }`}
                  >
                    <span className="relative z-10">
                      {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -translate-x-full hover:translate-x-full transition-transform duration-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8 mb-15">
            <div className="lg:max-w-xs">
              <h3 className="text-xl font-bold mb-6 relative">
                Company
                <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gradient-to-r from-red-400 to-cyan-400 rounded" />
              </h3>
              <ul className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                {['About Us', 'Sustainability', 'Careers', 'Press', 'Store Locator', 'Affiliate Program'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 relative group"
                      onClick={(e) => { e.preventDefault(); handleLinkClick(item); }}
                    >
                      <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white border-opacity-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">
            <p className="text-slate-300 text-center md:text-left">
              © 2025 StepForward. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            <div className="flex gap-4">
              {['VISA', 'MC', 'AMEX', 'PP'].map((payment) => (
                <div
                  key={payment}
                  className="w-11 h-8 bg-white bg-opacity-90 rounded-lg flex items-center justify-center text-gray-800 font-semibold text-xs transition-transform duration-300 hover:scale-110"
                >
                  {payment}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes waveGradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>
      </footer>
    </div>
  );
};

export default ModernShoeFooter;