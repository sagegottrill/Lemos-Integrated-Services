import React from 'react';
import { DataTable } from '../components/DataTable';
import { ProgressBar } from '../components/ProgressBar';

export const Consultancy: React.FC = () => {
  const clients = [
    { name: 'Tech Innovators Inc', industry: 'Technology', contact: 'Sarah Johnson', email: 'sarah@techinnovators.com', projects: 3 },
    { name: 'Finance Pro Group', industry: 'Finance', contact: 'Michael Chen', email: 'mchen@financepro.com', projects: 2 },
    { name: 'Healthcare Solutions', industry: 'Healthcare', contact: 'Emily Davis', email: 'emily@healthsolutions.com', projects: 4 },
    { name: 'Retail Masters', industry: 'Retail', contact: 'David Wilson', email: 'dwilson@retailmasters.com', projects: 1 },
    { name: 'Manufacturing Co', industry: 'Manufacturing', contact: 'Lisa Anderson', email: 'lisa@mfgco.com', projects: 2 }
  ];

  const projects = [
    { name: 'Digital Transformation Initiative', percentage: 85 },
    { name: 'Supply Chain Optimization', percentage: 62 },
    { name: 'Market Expansion Strategy', percentage: 45 },
    { name: 'Process Automation', percentage: 78 },
    { name: 'Risk Management Framework', percentage: 93 },
    { name: 'Customer Experience Enhancement', percentage: 55 },
    { name: 'Data Analytics Platform', percentage: 70 },
    { name: 'Sustainability Program', percentage: 38 }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Consultancy Services</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Clients</h2>
        <DataTable 
          columns={[
            { key: 'name', label: 'Client Name' },
            { key: 'industry', label: 'Industry' },
            { key: 'contact', label: 'Contact Person' },
            { key: 'email', label: 'Email' },
            { key: 'projects', label: 'Active Projects' }
          ]} 
          data={clients} 
        />
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Progress</h2>
        {projects.map((project, idx) => (
          <ProgressBar 
            key={idx} 
            label={project.name} 
            percentage={project.percentage}
            color={project.percentage > 75 ? 'bg-green-500' : project.percentage > 50 ? 'bg-cyan-500' : 'bg-amber-500'}
          />
        ))}
      </div>
    </div>
  );
};
