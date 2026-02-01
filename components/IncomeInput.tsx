import React, { useState, useEffect } from 'react';
import { RefreshCw, IndianRupee } from 'lucide-react';

interface IncomeInputProps {
  income: number;
  setIncome: (value: number) => void;
  onReset: () => void;
}

export const IncomeInput: React.FC<IncomeInputProps> = ({ income, setIncome, onReset }) => {
  const [localValue, setLocalValue] = useState<string>(income > 0 ? income.toString() : '');

  useEffect(() => {
    setLocalValue(income > 0 ? income.toString() : '');
  }, [income]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only numbers
    if (val === '' || /^\d+$/.test(val)) {
      setLocalValue(val);
    }
  };

  const handleBlur = () => {
    const num = parseInt(localValue, 10);
    if (!isNaN(num)) {
      setIncome(num);
    } else {
      setIncome(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full">
      <div className="flex-grow w-full">
        <label htmlFor="income" className="block text-sm font-medium text-slate-500 mb-1">
          Monthly Pocket Money / Income
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <IndianRupee size={18} />
          </div>
          <input
            type="text"
            id="income"
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 5000"
            className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors text-lg font-semibold text-slate-800 placeholder-slate-300"
          />
        </div>
      </div>
      <button
        onClick={onReset}
        className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 flex items-center gap-2 text-sm"
        title="Reset all data"
      >
        <RefreshCw size={16} />
        <span className="hidden sm:inline">Reset</span>
      </button>
    </div>
  );
};