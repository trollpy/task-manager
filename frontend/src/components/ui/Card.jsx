import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '', 
  title,
  actions,
  hoverEffect = false 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 ${
        hoverEffect ? 'hover:shadow-lg transition-shadow duration-200' : ''
      } ${className}`}
    >
      {title && (
        <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  actions: PropTypes.node,
  hoverEffect: PropTypes.bool
};

export default Card;