import React, { useState } from 'react';
import { X, BarChart3, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

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
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={formData.reportType} onValueChange={(value) => setFormData({...formData, reportType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial Summary</SelectItem>
                  <SelectItem value="shipments">Shipments Report</SelectItem>
                  <SelectItem value="contracts">Contracts Analysis</SelectItem>
                  <SelectItem value="supply">Supply Chain Report</SelectItem>
                  <SelectItem value="consultancy">Consultancy Performance</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select value={formData.format} onValueChange={(value) => setFormData({...formData, format: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="word">Word Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={formData.dateRange} onValueChange={(value) => setFormData({...formData, dateRange: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last3months">Last 3 Months</SelectItem>
                <SelectItem value="last6months">Last 6 Months</SelectItem>
                <SelectItem value="lastyear">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <Label className="text-base font-medium">Include in Report</Label>
            <div className="mt-3 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeCharts" 
                  checked={formData.includeCharts}
                  onCheckedChange={(checked) => setFormData({...formData, includeCharts: checked as boolean})}
                />
                <Label htmlFor="includeCharts">Charts and Graphs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeSummary" 
                  checked={formData.includeSummary}
                  onCheckedChange={(checked) => setFormData({...formData, includeSummary: checked as boolean})}
                />
                <Label htmlFor="includeSummary">Executive Summary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeDetails" 
                  checked={formData.includeDetails}
                  onCheckedChange={(checked) => setFormData({...formData, includeDetails: checked as boolean})}
                />
                <Label htmlFor="includeDetails">Detailed Data Tables</Label>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Departments</Label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {['Import/Export', 'Contracts', 'Consultancy', 'Supply', 'Finance', 'Operations'].map((dept) => (
                <div key={dept} className="flex items-center space-x-2">
                  <Checkbox 
                    id={dept}
                    checked={formData.departments.includes(dept)}
                    onCheckedChange={(checked) => handleDepartmentChange(dept, checked as boolean)}
                  />
                  <Label htmlFor={dept}>{dept}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gray-900 hover:bg-gray-800"
              disabled={isGenerating}
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
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};