import React from 'react';

interface QuickActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  label,
  icon,
  onClick,
  variant = 'primary'
}) => {
  const baseClasses = "flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg border-2 w-full text-left";
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 border-blue-600 hover:border-blue-700 shadow-blue-200";
      case 'secondary':
        return "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 border-emerald-600 hover:border-emerald-700 shadow-emerald-200";
      case 'tertiary':
        return "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 border-purple-600 hover:border-purple-700 shadow-purple-200";
      default:
        return "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 border-blue-600 hover:border-blue-700 shadow-blue-200";
    }
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${getVariantClasses()}`}>
      <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg">
        {icon}
      </div>
      <span className="text-base">{label}</span>
    </button>
  );
};
