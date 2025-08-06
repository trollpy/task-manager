import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ 
  trigger, 
  children, 
  position = 'bottom-right',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const positionClasses = {
    'bottom-right': 'origin-top-right right-0 mt-2',
    'bottom-left': 'origin-top-left left-0 mt-2',
    'top-right': 'origin-bottom-right right-0 mb-2',
    'top-left': 'origin-bottom-left left-0 mb-2'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${positionClasses[position]} w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  className: PropTypes.string
};

export default Dropdown;