import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  error,
  placeholder,
  className = '',
  icon,
  ...props
}) => {
  const selectStyles = `block w-full pl-3 pr-10 py-2 mt-1 text-base border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
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
        <select id={id} name={id} className={`${selectStyles} ${className}`} {...props}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;