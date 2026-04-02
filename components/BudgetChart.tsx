import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Allocations } from '../types';

interface BudgetChartProps {
  allocations: Allocations;
  income: number;
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ allocations, income }) => {
  const data = [
    { name: 'Needs', value: (income * allocations.needs) / 100, color: '#3b82f6', percent: allocations.needs },
    { name: 'Wants', value: (income * allocations.wants) / 100, color: '#8b5cf6', percent: allocations.wants },
    { name: 'Savings', value: (income * allocations.savings) / 100, color: '#10b981', percent: allocations.savings },
  ];

  if (income === 0) {
      return (
          <div className="h-64 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 transition-colors">
              <p>Set an income to see the breakdown</p>
          </div>
      )
  }

  return (
    <div className="h-72 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 14, fontWeight: 500 }}
            width={70}
          />
          <Tooltip 
            cursor={{fill: '#f1f5f9'}}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            formatter={(value: number) => [`₹${Math.round(value).toLocaleString('en-IN')}`, 'Amount']}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};