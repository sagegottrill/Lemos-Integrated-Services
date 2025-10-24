import React, { useState } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';

interface TopNavProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-gray-100 h-20 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <button onClick={onToggleSidebar} className="text-gray-600 hover:text-gray-900 transition-colors">
          {isSidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hi, Lemos Team!</h1>
          <p className="text-gray-600 text-sm">Let's take a look at your integrated services today</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search business data"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-64 bg-white border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 shadow-sm"
          />
        </div>

      </div>
    </header>
  );
};
