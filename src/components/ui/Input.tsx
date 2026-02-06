import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random()}`;

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-synergy-blue focus:border-transparent',
            'transition-all duration-200',
            error
              ? 'border-error ring-2 ring-error/20'
              : 'border-gray-300 hover:border-gray-400',
            'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-error">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `textarea-${Math.random()}`;

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-synergy-blue focus:border-transparent',
            'transition-all duration-200 resize-none',
            error
              ? 'border-error ring-2 ring-error/20'
              : 'border-gray-300 hover:border-gray-400',
            'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-error">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const inputId = id || `select-${Math.random()}`;

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 bg-white border rounded-lg text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-synergy-blue focus:border-transparent',
            'transition-all duration-200 appearance-none cursor-pointer',
            error
              ? 'border-error ring-2 ring-error/20'
              : 'border-gray-300 hover:border-gray-400',
            'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
            'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%23666%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27m6 8 4 4 4-4%27/%3E%3C/svg%3E")] bg-[length:1.5em_1.5em] bg-no-repeat bg-[right_0.5rem_center]',
            'pr-10',
            className
          )}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || `checkbox-${Math.random()}`;

    return (
      <label htmlFor={inputId} className="flex items-center gap-3 cursor-pointer group w-fit">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className={cn(
            'w-5 h-5 rounded border-gray-300 text-synergy-blue',
            'focus:ring-synergy-blue focus:ring-offset-0',
            'transition-colors duration-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {label && (
          <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
