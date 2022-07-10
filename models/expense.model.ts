import { Timestamp } from "@firebase/firestore";

export interface Expense {
  id?: string;
  customId: number;
  project: string;
  category: string;
  area: string;
  item: string;
  amount: number;
  date: Date | string | Timestamp;
}
