import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, id, error, className = '', type = 'text', icon, ...props }) => {
  const inputStyles = `block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-[#EE1C25] focus:border-[#EE1C25] sm:text-sm
    ${error ? 'border-[#C6001E] focus:ring-[#C6001E] focus:border-[#C6001E]' : 'border-[#E5E5E5]'}
    ${icon ? 'pl-10' : ''}`; // Add left padding if icon is present

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative"> {/* Wrapper for icon positioning */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          className={`${inputStyles} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;