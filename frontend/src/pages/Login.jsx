// Login.jsx - With smooth animations and beautiful background
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-6xl flex">
        {/* Left Side - Welcome Message */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-lg text-center">
            {/* Animated Logo */}
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 animate-ping"></div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in-up">
              Welcome Back to
            </h1>
            <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6 animate-fade-in-up animation-delay-200">
              SmartTasker
            </h2>
            <p className="text-xl text-blue-100 mb-8 animate-fade-in-up animation-delay-400">
              Your intelligent workspace awaits. Continue your productivity journey with AI-powered task management.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4 text-left animate-fade-in-up animation-delay-600">
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Smart prioritization with AI insights</span>
              </div>
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex-shrink-0 w-2 h-2 bg-cyan-400 rounded-full animate-pulse animation-delay-200"></div>
                <span>Real-time team collaboration</span>
              </div>
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-400"></div>
                <span>Advanced productivity analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className="relative group">
              {/* Animated Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
              
              {/* Main Card */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4 lg:hidden shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                  <p className="text-blue-100">Sign in to your workspace</p>
                </div>

                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

                {/* Status Indicators */}
                <div className="flex justify-center space-x-6 mt-6 mb-6">
                  <div className="flex items-center space-x-2 text-xs text-blue-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>SECURE</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-blue-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>ENCRYPTED</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-blue-300">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>AI-POWERED</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/10 backdrop-blur-sm text-blue-100 rounded-full">
                      New to SmartTasker?
                    </span>
                  </div>
                </div>

                {/* Register Link */}
                <Link to="/register" className="block w-full">
                  <button className="w-full relative overflow-hidden px-6 py-4 text-sm font-medium text-white bg-white/5 border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                    <span className="relative z-10 flex items-center justify-center">
                      Create your account
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;