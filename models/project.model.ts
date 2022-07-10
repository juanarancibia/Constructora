export interface Budgetable {
  name: string;
  budget: number;
  payed?: number;
}

export interface Area extends Budgetable {
  project: string;
  category: string;
}
