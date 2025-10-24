import React from 'react';
import { DataTable } from '../components/DataTable';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export const Supply: React.FC = () => {
  const purchaseOrders = [
    { po: 'PO-2024-101', vendor: 'Alpha Supplies', items: 'Office Equipment', amount: '₦6.3M', status: 'Delivered', date: '2024-10-20' },
    { po: 'PO-2024-102', vendor: 'Beta Manufacturing', items: 'Raw Materials', amount: '₦11.9M', status: 'In Transit', date: '2024-10-22' },
    { po: 'PO-2024-103', vendor: 'Gamma Logistics', items: 'Packaging', amount: '₦3.4M', status: 'Processing', date: '2024-10-23' },
    { po: 'PO-2024-104', vendor: 'Delta Tech', items: 'IT Hardware', amount: '₦17.5M', status: 'Delivered', date: '2024-10-18' },
    { po: 'PO-2024-105', vendor: 'Epsilon Traders', items: 'Safety Equipment', amount: '₦5.3M', status: 'In Transit', date: '2024-10-21' }
  ];

  const vendors = [
    { name: 'Alpha Supplies', category: 'Office', outstanding: '₦6.3M', rating: '4.8/5' },
    { name: 'Beta Manufacturing', category: 'Industrial', outstanding: '₦11.9M', rating: '4.6/5' },
    { name: 'Gamma Logistics', category: 'Shipping', outstanding: '₦3.4M', rating: '4.9/5' },
    { name: 'Delta Tech', category: 'Technology', outstanding: '₦0', rating: '4.7/5' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">General Supply</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard title="Active Orders" value="156" change="+12 this week" changeType="positive" icon={<Package />} />
        <AnalyticsCard title="Total Spend" value="₦44.5M" change="+5.2% vs last month" changeType="positive" icon={<DollarSign />} />
        <AnalyticsCard title="Stock Value" value="₦101M" change="+8.1%" changeType="positive" icon={<TrendingUp />} />
        <AnalyticsCard title="Low Stock Items" value="8" change="3 critical" changeType="negative" icon={<AlertCircle />} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Purchase Orders</h2>
        <DataTable 
          columns={[
            { key: 'po', label: 'PO Number' },
            { key: 'vendor', label: 'Vendor' },
            { key: 'items', label: 'Items' },
            { key: 'amount', label: 'Amount' },
            { 
              key: 'status', 
              label: 'Status',
              render: (value: string) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  value === 'Delivered' ? 'bg-green-100 text-green-700' :
                  value === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {value}
                </span>
              )
            },
            { key: 'date', label: 'Date' }
          ]} 
          data={purchaseOrders} 
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Vendor Payments</h2>
        <DataTable 
          columns={[
            { key: 'name', label: 'Vendor Name' },
            { key: 'category', label: 'Category' },
            { key: 'outstanding', label: 'Outstanding' },
            { key: 'rating', label: 'Rating' }
          ]} 
          data={vendors} 
        />
      </div>
    </div>
  );
};
