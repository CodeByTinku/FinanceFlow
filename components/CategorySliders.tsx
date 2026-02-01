import React from 'react';
import { Allocations, CategoryKey } from '../types';
import { Heart, ShoppingBag, PiggyBank } from 'lucide-react';

interface CategorySlidersProps {
  income: number;
  allocations: Allocations;
  setAllocations: (allocs: Allocations) => void;
}

const CATEGORY_CONFIG = {
  needs: { color: 'text-needs', bg: 'bg-needs', label: 'Needs', icon: Heart, desc: 'Rent, Food, Transport' },
  wants: { color: 'text-wants', bg: 'bg-wants', label: 'Wants', icon: ShoppingBag, desc: 'Netflix, Dining out, Hobbies' },
  savings: { color: 'text-savings', bg: 'bg-savings', label: 'Savings', icon: PiggyBank, desc: 'Emergency fund, Goals' },
};

export const CategorySliders: React.FC<CategorySlidersProps> = ({ income, allocations, setAllocations }) => {
  
  const handleSliderChange = (changedCategory: CategoryKey, newValue: number) => {
    // Clamp new value between 0 and 100
    newValue = Math.max(0, Math.min(100, newValue));
    
    const oldValue = allocations[changedCategory];
    const diff = newValue - oldValue;
    
    // If no change, return
    if (diff === 0) return;

    const newAllocations = { ...allocations, [changedCategory]: newValue };
    
    // Calculate how much we need to adjust the OTHER categories
    const otherCategories = (Object.keys(allocations) as CategoryKey[]).filter(k => k !== changedCategory);
    const sumOthers = otherCategories.reduce((sum, key) => sum + allocations[key], 0);

    // If sum of others is 0, we can't scale proportionally. We must split the diff evenly or give to one.
    // If we are increasing the main slider, we need to decrease others.
    // If we are decreasing the main slider, we need to increase others.
    
    if (sumOthers === 0) {
        // If others are zero, split the remaining amount evenly among them
        const remaining = 100 - newValue;
        otherCategories.forEach(key => {
            newAllocations[key] = remaining / otherCategories.length;
        });
    } else {
        // Scale others proportionally
        // New Sum of Others must be: 100 - newValue
        const targetSumOthers = 100 - newValue;
        const scaleFactor = targetSumOthers / sumOthers;
        
        let distributedSum = 0;
        
        otherCategories.forEach((key, index) => {
             // For the last category, we might need to round to ensure sum is exactly 100
             if (index === otherCategories.length - 1) {
                 newAllocations[key] = Math.max(0, 100 - newValue - distributedSum);
             } else {
                 const newVal = allocations[key] * scaleFactor;
                 newAllocations[key] = newVal;
                 distributedSum += newVal;
             }
        });
    }

    // Rounding pass to ensure cleaner integers where possible, 
    // but typically floating point is fine for internal logic, visual can round.
    // Let's stick to simple rounding for display, keep precision in state if needed.
    // Actually for sliders, integers feel better.
    
    const integerAllocations: Allocations = {
        needs: Math.round(newAllocations.needs),
        wants: Math.round(newAllocations.wants),
        savings: Math.round(newAllocations.savings)
    };
    
    // Fix rounding errors to force sum to 100
    const sumInt = integerAllocations.needs + integerAllocations.wants + integerAllocations.savings;
    const error = 100 - sumInt;
    
    if (error !== 0) {
        // Add error to the category we just changed to make it feel responsive, 
        // OR add to the largest other category. 
        // Adding to the largest other category is usually smoother.
        // Let's simplify: dump error into the changed category? No, user set that specific value.
        // Dump error into the first "other" category.
         integerAllocations[otherCategories[0]] += error;
    }

    setAllocations(integerAllocations);
  };

  return (
    <div className="space-y-8">
      {(Object.keys(allocations) as CategoryKey[]).map((key) => {
        const config = CATEGORY_CONFIG[key];
        const Icon = config.icon;
        const percentage = allocations[key];
        const amount = Math.round((income * percentage) / 100);

        return (
          <div key={key} className="space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-slate-100 ${config.color}`}>
                    <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">{config.label}</h3>
                  <p className="text-xs text-slate-400">{config.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold ${config.color}`}>
                   {percentage}%
                </div>
                <div className="text-sm font-medium text-slate-500">
                  ₹{amount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="relative h-6 flex items-center">
               <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={percentage}
                onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
                className={`w-full z-10 ${config.color}`}
              />
              {/* Custom Track Background for visual flair */}
              <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 rounded-full transform -translate-y-1/2 overflow-hidden pointer-events-none">
                 <div 
                    className={`h-full ${config.bg} transition-all duration-100 ease-out`} 
                    style={{ width: `${percentage}%` }}
                 />
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-400">
        <span>Total Distribution</span>
        <span className={`font-mono ${(allocations.needs + allocations.wants + allocations.savings) === 100 ? 'text-green-500' : 'text-red-500'}`}>
          {allocations.needs + allocations.wants + allocations.savings}%
        </span>
      </div>
    </div>
  );
};