import {
  collection,
  onSnapshot,
  Timestamp,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import {
  DataGrid,
  GridAlignment,
  GridCallbackDetails,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteExpense, getUserId } from "../services/firebase";
import { Expense } from "../models/expense.model";
import { getAuth } from "firebase/auth";
const columns = [
  { field: "customId", headerName: "Id", width: 50 },
  { field: "project", headerName: "Obra", width: 150 },
  { field: "category", headerName: "Categoria", width: 150 },
  { field: "area", headerName: "Rubro", width: 150 },
  { field: "item", headerName: "Item", width: 200 },
  {
    field: "amount",
    headerName: "Monto",
    type: "number",
    width: 150,
    headerAlign: "left" as GridAlignment,
    align: "left" as GridAlignment,
  },
  {
    field: "date",
    headerName: "Fecha",
    width: 100,
    valueGetter: (value: any) =>
      `${new Timestamp(value.row.date.seconds, value.row.date.nanoseconds)
        .toDate()
        .toLocaleDateString()}`,
  },
];

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([] as Expense[]);
  const [selectionModel, setSelectionModel] = React.useState([] as string[]);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      const q = query(
        collection(db, "expenses"),
        where("uid", "==", user?.uid),
        orderBy("date", "desc")
      );

      onSnapshot(q, (querySnapshot) => {
        setExpenses(
          querySnapshot.docs.map(
            (doc: any, index: number): Expense => ({
              ...doc.data(),
              id: doc.id,
              customId: (index += 1),
            })
          )
        );
      });
    });
  }, []);

  const deleteRows = () => {
    const filteredFileList = expenses.filter((item) =>
      selectionModel.includes(item.id!)
    );
    filteredFileList.forEach((expense) => deleteExpense(expense.id!));
  };

  const handleSelectionChange = (
    selectionModel: GridSelectionModel,
    _: GridCallbackDetails
  ) => {
    setSelectionModel(selectionModel as string[]);
  };

  const deleteButton = (
    <Button
      style={{ position: "absolute", bottom: 15, left: 135, zIndex: 1 }}
      color="error"
      size="large"
    >
      <DeleteIcon onClick={deleteRows} />
    </Button>
  );

  return (
    <div
      style={{
        height: 650,
        width: 1030,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {selectionModel.length > 0 && deleteButton}
      <DataGrid
        sx={{
          padding: 1,
          bgcolor: "background.paper",
        }}
        rows={expenses}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={handleSelectionChange}
        selectionModel={selectionModel}
      />
    </div>
  );
}
