import React, { useState } from 'react';
import { TrendingUp, Calendar, ArrowRight } from 'lucide-react';

interface SavingsProjectionProps {
  monthlySavings: number;
}

export const SavingsProjection: React.FC<SavingsProjectionProps> = ({ monthlySavings }) => {
  const [months, setMonths] = useState<number>(6);

  const projectedAmount = monthlySavings * months;

  const durationOptions = [3, 6, 12, 24];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">Project over time period:</label>
        <div className="flex flex-wrap gap-2">
          {durationOptions.map((m) => (
            <button
              key={m}
              onClick={() => setMonths(m)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                months === m
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-200 dark:shadow-brand-900/20'
                  : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {m} Months
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-brand-50 to-white dark:from-slate-800 dark:to-slate-900 border border-brand-100 dark:border-slate-700 rounded-xl p-6 relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5">
            <TrendingUp size={100} className="text-brand-500" />
        </div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-2 text-brand-700 mb-2">
                <Calendar size={18} />
                <span className="font-semibold text-sm uppercase tracking-wider">Future Wealth</span>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed transition-colors">
                If you stick to saving <span className="font-semibold text-slate-900 dark:text-white">₹{monthlySavings.toLocaleString('en-IN')}</span> every month...
            </p>

            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase transition-colors">In {months} Months</p>
                    <p className="text-3xl font-bold text-brand-600">
                        ₹{projectedAmount.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>
            
            {months >= 12 && (
                <div className="mt-4 pt-4 border-t border-brand-100 dark:border-slate-700 transition-colors">
                    <p className="text-xs text-brand-600 italic">
                        Tip: Investing this could yield even more with compound interest!
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};