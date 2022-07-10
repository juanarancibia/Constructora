import { query, collection, where, onSnapshot } from "@firebase/firestore";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { Payment } from "../models/payment.model";
import { Budgetable } from "../models/project.model";
import { getUserId, postPayment } from "../services/firebase";
import { useLoading } from "../shared/hooks/LoadingContext";

type props = {
  onSubmit: () => void;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const handleEnter = (event: any) => {
  if (event.key == "Enter") {
    event.preventDefault();
    event.stopPropagation();
  }
};

export default function PaymentsModal({ onSubmit }: props) {
  const [payment, setPayment] = useState({} as Payment);
  const [projects, setProjects] = useState([] as Budgetable[]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const q = query(collection(db, "project"), where("uid", "==", getUserId()));

    onSnapshot(q, (querySnapshot) => {
      setProjects(
        querySnapshot.docs.map(
          (doc: any): Budgetable => ({
            ...doc.data(),
          })
        )
      );
    });
  }, []);

  const handleSubmit = () => {
    onSubmit();
    setLoading(true);
    postPayment(payment);
    setPayment({ ...payment, date: "" });
    setLoading(false);
  };

  const handleProjectChange = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ) => {
    setPayment({ ...payment, project: event.target.value });
  };

  return (
    <>
      <Grid
        container
        sx={style}
        padding={1}
        justifyContent="center"
        alignItems="center"
        onKeyPress={handleEnter}
      >
        <Grid item margin={1} sx={{ width: "100%" }}>
          <Box component="form" noValidate autoComplete="off">
            <FormControl fullWidth variant="filled">
              <InputLabel id="project">Obra</InputLabel>
              <Select
                labelId="project"
                id="project"
                value={payment.project}
                label="Obra"
                onChange={handleProjectChange}
              >
                {projects.map((project, index) => {
                  return (
                    <MenuItem
                      key={`${project.name}_${index}`}
                      value={project.name}
                    >
                      {project.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item margin={1} sx={{ width: "100%" }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="filled-basic"
              type="number"
              label="Monto"
              variant="filled"
              onChange={(event) => {
                setPayment({ ...payment, amount: +event.target.value });
              }}
              onKeyPress={handleEnter}
            />
          </Box>
        </Grid>
        <Grid item margin={1} sx={{ width: "100%" }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="filled-basic"
              type="date"
              label="Fecha"
              variant="filled"
              onChange={(event) => {
                setPayment({ ...payment, date: event.target.value });
              }}
              onKeyPress={handleEnter}
            />
          </Box>
        </Grid>
        <Grid item margin={1} sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{
              height: 45,
            }}
            onClick={handleSubmit}
          >
            Cargar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
