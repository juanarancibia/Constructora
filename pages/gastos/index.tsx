import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import * as React from "react";
import { useState } from "react";
import ExpenseModal from "../../components/ExpenseModal";
import ExpenseTable from "../../components/ExpenseTable";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex-container">
        <ExpenseTable />

        <Box
          sx={{
            position: "absolute",
            bottom: 50,
            right: 50,
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ExpenseModal onSubmit={() => setOpen(false)}></ExpenseModal>
      </Modal>
    </>
  );
}
