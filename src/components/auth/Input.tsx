import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-gray-200 font-medium">
        {label}
        {props.required && <span className="text-pink-500 ml-1">*</span>}
      </label>
      <input
        className={`w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all hover:bg-white/10 ${className}`}
        {...props}
      />
    </div>
  );
}
