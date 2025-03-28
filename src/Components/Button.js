import React, { forwardRef } from 'react';

const Button = forwardRef(({ children, type, className, ...props }, ref) => {
  return (
    <button 
      type={type} 
      className={className}
      ref={ref} 
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
