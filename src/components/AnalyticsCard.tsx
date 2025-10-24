import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon
}) => {
  const changeColor = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400'
  }[changeType];

  return (
    <div className="bg-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-cyan-400">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="text-cyan-500">{icon}</div>}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      {change && (
        <p className={`text-sm font-medium ${changeColor}`}>
          {change}
        </p>
      )}
    </div>
  );
};
