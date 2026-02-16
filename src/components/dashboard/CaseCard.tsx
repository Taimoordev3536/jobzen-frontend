import React from 'react';
import { cn } from '@/lib/utils';

interface CaseCardProps {
  id: string | number;
  title: string;
  caseId?: string;
  type?: string;
  priority: string;
  status: string;
  parties?: {
    party1?: string;
    party2?: string;
  };
  timestamp?: string;
  onClick?: () => void;
  className?: string;
}

const priorityVariants = {
  Urgent: 'bg-red-100 text-red-600',
  High: 'bg-orange-100 text-orange-600',
  Medium: 'bg-yellow-100 text-yellow-600',
  Low: 'bg-green-100 text-green-600',
};

/**
 * Case Card Component
 * 
 * Specialized card for inspector cases/disputes
 * Features priority badges, dual parties, case metadata
 * 
 * @example
 * <CaseCard
 *   id={1}
 *   title="Wage Dispute"
 *   caseId="CS-2024-001"
 *   type="Payment"
 *   priority="Urgent"
 *   status="Under Review"
 *   parties={{ party1: "John Doe", party2: "Tech Corp" }}
 *   timestamp="2 hours ago"
 * />
 */
export function CaseCard({
  id,
  title,
  caseId,
  type,
  priority,
  status,
  parties,
  timestamp,
  onClick,
  className,
}: CaseCardProps) {
  return (
    <div
      className={cn(
        "group p-2.5 border border-gray-200 rounded-lg",
        "hover:shadow-lg transition-all duration-300 bg-white",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {/* Title and priority */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="font-semibold text-xs truncate">{title}</h4>
            <span className={cn(
              "px-1 py-0.5 text-[10px] font-semibold rounded whitespace-nowrap",
              priorityVariants[priority as keyof typeof priorityVariants] || priorityVariants.Medium
            )}>
              {priority}
            </span>
          </div>

          {/* Case metadata */}
          {(caseId || type) && (
            <div className="text-[10px] text-gray-500 mb-1">
              {caseId}{type && ` • ${type}`}
            </div>
          )}

          {/* Parties and timestamp */}
          <div className="flex items-center justify-between text-[10px]">
            {parties && (
              <span className="text-gray-600 truncate">
                {parties.party1}{parties.party2 && ` vs ${parties.party2}`}
              </span>
            )}
            {timestamp && (
              <span className="text-gray-500 ml-2 whitespace-nowrap">{timestamp}</span>
            )}
          </div>
        </div>

        {/* Status badge */}
        <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded whitespace-nowrap">
          {status}
        </span>
      </div>
    </div>
  );
}
