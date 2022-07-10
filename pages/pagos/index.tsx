import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Modal } from "@mui/material";
import { useState } from "react";
import PaymentsModal from "../../components/PaymentsModal";
import PaymentsTable from "../../components/PaymentsTable";

export default function Payments() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex-container">
        <PaymentsTable />

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
        <PaymentsModal onSubmit={() => setOpen(false)}></PaymentsModal>
      </Modal>
    </>
  );
}
