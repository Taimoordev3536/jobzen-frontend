import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ViewDetailsButtonProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = ({
  onClick,
  size = 'sm',
  className,
  label = 'View Details',
}) => {
  const sizeClasses = {
    sm: 'h-5 px-2 text-[8px]',
    md: 'h-6 px-2.5 text-[9px]',
    lg: 'h-6 px-3 text-[10px]',
  };

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={cn(
        'group font-medium bg-transparent hover:bg-transparent rounded-md transition-colors duration-150',
        sizeClasses[size],
        className,
      )}
      style={{
        color: 'var(--theme-accent)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--theme-nav-active-from)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--theme-accent)';
      }}
    >
      {label}
    </Button>
  );
};
