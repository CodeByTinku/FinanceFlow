export interface Allocations {
  needs: number;
  wants: number;
  savings: number;
}

export interface BudgetState {
  income: number;
  allocations: Allocations;
}

export type CategoryKey = keyof Allocations;

export const DEFAULT_ALLOCATIONS: Allocations = {
  needs: 50,
  wants: 30,
  savings: 20,
};