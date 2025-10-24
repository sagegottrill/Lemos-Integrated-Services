import React from 'react';
import { DataTable } from '../components/DataTable';

export const Contracts: React.FC = () => {
  const contracts = [
    { id: 'CNT-001', client: 'Dangote Industries', value: '₦103M', status: 'Active', renewal: '2025-06-15', type: 'Supply Agreement' },
    { id: 'CNT-002', client: 'MTN Nigeria', value: '₦74M', status: 'Active', renewal: '2025-03-20', type: 'Service Contract' },
    { id: 'CNT-003', client: 'Nigerian Breweries', value: '₦132M', status: 'Pending', renewal: '2025-08-10', type: 'Distribution' },
    { id: 'CNT-004', client: 'Oando Trading', value: '₦62M', status: 'Active', renewal: '2025-01-30', type: 'Import/Export' },
    { id: 'CNT-005', client: 'First Bank Nigeria', value: '₦173M', status: 'Active', renewal: '2025-09-05', type: 'Consultancy' },
    { id: 'CNT-006', client: 'Zenith Bank', value: '₦113M', status: 'Expired', renewal: '2024-10-15', type: 'Supply Agreement' }
  ];

  const merchandise = [
    { sku: 'MRC-001', name: 'Industrial Equipment Set', category: 'Machinery', stock: 45, price: '₦5.1M' },
    { sku: 'MRC-002', name: 'Electronic Components', category: 'Electronics', stock: 230, price: '₦350K' },
    { sku: 'MRC-003', name: 'Office Furniture Bundle', category: 'Furniture', stock: 18, price: '₦1.3M' },
    { sku: 'MRC-004', name: 'Medical Supplies Kit', category: 'Healthcare', stock: 92, price: '₦600K' },
    { sku: 'MRC-005', name: 'Construction Materials', category: 'Building', stock: 156, price: '₦3.7M' },
    { sku: 'MRC-006', name: 'Automotive Parts', category: 'Automotive', stock: 78, price: '₦865K' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contracts & Merchandise</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Contracts</h2>
        <DataTable 
          columns={[
            { key: 'id', label: 'Contract ID' },
            { key: 'client', label: 'Client' },
            { key: 'value', label: 'Value' },
            { 
              key: 'status', 
              label: 'Status',
              render: (value: string) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  value === 'Active' ? 'bg-green-100 text-green-700' :
                  value === 'Pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {value}
                </span>
              )
            },
            { key: 'renewal', label: 'Renewal Date' },
            { key: 'type', label: 'Type' }
          ]} 
          data={contracts} 
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Merchandise Catalog</h2>
        <DataTable 
          columns={[
            { key: 'sku', label: 'SKU' },
            { key: 'name', label: 'Product Name' },
            { key: 'category', label: 'Category' },
            { key: 'stock', label: 'Stock' },
            { key: 'price', label: 'Price' }
          ]} 
          data={merchandise} 
        />
      </div>
    </div>
  );
};
