import React from 'react';

interface LineChartProps {
  data: { month: string; value: number }[];
  title: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = 200;

  return (
    <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="relative" style={{ height: chartHeight }}>
        <svg className="w-full h-full">
          {data.map((point, idx) => {
            if (idx === 0) return null;
            const prevPoint = data[idx - 1];
            const x1 = ((idx - 1) / (data.length - 1)) * 100;
            const x2 = (idx / (data.length - 1)) * 100;
            const y1 = chartHeight - (prevPoint.value / maxValue) * chartHeight;
            const y2 = chartHeight - (point.value / maxValue) * chartHeight;
            return (
              <line
                key={idx}
                x1={`${x1}%`}
                y1={y1}
                x2={`${x2}%`}
                y2={y2}
                stroke="url(#gradient)"
                strokeWidth="3"
              />
            );
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex justify-between mt-4">
        {data.map((point, idx) => (
          <span key={idx} className="text-xs text-gray-600">{point.month}</span>
        ))}
      </div>
    </div>
  );
};
