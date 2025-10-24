import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Dashboard } from '../pages/Dashboard';
import { ImportExport } from '../pages/ImportExport';
import { Contracts } from '../pages/Contracts';
import { Consultancy } from '../pages/Consultancy';
import { Supply } from '../pages/Supply';
import { Reports } from '../pages/Reports';
import { Settings } from '../pages/Settings';

export const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'import-export': return <ImportExport />;
      case 'contracts': return <Contracts />;
      case 'consultancy': return <Consultancy />;
      case 'supply': return <Supply />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;

      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
      />
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <TopNav 
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <main className="p-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm min-h-[calc(100vh-8rem)]">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};
