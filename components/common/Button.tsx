import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'secondary-outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-[#EE1C25] hover:bg-[#C6001E] text-white focus:ring-[#FF4D57]',
    secondary: 'bg-[#E5E5E5] hover:bg-[#777777] text-[#444444] hover:text-white focus:ring-[#777777]',
    danger: 'bg-[#C6001E] hover:bg-[#EE1C25] text-white focus:ring-[#FF4D57]',
    outline: 'bg-transparent border-2 border-[#EE1C25] text-[#EE1C25] hover:bg-[#F5F5F5] focus:ring-[#FF4D57]',
    'secondary-outline': 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#EE1C25] focus:ring-white',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;