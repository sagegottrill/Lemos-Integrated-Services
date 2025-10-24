import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 px-6 mt-auto">
      <div className="text-center text-sm text-gray-600">
        © {currentYear} Orivon Edge. All rights reserved.
      </div>
    </footer>
  );
};