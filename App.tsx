import React, { useState, useEffect } from 'react';
import { PieChart, Sliders, TrendingUp, Info } from 'lucide-react';
import { Card } from './components/Card';
import { IncomeInput } from './components/IncomeInput';
import { CategorySliders } from './components/CategorySliders';
import { BudgetChart } from './components/BudgetChart';
import { SavingsProjection } from './components/SavingsProjection';
import { saveBudgetState, loadBudgetState, clearBudgetState } from './services/storage';
import { Allocations, DEFAULT_ALLOCATIONS } from './types';

function App() {
  const [income, setIncome] = useState<number>(0);
  const [allocations, setAllocations] = useState<Allocations>(DEFAULT_ALLOCATIONS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadBudgetState();
    setIncome(saved.income);
    setAllocations(saved.allocations);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      saveBudgetState({ income, allocations });
    }
  }, [income, allocations, loaded]);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      clearBudgetState();
      setIncome(0);
      setAllocations(DEFAULT_ALLOCATIONS);
    }
  };

  const monthlySavings = Math.round((income * allocations.savings) / 100);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-lg">
                <PieChart className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Finance<span className="text-brand-600">Flow</span></h1>
          </div>
          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Student Budget Playground
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input & Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Income Section */}
            <Card title="Monthly Income" className="border-t-4 border-t-brand-500">
              <IncomeInput income={income} setIncome={setIncome} onReset={handleReset} />
            </Card>

            {/* Split Section */}
            <Card 
                title="Budget Allocation" 
                icon={<Sliders size={20} />} 
                className={income === 0 ? 'opacity-50 pointer-events-none grayscale' : ''}
            >
              <CategorySliders 
                income={income} 
                allocations={allocations} 
                setAllocations={setAllocations} 
              />
            </Card>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-700">
                <Info className="shrink-0 mt-0.5" size={18} />
                <p>
                    <strong>The 50/30/20 Rule:</strong> A popular budgeting strategy suggests spending 50% on Needs, 30% on Wants, and 20% on Savings. Adjust the sliders above to see how your income fits this model!
                </p>
            </div>
          </div>

          {/* Right Column: Visualization & Projection */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visualization */}
            <Card title="Visual Breakdown">
              <BudgetChart allocations={allocations} income={income} />
            </Card>

            {/* Projection */}
            <Card 
                title="Savings Projection" 
                icon={<TrendingUp size={20} />}
                className={income === 0 ? 'opacity-50 pointer-events-none grayscale' : ''}
            >
               <SavingsProjection monthlySavings={monthlySavings} />
            </Card>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} FinanceFlow. Your data is stored locally in your browser.</p>
      </footer>
    </div>
  );
}

export default App;