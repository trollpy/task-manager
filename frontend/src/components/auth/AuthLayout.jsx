// AuthLayout.jsx - Shared layout component for smooth transitions
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentForm, setCurrentForm] = useState('login');

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setCurrentForm(location.pathname === '/register' ? 'register' : 'login');
      setIsVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isRegister = currentForm === 'register';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with Unsplash Images */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            !isRegister ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80')`
          }}
        />
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            isRegister ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        />
      </div>

      {/* Animated Overlay Patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className={`absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)] bg-[length:60px_60px] transition-opacity duration-1000 ${
          !isRegister ? 'opacity-100' : 'opacity-30'
        }`}></div>
        <div className={`absolute inset-0 bg-[linear-gradient(-45deg,transparent_25%,rgba(168,85,247,0.05)_50%,transparent_75%)] bg-[length:60px_60px] transition-opacity duration-1000 ${
          isRegister ? 'opacity-100' : 'opacity-30'
        }`}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${
              !isRegister ? 'bg-blue-400/60' : 'bg-purple-400/60'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content with Smooth Transitions */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center p-6 transition-all duration-500 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {children}
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-10 left-10 w-32 h-32 bg-gradient-to-br transition-all duration-1000 ${
        !isRegister ? 'from-blue-500/10 to-cyan-500/10' : 'from-purple-500/10 to-pink-500/10'
      } rounded-full blur-2xl animate-pulse`}></div>
      <div className={`absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br transition-all duration-1000 ${
        !isRegister ? 'from-indigo-500/10 to-blue-500/10' : 'from-indigo-500/10 to-purple-500/10'
      } rounded-full blur-2xl animate-pulse delay-1000`}></div>
    </div>
  );
};

export default AuthLayout;