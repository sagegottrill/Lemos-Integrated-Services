import React from 'react';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  label, 
  percentage, 
  color = 'bg-cyan-500' 
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
