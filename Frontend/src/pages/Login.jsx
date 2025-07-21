import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducer/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    if (!email) newErrors.email = true;
    if (!password) newErrors.password = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const matchedUser = storedUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        // Simulate API call delay
        setTimeout(() => {
          dispatch(login(matchedUser));
          localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
          setShowSuccess(true);
          
          // Navigate after showing success animation
          setTimeout(() => navigate("/"), 1800);
        }, 800);
      } else {
        setIsSubmitting(false);
        // Add shake animation for invalid credentials
        if (formRef.current) {
          formRef.current.classList.add('animate-shake');
          setTimeout(() => {
            if (formRef.current) formRef.current.classList.remove('animate-shake');
          }, 500);
        }
        alert("Invalid email or password");
      }
    } else {
      setIsSubmitting(false);
    }
  };

  // Particle effect for background
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 10 + 5;
      const posX = Math.random() * window.innerWidth;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      const hue = Math.random() * 60 + 20; // Warm colors
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        background: hsla(${hue}, 80%, 60%, ${Math.random() * 0.3 + 0.1});
      `;
      
      document.querySelector('.particles-container').appendChild(particle);
      
      // Remove particle after animation completes
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    };
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }
    
    // Add particles periodically
    const particleInterval = setInterval(createParticle, 800);
    
    return () => clearInterval(particleInterval);
  }, []);

  return (
   <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="particles-container absolute inset-0 overflow-hidden"></div>
      
      {/* Floating decorative elements - Adjusted for mobile */}
      <div className="absolute top-20 left-5 w-16 h-16 sm:top-10 sm:left-1/4 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 blur-xl animate-float-1"></div>
      <div className="absolute bottom-20 right-5 w-20 h-20 sm:bottom-20 sm:right-1/4 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 blur-xl animate-float-2"></div>
      <div className="absolute top-1/3 right-5 w-12 h-12 sm:top-1/3 sm:right-20 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-200/30 to-orange-300/30 blur-xl animate-float-3"></div>
      
      {/* Success animation overlay - Made responsive */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fadeIn">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center animate-scaleIn">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping-slow opacity-30"></div>
          </div>
        </div>
      )}
      
      {/* Form Container - Made responsive */}
      <div 
        ref={formRef}
        className="relative bg-white/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-xl md:w-[40%] lg:w-[35vw] xl:w-[45vw] border border-white/20 z-10 transition-all duration-500"
      >
        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden z-0">
          <div className="absolute inset-0 border-2 border-transparent animate-border-pulse"></div>
        </div>
        
        {/* Logo animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-4 shadow-lg animate-bounce-in">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600 bg-clip-text text-transparent mb-2 animate-fade-in-up">
            Welcome Back
          </h2>
          <p className="text-gray-600 animate-fade-in-up delay-100">Sign in to your account</p>
        </div>

        <form onSubmit={loginHandler} className="space-y-6 animate-fade-in-up delay-200">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake' 
                    : 'border-gray-200 focus:border-amber-400 focus:ring-amber-100'
                } focus:outline-none focus:ring-4 placeholder-gray-400`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center animate-fade-in">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Email is required
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                  errors.password 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake' 
                    : 'border-gray-200 focus:border-amber-400 focus:ring-amber-100'
                } focus:outline-none focus:ring-4 placeholder-gray-400`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center animate-fade-in">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Password is required
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative cursor-pointer py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-200 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 hover:from-amber-600 hover:via-orange-600 hover:to-emerald-600 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </form>

        <div className="mt-8 text-center animate-fade-in-up delay-300">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <NavLink 
              to="/Register" 
              className="text-amber-600 hover:text-emerald-600 font-semibold transition-all duration-300 relative inline-block group"
            >
              Register here
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </p>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-br from-emerald-400 to-amber-400 rounded-full opacity-60 animate-pulse-slow"></div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes border-pulse {
          0% { border-color: rgba(251, 191, 36, 0); }
          50% { border-color: rgba(251, 191, 36, 0.5); }
          100% { border-color: rgba(251, 191, 36, 0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 1; }
          80%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 7s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 5s ease-in-out infinite;
        }
        .animate-border-pulse {
          animation: border-pulse 3s ease-in-out infinite;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-up.delay-100 {
          animation-delay: 0.1s;
        }
        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fade-in-up.delay-300 {
          animation-delay: 0.3s;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Particle animation */
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: particle-fall linear infinite;
        }
        
        @keyframes particle-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0.1;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;