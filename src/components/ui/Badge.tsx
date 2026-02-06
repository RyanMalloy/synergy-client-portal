import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', icon, children, ...props }, ref) => {
    const variantClasses = {
      default: 'text-gray-700 bg-gray-100',
      success: 'text-success bg-green-100',
      warning: 'text-warning bg-amber-100',
      error: 'text-error bg-red-100',
      info: 'text-synergy-blue bg-soft-blue',
    };

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs font-medium',
      md: 'px-3 py-1 text-xs font-semibold',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'active' | 'pending' | 'inactive' | 'completed';
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, className, ...props }, ref) => {
    const statusConfig = {
      active: {
        variant: 'success',
        label: 'Active',
        dotColor: 'bg-success',
      },
      pending: {
        variant: 'warning',
        label: 'Pending',
        dotColor: 'bg-warning',
      },
      inactive: {
        variant: 'error',
        label: 'Inactive',
        dotColor: 'bg-error',
      },
      completed: {
        variant: 'success',
        label: 'Completed',
        dotColor: 'bg-success',
      },
    } as const;

    const config = statusConfig[status];

    return (
      <Badge
        ref={ref}
        variant={config.variant as any}
        className={className}
        {...props}
      >
        <span className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
        {config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, children, removable = false, onRemove, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        'text-synergy-blue bg-soft-blue rounded-full',
        className
      )}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 text-synergy-blue hover:text-blue-700 focus:outline-none"
          aria-label="Remove tag"
        >
          ×
        </button>
      )}
    </span>
  )
);

Tag.displayName = 'Tag';
