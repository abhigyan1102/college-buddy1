import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    children: React.ReactNode;
}

export function Select({ label, className = '', children, ...props }: SelectProps) {
    return (
        <div className="space-y-2">
            <label className="block text-gray-700">
                {label}
                {props.required && <span className="text-pink-500 ml-1">*</span>}
            </label>
            <select
                className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white ${className}`}
                {...props}
            >
                {children}
            </select>
        </div>
    );
}
