import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'rounded-lg font-medium transition-all focus:outline-none focus:ring-2';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300'
  };

  return (
    <button
      className={`${baseClasses} 
                 ${sizeClasses[size]} 
                 ${variantClasses[variant]} 
                 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
                 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;