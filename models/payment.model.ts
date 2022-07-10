import { Timestamp } from "@firebase/firestore";

export interface Payment {
  id?: string;
  customId: string;
  project: string;
  amount: number;
  date: Date | string | Timestamp;
}
