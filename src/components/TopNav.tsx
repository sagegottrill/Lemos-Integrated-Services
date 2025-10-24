import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, FileText, Ship, Package, Users, TrendingUp, Building, Command } from 'lucide-react';
import { SearchModal } from './SearchModal';

interface TopNavProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'contract' | 'shipment' | 'supply' | 'client' | 'report' | 'vendor';
  icon: React.ReactNode;
  data?: any;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock data for search functionality
  const mockData = {
    contracts: [
      { id: 'CNT-2024-001', client: 'Dangote Industries', type: 'Supply Agreement', value: '₦50M', status: 'Active' },
      { id: 'CNT-2024-002', client: 'MTN Nigeria', type: 'Service Contract', value: '₦25M', status: 'Pending' },
      { id: 'CNT-2024-003', client: 'First Bank', type: 'Consultancy', value: '₦15M', status: 'Active' },
      { id: 'CNT-2024-004', client: 'Nestle Nigeria', type: 'Import/Export', value: '₦35M', status: 'Draft' },
    ],
    shipments: [
      { id: 'SHP-2024-101', origin: 'Lagos', destination: 'Abuja', carrier: 'DHL Nigeria', status: 'In Transit' },
      { id: 'SHP-2024-102', origin: 'Port Harcourt', destination: 'Kano', carrier: 'GIG Logistics', status: 'Delivered' },
      { id: 'SHP-2024-103', origin: 'Warri', destination: 'Lagos', carrier: 'FedEx', status: 'Processing' },
    ],
    supplies: [
      { id: 'PO-2024-101', vendor: 'Alpha Supplies', items: 'Office Equipment', amount: '₦6.3M', status: 'Delivered' },
      { id: 'PO-2024-102', vendor: 'Beta Manufacturing', items: 'Raw Materials', amount: '₦11.9M', status: 'In Transit' },
      { id: 'PO-2024-103', vendor: 'Gamma Logistics', items: 'Packaging', amount: '₦3.4M', status: 'Processing' },
    ],
    clients: [
      { id: 'CLI-001', name: 'Dangote Industries', industry: 'Manufacturing', contracts: 5, value: '₦150M' },
      { id: 'CLI-002', name: 'MTN Nigeria', industry: 'Telecommunications', contracts: 3, value: '₦75M' },
      { id: 'CLI-003', name: 'First Bank', industry: 'Banking', contracts: 2, value: '₦45M' },
    ],
    vendors: [
      { id: 'VEN-001', name: 'Alpha Supplies', category: 'Office', outstanding: '₦6.3M', rating: '4.8/5' },
      { id: 'VEN-002', name: 'Beta Manufacturing', category: 'Industrial', outstanding: '₦11.9M', rating: '4.6/5' },
      { id: 'VEN-003', name: 'Gamma Logistics', category: 'Shipping', outstanding: '₦3.4M', rating: '4.9/5' },
    ]
  };

  const performSearch = (query: string): SearchResult[] => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Search contracts
    mockData.contracts.forEach(contract => {
      if (
        contract.id.toLowerCase().includes(searchTerm) ||
        contract.client.toLowerCase().includes(searchTerm) ||
        contract.type.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: contract.id,
          title: contract.id,
          subtitle: `${contract.client} - ${contract.type} (${contract.value})`,
          type: 'contract',
          icon: <FileText size={16} className="text-blue-600" />,
          data: contract
        });
      }
    });

    // Search shipments
    mockData.shipments.forEach(shipment => {
      if (
        shipment.id.toLowerCase().includes(searchTerm) ||
        shipment.origin.toLowerCase().includes(searchTerm) ||
        shipment.destination.toLowerCase().includes(searchTerm) ||
        shipment.carrier.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: shipment.id,
          title: shipment.id,
          subtitle: `${shipment.origin} → ${shipment.destination} via ${shipment.carrier}`,
          type: 'shipment',
          icon: <Ship size={16} className="text-green-600" />,
          data: shipment
        });
      }
    });

    // Search supplies
    mockData.supplies.forEach(supply => {
      if (
        supply.id.toLowerCase().includes(searchTerm) ||
        supply.vendor.toLowerCase().includes(searchTerm) ||
        supply.items.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: supply.id,
          title: supply.id,
          subtitle: `${supply.vendor} - ${supply.items} (${supply.amount})`,
          type: 'supply',
          icon: <Package size={16} className="text-purple-600" />,
          data: supply
        });
      }
    });

    // Search clients
    mockData.clients.forEach(client => {
      if (
        client.name.toLowerCase().includes(searchTerm) ||
        client.industry.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: client.id,
          title: client.name,
          subtitle: `${client.industry} - ${client.contracts} contracts (${client.value})`,
          type: 'client',
          icon: <Building size={16} className="text-orange-600" />,
          data: client
        });
      }
    });

    // Search vendors
    mockData.vendors.forEach(vendor => {
      if (
        vendor.name.toLowerCase().includes(searchTerm) ||
        vendor.category.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: vendor.id,
          title: vendor.name,
          subtitle: `${vendor.category} - Outstanding: ${vendor.outstanding}`,
          type: 'vendor',
          icon: <Users size={16} className="text-indigo-600" />,
          data: vendor
        });
      }
    });

    return results.slice(0, 8); // Limit to 8 results
  };

  useEffect(() => {
    const results = performSearch(searchQuery);
    setSearchResults(results);
    setIsSearchOpen(searchQuery.length > 0 && results.length > 0);
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open advanced search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsAdvancedSearchOpen(true);
      }
      // Escape to close search
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    console.log('Selected:', result);
    setSearchQuery('');
    setIsSearchOpen(false);
    // Here you would typically navigate to the specific item or show details
    alert(`Selected: ${result.title}\nType: ${result.type}\nDetails: ${result.subtitle}`);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'contract': return 'Contract';
      case 'shipment': return 'Shipment';
      case 'supply': return 'Supply Order';
      case 'client': return 'Client';
      case 'vendor': return 'Vendor';
      case 'report': return 'Report';
      default: return 'Item';
    }
  };

  return (
    <header className="bg-gray-100 h-20 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <button onClick={onToggleSidebar} className="text-gray-600 hover:text-gray-900 transition-colors">
          {isSidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Lemos Team!</h1>
          <p className="text-gray-600 text-sm">Managing contracts, imports, exports & consultancy with excellence</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search contracts, shipments, reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setIsSearchOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                setIsAdvancedSearchOpen(true);
                setIsSearchOpen(false);
              }
            }}
            className="pl-10 pr-20 py-2.5 w-80 bg-white border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm transition-all duration-200"
          />
          
          {/* Advanced Search Button */}
          <button
            onClick={() => setIsAdvancedSearchOpen(true)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Advanced Search (Ctrl+K)"
          >
            <Command size={12} />
            <span>K</span>
          </button>
          
          {/* Search Results Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
              <div className="p-2">
                <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </div>
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 truncate">{result.title}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex-shrink-0">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{result.subtitle}</p>
                    </div>
                  </button>
                ))}
                
                {searchQuery && searchResults.length === 0 && (
                  <div className="px-3 py-8 text-center text-gray-500">
                    <Search size={24} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No results found for "{searchQuery}"</p>
                    <p className="text-xs text-gray-400 mt-1">Try searching for contracts, shipments, or clients</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Advanced Search Modal */}
      <SearchModal 
        isOpen={isAdvancedSearchOpen} 
        onClose={() => setIsAdvancedSearchOpen(false)}
        initialQuery={searchQuery}
      />
    </header>
  );
};
