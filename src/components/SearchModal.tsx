import React, { useState, useEffect } from 'react';
import { X, Search, Filter, FileText, Ship, Package, Users, Building, TrendingUp } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'contract' | 'shipment' | 'supply' | 'client' | 'report' | 'vendor';
  icon: React.ReactNode;
  status?: string;
  date?: string;
  value?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filters = [
    { id: 'all', label: 'All', icon: <Search size={16} /> },
    { id: 'contract', label: 'Contracts', icon: <FileText size={16} /> },
    { id: 'shipment', label: 'Shipments', icon: <Ship size={16} /> },
    { id: 'supply', label: 'Supplies', icon: <Package size={16} /> },
    { id: 'client', label: 'Clients', icon: <Building size={16} /> },
    { id: 'vendor', label: 'Vendors', icon: <Users size={16} /> },
    { id: 'report', label: 'Reports', icon: <TrendingUp size={16} /> },
  ];

  // Extended mock data for comprehensive search
  const mockSearchData: SearchResult[] = [
    {
      id: 'CNT-2024-001',
      title: 'Supply Agreement - Dangote Industries',
      subtitle: 'CNT-2024-001',
      description: 'Long-term supply agreement for industrial equipment and materials',
      type: 'contract',
      icon: <FileText size={20} className="text-blue-600" />,
      status: 'Active',
      date: '2024-01-15',
      value: '₦50,000,000'
    },
    {
      id: 'CNT-2024-002',
      title: 'Service Contract - MTN Nigeria',
      subtitle: 'CNT-2024-002',
      description: 'Telecommunications infrastructure consultancy services',
      type: 'contract',
      icon: <FileText size={20} className="text-blue-600" />,
      status: 'Pending',
      date: '2024-02-20',
      value: '₦25,000,000'
    },
    {
      id: 'SHP-2024-101',
      title: 'Lagos to Abuja Shipment',
      subtitle: 'SHP-2024-101',
      description: 'Electronics and office equipment via DHL Nigeria',
      type: 'shipment',
      icon: <Ship size={20} className="text-green-600" />,
      status: 'In Transit',
      date: '2024-10-20',
      value: '₦2,500,000'
    },
    {
      id: 'SHP-2024-102',
      title: 'Port Harcourt to Kano Shipment',
      subtitle: 'SHP-2024-102',
      description: 'Raw materials and industrial components via GIG Logistics',
      type: 'shipment',
      icon: <Ship size={20} className="text-green-600" />,
      status: 'Delivered',
      date: '2024-10-18',
      value: '₦4,200,000'
    },
    {
      id: 'PO-2024-101',
      title: 'Office Equipment Purchase',
      subtitle: 'PO-2024-101',
      description: 'Computers, printers, and office furniture from Alpha Supplies',
      type: 'supply',
      icon: <Package size={20} className="text-purple-600" />,
      status: 'Delivered',
      date: '2024-10-15',
      value: '₦6,300,000'
    },
    {
      id: 'CLI-001',
      title: 'Dangote Industries',
      subtitle: 'Manufacturing Client',
      description: 'Major industrial client with multiple active contracts',
      type: 'client',
      icon: <Building size={20} className="text-orange-600" />,
      status: 'Active',
      date: '2020-03-10',
      value: '₦150,000,000'
    },
    {
      id: 'VEN-001',
      title: 'Alpha Supplies',
      subtitle: 'Office Equipment Vendor',
      description: 'Reliable supplier of office equipment and furniture',
      type: 'vendor',
      icon: <Users size={20} className="text-indigo-600" />,
      status: 'Active',
      date: '2021-06-15',
      value: '₦6,300,000'
    },
    {
      id: 'RPT-2024-Q3',
      title: 'Q3 Financial Report',
      subtitle: 'Quarterly Financial Analysis',
      description: 'Comprehensive financial performance report for Q3 2024',
      type: 'report',
      icon: <TrendingUp size={20} className="text-red-600" />,
      status: 'Generated',
      date: '2024-10-01',
      value: 'N/A'
    }
  ];

  const performSearch = (query: string, filter: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = mockSearchData;

      // Filter by type if not 'all'
      if (filter !== 'all') {
        results = results.filter(item => item.type === filter);
      }

      // Filter by search query
      if (query.trim()) {
        const searchTerm = query.toLowerCase();
        results = results.filter(item =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.subtitle.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.id.toLowerCase().includes(searchTerm)
        );
      }

      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      performSearch(searchQuery, selectedFilter);
    }
  }, [searchQuery, selectedFilter, isOpen]);

  const handleResultClick = (result: SearchResult) => {
    console.log('Selected result:', result);
    // Here you would navigate to the specific item or show details
    alert(`Opening: ${result.title}\nType: ${result.type}\nID: ${result.id}`);
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'delivered': return 'bg-blue-100 text-blue-700';
      case 'in transit': return 'bg-purple-100 text-purple-700';
      case 'generated': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Search className="text-blue-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Advanced Search</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search across all business data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
              autoFocus
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter size={16} className="text-gray-500 flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-6 space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </div>
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 truncate">
                          {result.title}
                        </h3>
                        {result.status && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>ID: {result.subtitle}</span>
                        {result.date && <span>Date: {result.date}</span>}
                        {result.value && result.value !== 'N/A' && <span>Value: {result.value}</span>}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Search size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No results found' : 'Start typing to search'}
              </h3>
              <p className="text-sm text-center max-w-md">
                {searchQuery 
                  ? `No results found for "${searchQuery}". Try different keywords or filters.`
                  : 'Search across contracts, shipments, supplies, clients, vendors, and reports.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};