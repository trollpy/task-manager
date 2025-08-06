import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({ 
  onFileChange, 
  accept = '*',
  multiple = false,
  label = 'Upload file',
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(multiple ? e.dataTransfer.files : e.dataTransfer.files[0]);
    }
  }, [onFileChange, multiple]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(multiple ? e.target.files : e.target.files[0]);
    }
  };

  return (
    <div 
      className={`relative ${className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <label
        className={`flex flex-col items-center justify-center w-full border-2 border-dashed ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } rounded-lg cursor-pointer hover:bg-gray-50 transition-colors p-6`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">{label}</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            {accept === '*' ? 'Any file type' : `Only ${accept}`}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

FileUpload.propTypes = {
  onFileChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string
};

export default FileUpload;