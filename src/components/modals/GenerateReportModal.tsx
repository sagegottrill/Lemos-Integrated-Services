import React, { useState } from 'react';
import { X, BarChart3, Download } from 'lucide-react';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    reportType: '',
    dateRange: 'last30days',
    startDate: '',
    endDate: '',
    format: 'pdf',
    includeCharts: true,
    includeSummary: true,
    includeDetails: true,
    departments: [] as string[]
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      console.log('Report Generated:', formData);
      setIsGenerating(false);
      onClose();
      // Here you would typically trigger the download
      alert('Report generated successfully! Download will start shortly.');
    }, 2000);
  };

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setFormData({...formData, departments: [...formData.departments, department]});
    } else {
      setFormData({...formData, departments: formData.departments.filter(d => d !== department)});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-purple-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Generate Report</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                id="reportType"
                value={formData.reportType}
                onChange={(e) => setFormData({...formData, reportType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Select report type</option>
                <option value="financial">Financial Summary</option>
                <option value="shipments">Shipments Report</option>
                <option value="contracts">Contracts Analysis</option>
                <option value="supply">Supply Chain Report</option>
                <option value="consultancy">Consultancy Performance</option>
                <option value="comprehensive">Comprehensive Report</option>
              </select>
            </div>
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select
                id="format"
                value={formData.format}
                onChange={(e) => setFormData({...formData, format: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
                <option value="word">Word Document</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              id="dateRange"
              value={formData.dateRange}
              onChange={(e) => setFormData({...formData, dateRange: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last3months">Last 3 Months</option>
              <option value="last6months">Last 6 Months</option>
              <option value="lastyear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {formData.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Include in Report</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includeCharts"
                  checked={formData.includeCharts}
                  onChange={(e) => setFormData({...formData, includeCharts: e.target.checked})}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="includeCharts" className="text-sm text-gray-700">Charts and Graphs</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includeSummary"
                  checked={formData.includeSummary}
                  onChange={(e) => setFormData({...formData, includeSummary: e.target.checked})}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="includeSummary" className="text-sm text-gray-700">Executive Summary</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includeDetails"
                  checked={formData.includeDetails}
                  onChange={(e) => setFormData({...formData, includeDetails: e.target.checked})}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="includeDetails" className="text-sm text-gray-700">Detailed Data Tables</label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Departments</label>
            <div className="grid grid-cols-2 gap-3">
              {['Import/Export', 'Contracts', 'Consultancy', 'Supply', 'Finance', 'Operations'].map((dept) => (
                <div key={dept} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={dept}
                    checked={formData.departments.includes(dept)}
                    onChange={(e) => handleDepartmentChange(dept, e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor={dept} className="text-sm text-gray-700">{dept}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              disabled={isGenerating}
              className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download size={16} className="mr-2" />
                  Generate Report
                </>
              )}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};