import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  rounded = 'full'
}) => {
  const baseClasses = 'inline-flex items-center font-medium';
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1 text-base'
  };
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800'
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <span
      className={`${baseClasses} 
                 ${sizeClasses[size]} 
                 ${variantClasses[variant]} 
                 ${roundedClasses[rounded]} 
                 ${className}`}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full'])
};

export default Badge;