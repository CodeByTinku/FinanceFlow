import { BudgetState, DEFAULT_ALLOCATIONS } from '../types';

const STORAGE_KEY = 'finance_flow_data_v1';

export const saveBudgetState = (state: BudgetState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadBudgetState = (): BudgetState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return {
    income: 0,
    allocations: DEFAULT_ALLOCATIONS,
  };
};

export const clearBudgetState = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};