import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type ActionVariant = 
  | 'primary'      // Download, Apply Now, Next
  | 'secondary'    // Manage
  | 'outline'      // Back
  | 'danger'       // Delete
  | 'success'      // Create
  | 'accent'       // Buy
  | 'neutral'      // Cancel
  | 'info'         // Update
  | 'soft-primary'; // View

interface ActionButtonProps {
  variant: ActionVariant;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  children,
  onClick,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  className,
  disabled = false,
}) => {
  const variantStyles = {
    primary: 'bg-[#4439CC] hover:bg-[#372FA8] text-white border-0 shadow-sm hover:shadow-md',
    secondary: 'bg-[#5B52E6] hover:bg-[#4439CC] text-white border-0 shadow-sm hover:shadow-md',
    outline: 'bg-transparent hover:bg-[#EDEBFF] text-[#4439CC] border border-[#4439CC] hover:border-[#4439CC]',
    danger: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-sm hover:shadow-md',
    success: 'bg-[#16A34A] hover:bg-[#15803D] text-white border-0 shadow-sm hover:shadow-md',
    accent: 'bg-[#F59E0B] hover:bg-[#D97706] text-white border-0 shadow-sm hover:shadow-md',
    neutral: 'bg-[#6B7280] hover:bg-[#4B5563] text-white border-0 shadow-sm hover:shadow-md',
    info: 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white border-0 shadow-sm hover:shadow-md',
    'soft-primary': 'bg-[#EDEBFF] hover:bg-[#DCD9FF] text-[#4439CC] border-0',
  };

  const sizeStyles = {
    sm: 'h-6 px-2.5 text-[10px]',
    md: 'h-8 px-4 text-xs',
    lg: 'h-10 px-6 text-sm',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative font-medium rounded-lg transition-all duration-300',
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        {Icon && iconPosition === 'left' && <Icon className={iconSizes[size]} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className={iconSizes[size]} />}
      </span>
    </Button>
  );
};
