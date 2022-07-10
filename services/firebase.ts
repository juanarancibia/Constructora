import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getUserFromCookie } from "../auth/userCookie";
import { db } from "../firebase-config";
import { Area, Budgetable } from "../models/project.model";

export const getUserId = () => {
  const user: {
    id: string;
    email: string;
  } = getUserFromCookie();

  return user?.id;
};

export const postExpense = async (expense: any) => {
  expense.date = expense.date
    ? Timestamp.fromDate(
        new Date(new Date(expense.date).toUTCString().slice(0, 25))
      )
    : Timestamp.fromDate(new Date(Date.now()));
  const expensesCollectionRef = collection(db, "expenses");

  getAuth().onAuthStateChanged((user) => {
    addDoc(expensesCollectionRef, {
      ...expense,
      uid: user?.uid,
    });
  });
};

export const deleteExpense = async (expenseId: string) => {
  const expensesCollectionRef = doc(db, "expenses", expenseId);
  return await deleteDoc(expensesCollectionRef);
};

export const postProject = async (project: Budgetable) => {
  const projectCollectionRef = collection(db, "project");

  getAuth().onAuthStateChanged((user) => {
    addDoc(projectCollectionRef, { ...project, uid: user?.uid });
  });
};

export const getProjects = async () => {
  const projectsCollectionRef = collection(db, "projects");

  const data = await getDocs(projectsCollectionRef);
};

export const postArea = async (area: Area) => {
  const areaCollectionRef = collection(db, "area");

  getAuth().onAuthStateChanged((user) => {
    addDoc(areaCollectionRef, { ...area, uid: user?.uid });
  });
};

export const postPayment = async (payment: any) => {
  payment.date = payment.date
    ? Timestamp.fromDate(
        new Date(new Date(payment.date).toUTCString().slice(0, 25))
      )
    : Timestamp.fromDate(new Date(Date.now()));
  const paymentsCollectionRef = collection(db, "payments");

  getAuth().onAuthStateChanged((user) => {
    addDoc(paymentsCollectionRef, { ...payment, uid: user?.uid });
  });
};

export const deletePayment = async (paymentId: string) => {
  const paymentsCollectionRef = doc(db, "payments", paymentId);
  return await deleteDoc(paymentsCollectionRef);
};
