import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outline';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'default', hover = false, ...props }, ref) => {
    const baseClasses = 'rounded-2xl transition-all duration-300';

    const variantClasses = {
      default: 'bg-white border border-gray-200 shadow-sm',
      elevated: 'bg-white shadow-md',
      outline: 'bg-transparent border border-gray-200',
    };

    const hoverClasses = hover ? 'hover:shadow-lg hover:border-gray-300' : '';

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], hoverClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0 border-t border-gray-200 mt-6', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
