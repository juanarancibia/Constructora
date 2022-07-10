import { useEffect, useState } from "react";
import { Payment } from "../models/payment.model";
import {
  collection,
  onSnapshot,
  Timestamp,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { db } from "../firebase-config";
import {
  DataGrid,
  GridAlignment,
  GridCallbackDetails,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { deletePayment, getUserId } from "../services/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const columns = [
  { field: "customId", headerName: "Id", width: 50 },
  { field: "project", headerName: "Obra", width: 250 },
  {
    field: "amount",
    headerName: "Monto",
    type: "number",
    width: 250,
    headerAlign: "left" as GridAlignment,
    align: "left" as GridAlignment,
  },
  {
    field: "date",
    headerName: "Fecha",
    width: 100,
    valueGetter: (value: any) =>
      `${new Timestamp(value.row.date?.seconds, value.row.date?.nanoseconds)
        .toDate()
        .toLocaleDateString()}`,
  },
];

export default function PaymentsTable() {
  const [payments, setPayments] = useState([] as Payment[]);
  const [selectionModel, setSelectionModel] = useState([] as string[]);

  useEffect(() => {
    const q = query(
      collection(db, "payments"),
      where("uid", "==", getUserId()),
      orderBy("date", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      setPayments(
        querySnapshot.docs.map(
          (doc: any, index: number): Payment => ({
            ...doc.data(),
            id: doc.id,
            customId: (index += 1),
          })
        )
      );
    });
  }, []);

  const deleteRows = () => {
    const filteredFileList = payments.filter((item) =>
      selectionModel.includes(item.id!)
    );

    filteredFileList.forEach((payment) => deletePayment(payment.id!));
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
        width: 750,
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
        rows={payments}
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
