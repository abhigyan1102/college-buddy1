import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles =
        'px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

    const variantStyles = {
        primary: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white',
        secondary: 'bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
