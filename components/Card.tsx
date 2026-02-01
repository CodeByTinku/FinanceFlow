import React from 'react';

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
        {icon && <span className="text-brand-600">{icon}</span>}
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};