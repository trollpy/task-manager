import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NotFound = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center max-w-2xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text select-none">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-slate-800 -z-10 blur-sm">
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-lg mx-auto">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <svg className="w-32 h-32 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h.01M15 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute inset-0 animate-ping">
              <svg className="w-32 h-32 text-slate-600/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="1"></circle>
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/" className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <button className="relative px-8 py-4 bg-slate-800 text-white font-medium rounded-xl border border-slate-700 hover:bg-slate-700 transition-all duration-200 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
          </Link>

          <button 
            onClick={() => window.history.back()} 
            className="px-8 py-4 text-slate-300 font-medium hover:text-white hover:bg-slate-800/50 rounded-xl border border-slate-700 transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-sm text-slate-500 mb-4">
            Still lost? Here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/help" className="text-slate-400 hover:text-white transition-colors">
              Help Center
            </Link>
            <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
              Contact Support
            </Link>
            <Link to="/docs" className="text-slate-400 hover:text-white transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-20 right-32 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-500"></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-1000"></div>
    </div>
  );
};

export default NotFound;