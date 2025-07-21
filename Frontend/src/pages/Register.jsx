import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { AsyncRegisterUser } from '../store/action/UserAction';
import { useDispatch } from 'react-redux';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const submitHandler = (user) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const userId = nanoid();
      const newUser = { ...user, id: userId };

      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

      dispatch(AsyncRegisterUser(newUser)); // optional if no backend
      
      setShowSuccess(true);
      setTimeout(() => navigate("/login"), 1800);
    }, 800);
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
      // Green and orange particles
      const hue = Math.random() > 0.5 ? 
        Math.random() * 30 + 70 :   // Greens: 70-100
        Math.random() * 30 + 25;    // Oranges: 25-55
      
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
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="particles-container absolute inset-0 overflow-hidden"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-300/30 to-emerald-500/30 blur-xl animate-float-1"></div>
      <div className="absolute bottom-20 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-orange-300/30 to-orange-500/30 blur-xl animate-float-2"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-200/30 to-emerald-400/30 blur-xl animate-float-3"></div>
      
      {/* Success animation overlay */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fadeIn">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center animate-scaleIn">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping-slow opacity-30"></div>
          </div>
        </div>
      )}
      
      {/* Form Container */}
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl mb-4 shadow-lg animate-bounce-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2 animate-fade-in-up">
            Create Account
          </h2>
          <p className="text-gray-600 animate-fade-in-up delay-100">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 animate-fade-in-up delay-200">
          <div className="space-y-1">
            <div className="relative">
              <input
                type="text"
                id="username"
                autoComplete="username"
                {...register("username", { required: true })}
                placeholder="Enter your username"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                  errors.username 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake' 
                    : 'border-gray-200 focus:border-emerald-400 focus:ring-emerald-100'
                } focus:outline-none focus:ring-4 placeholder-gray-400`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-2 flex items-center animate-fade-in">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Username is required
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake' 
                    : 'border-gray-200 focus:border-emerald-400 focus:ring-emerald-100'
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
            <div className="relative">
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", { required: true })}
                placeholder="Create a password"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                  errors.password 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake' 
                    : 'border-gray-200 focus:border-emerald-400 focus:ring-emerald-100'
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
            className="w-full cursor-pointer relative py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-200 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  Register Now
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
            Already have an account?{" "}
            <NavLink 
              to="/login" 
              className="text-emerald-600 hover:text-emerald-800 font-semibold transition-all duration-300 relative inline-block group"
            >
              Login here
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </p>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full opacity-60 animate-pulse-slow"></div>
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
          0% { border-color: rgba(16, 185, 129, 0); }
          50% { border-color: rgba(16, 185, 129, 0.5); }
          100% { border-color: rgba(16, 185, 129, 0); }
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

export default Register;