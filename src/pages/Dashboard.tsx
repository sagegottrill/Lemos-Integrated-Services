import React, { useState } from 'react';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { QuickActionButton } from '../components/QuickActionButton';
import { LineChart } from '../components/LineChart';
import { NewShipmentModal } from '../components/modals/NewShipmentModal';
import { AddContractModal } from '../components/modals/AddContractModal';
import { GenerateReportModal } from '../components/modals/GenerateReportModal';
import { DollarSign, TrendingUp, Ship, FileText } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false);
  const [isAddContractOpen, setIsAddContractOpen] = useState(false);
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);

  const revenueData = [
    { month: 'Jan', value: 18500000 },
    { month: 'Feb', value: 21400000 },
    { month: 'Mar', value: 19800000 },
    { month: 'Apr', value: 25100000 },
    { month: 'May', value: 22600000 },
    { month: 'Jun', value: 27600000 },
    { month: 'Jul', value: 29600000 },
    { month: 'Aug', value: 28000000 },
    { month: 'Sep', value: 30900000 },
    { month: 'Oct', value: 33800000 },
    { month: 'Nov', value: 32100000 },
    { month: 'Dec', value: 35000000 }
  ];

  return (
    <div className="space-y-8">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Chart */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-8 h-80 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Lemos Integrated Services - Annual Performance</h2>
              <LineChart data={revenueData} title="" />
            </div>
            {/* Decorative circles */}
            <div className="absolute top-16 right-16 w-32 h-32 bg-yellow-300 rounded-full opacity-60"></div>
            <div className="absolute bottom-8 right-32 w-24 h-24 bg-orange-300 rounded-full opacity-70"></div>
          </div>
        </div>

        {/* Right Column - Calendar/Stats */}
        <div className="bg-gray-800 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Your Activity Days</h3>
            <span className="text-sm text-gray-400">June</span>
          </div>
          
          {/* Mini Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="text-gray-400 py-2">{day}</div>
            ))}
            {Array.from({length: 30}, (_, i) => (
              <div key={i} className={`py-2 rounded-lg ${
                i === 4 || i === 28 ? 'bg-yellow-400 text-gray-900' : 
                i === 10 || i === 15 || i === 22 ? 'bg-gray-600' : 'text-gray-400'
              }`}>
                {i + 1}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Current day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <span>Done</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
              <span>Scheduled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Analytics Cards */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <AnalyticsCard title="Total Revenue" value="₦324M" change="+12.5% from last month" changeType="positive" icon={<DollarSign />} />
            <AnalyticsCard title="Active Contracts" value="24" change="+3 new this week" changeType="positive" icon={<FileText />} />
          </div>
          
          <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Progress</h3>
              <button className="text-sm text-gray-500">Change Goal</button>
            </div>
            
            {/* Progress Circle */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                  <circle cx="60" cy="60" r="50" stroke="#ef4444" strokeWidth="8" fill="none" 
                    strokeDasharray={`${68 * 3.14159} ${(100-68) * 3.14159}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">68%</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Core Business Operations</h3>
            <button className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-red-700 transition-colors">+</button>
          </div>
          
          <div className="space-y-4">
            <QuickActionButton 
              label="New Shipment" 
              icon={<Ship size={20} />} 
              onClick={() => setIsNewShipmentOpen(true)} 
            />
            <QuickActionButton 
              label="Add Contract" 
              icon={<FileText size={20} />} 
              onClick={() => setIsAddContractOpen(true)} 
              variant="secondary" 
            />
            <QuickActionButton 
              label="Generate Report" 
              icon={<TrendingUp size={20} />} 
              onClick={() => setIsGenerateReportOpen(true)} 
              variant="tertiary"
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <NewShipmentModal 
        isOpen={isNewShipmentOpen} 
        onClose={() => setIsNewShipmentOpen(false)} 
      />
      <AddContractModal 
        isOpen={isAddContractOpen} 
        onClose={() => setIsAddContractOpen(false)} 
      />
      <GenerateReportModal 
        isOpen={isGenerateReportOpen} 
        onClose={() => setIsGenerateReportOpen(false)} 
      />
    </div>
  );
};
