import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "@firebase/firestore";
import { Budgetable, Area } from "../models/project.model";
import { getUserFromCookie } from "../auth/userCookie";

export const getUserId = () => {
  const user: {
    id: string;
    email: string;
  } = getUserFromCookie();

  return user.id;
};

export const postExpense = async (expense: any) => {
  expense.date = expense.date
    ? Timestamp.fromDate(
        new Date(new Date(expense.date).toUTCString().slice(0, 25))
      )
    : Timestamp.fromDate(new Date(Date.now()));
  const expensesCollectionRef = collection(db, "expenses");

  return await addDoc(expensesCollectionRef, { ...expense, uid: getUserId() });
};

export const deleteExpense = async (expenseId: string) => {
  const expensesCollectionRef = doc(db, "expenses", expenseId);
  return await deleteDoc(expensesCollectionRef);
};

export const postProject = async (project: Budgetable) => {
  const projectCollectionRef = collection(db, "project");

  return await addDoc(projectCollectionRef, { ...project, uid: getUserId() });
};

export const getProjects = async () => {
  const projectsCollectionRef = collection(db, "projects");

  const data = await getDocs(projectsCollectionRef);
};

export const postArea = async (area: Area) => {
  const areaCollectionRef = collection(db, "area");

  return await addDoc(areaCollectionRef, { ...area, uid: getUserId() });
};

export const postPayment = async (payment: any) => {
  payment.date = payment.date
    ? Timestamp.fromDate(
        new Date(new Date(payment.date).toUTCString().slice(0, 25))
      )
    : Timestamp.fromDate(new Date(Date.now()));
  const paymentsCollectionRef = collection(db, "payments");

  return await addDoc(paymentsCollectionRef, { ...payment, uid: getUserId() });
};

export const deletePayment = async (paymentId: string) => {
  const paymentsCollectionRef = doc(db, "payments", paymentId);
  return await deleteDoc(paymentsCollectionRef);
};
