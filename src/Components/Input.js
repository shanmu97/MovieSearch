import React, { forwardRef } from 'react';

const Input = forwardRef(({ type, id, name, className, ...props }, ref) => {
  return (
    <div>
      <input 
        type={type}
        id={id}
        name={name}
        className={` border-red-800 ${className}`}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default Input;
