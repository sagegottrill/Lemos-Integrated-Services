import React from 'react';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { LineChart } from '../components/LineChart';
import { Download, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

export const Reports: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', value: 125000 },
    { month: 'Feb', value: 138000 },
    { month: 'Mar', value: 142000 },
    { month: 'Apr', value: 155000 },
    { month: 'May', value: 148000 },
    { month: 'Jun', value: 168000 },
    { month: 'Jul', value: 175000 },
    { month: 'Aug', value: 182000 },
    { month: 'Sep', value: 195000 },
    { month: 'Oct', value: 208000 },
    { month: 'Nov', value: 198000 },
    { month: 'Dec', value: 215000 }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard title="Annual Revenue" value="₦845M" change="+18.5% YoY" changeType="positive" icon={<DollarSign />} />
        <AnalyticsCard title="Avg Monthly Growth" value="12.3%" change="+2.1% vs target" changeType="positive" icon={<TrendingUp />} />
        <AnalyticsCard title="Total Transactions" value="1,847" change="+156 this month" changeType="positive" icon={<BarChart3 />} />
      </div>

      <div className="mb-8">
        <LineChart data={monthlyData} title="Monthly Performance Overview" />
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-cyan-400 transition-all">
            <span className="font-medium text-gray-700">Financial Summary</span>
            <Download size={20} className="text-cyan-500" />
          </button>
          <button className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-cyan-400 transition-all">
            <span className="font-medium text-gray-700">Shipment Report</span>
            <Download size={20} className="text-cyan-500" />
          </button>
          <button className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-cyan-400 transition-all">
            <span className="font-medium text-gray-700">Contract Analysis</span>
            <Download size={20} className="text-cyan-500" />
          </button>
          <button className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-cyan-400 transition-all">
            <span className="font-medium text-gray-700">Vendor Performance</span>
            <Download size={20} className="text-cyan-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
