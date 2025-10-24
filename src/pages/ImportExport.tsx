import React from 'react';
import { DataTable } from '../components/DataTable';

export const ImportExport: React.FC = () => {
  const shipments = [
    { id: 'SH-2024-001', origin: 'Shanghai', destination: 'Los Angeles', status: 'In Transit', eta: '2024-11-15', carrier: 'Maersk' },
    { id: 'SH-2024-002', origin: 'Hamburg', destination: 'New York', status: 'Customs', eta: '2024-11-10', carrier: 'MSC' },
    { id: 'SH-2024-003', origin: 'Singapore', destination: 'Rotterdam', status: 'Delivered', eta: '2024-10-28', carrier: 'CMA CGM' },
    { id: 'SH-2024-004', origin: 'Dubai', destination: 'London', status: 'In Transit', eta: '2024-11-12', carrier: 'Hapag-Lloyd' },
    { id: 'SH-2024-005', origin: 'Tokyo', destination: 'Seattle', status: 'Loading', eta: '2024-11-20', carrier: 'ONE' },
    { id: 'SH-2024-006', origin: 'Mumbai', destination: 'Miami', status: 'In Transit', eta: '2024-11-18', carrier: 'Evergreen' },
    { id: 'SH-2024-007', origin: 'Hong Kong', destination: 'Vancouver', status: 'Customs', eta: '2024-11-08', carrier: 'COSCO' },
    { id: 'SH-2024-008', origin: 'Busan', destination: 'Long Beach', status: 'In Transit', eta: '2024-11-14', carrier: 'Yang Ming' }
  ];

  const suppliers = [
    { name: 'Global Trade Corp', country: 'China', products: 'Electronics', contact: 'contact@globaltrade.cn' },
    { name: 'Euro Imports Ltd', country: 'Germany', products: 'Machinery', contact: 'info@euroimports.de' },
    { name: 'Asia Pacific Exports', country: 'Singapore', products: 'Textiles', contact: 'sales@asiapacific.sg' },
    { name: 'Middle East Trading', country: 'UAE', products: 'Oil & Gas', contact: 'trade@metrade.ae' }
  ];

  const columns = [
    { key: 'id', label: 'Tracking ID' },
    { key: 'origin', label: 'Origin' },
    { key: 'destination', label: 'Destination' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'Delivered' ? 'bg-green-100 text-green-700' :
          value === 'In Transit' ? 'bg-blue-100 text-blue-700' :
          value === 'Customs' ? 'bg-amber-100 text-amber-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'eta', label: 'ETA' },
    { key: 'carrier', label: 'Carrier' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Import & Export</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipment Tracker</h2>
        <DataTable columns={columns} data={shipments} />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Suppliers</h2>
        <DataTable columns={[
          { key: 'name', label: 'Supplier Name' },
          { key: 'country', label: 'Country' },
          { key: 'products', label: 'Products' },
          { key: 'contact', label: 'Contact' }
        ]} data={suppliers} />
      </div>
    </div>
  );
};
