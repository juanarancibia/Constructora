import {
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { CATEGORIES } from "../models/const/categories.const";
import { Expense } from "../models/expense.model";
import { Area, Budgetable } from "../models/project.model";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { getUserId, postExpense as postExpense } from "../services/firebase";
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

export default function ExpenseModal({ onSubmit }: props) {
  const [expense, setExpense] = useState({} as Expense);
  const [projects, setProjects] = useState([] as Budgetable[]);
  const [area, setArea] = useState([] as Area[]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const q = query(collection(db, "area"), where("uid", "==", getUserId()));

    onSnapshot(q, (querySnapshot) => {
      setArea(
        querySnapshot.docs.map(
          (doc: any): Area => ({
            ...doc.data(),
          })
        )
      );
    });
  }, []);

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
    postExpense(expense);
    setExpense({ ...expense, date: "" });
    setLoading(false);
  };

  const handleEnter = (event: any) => {
    if (event.key == "Enter") {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleProjectChange = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ) => {
    setExpense({ ...expense, project: event.target.value });
  };

  const handleCategoryChange = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ) => {
    setExpense({ ...expense, category: event.target.value });
  };

  const handleAreaChange = (event: SelectChangeEvent<string>, _: ReactNode) => {
    setExpense({ ...expense, area: event.target.value });
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
        <h1 style={{ color: "rgb(46, 125, 50)" }}>GASTOS</h1>
        <Grid item margin={1} sx={{ width: "100%" }}>
          <Box component="form" noValidate autoComplete="off">
            <FormControl fullWidth variant="filled">
              <InputLabel id="project">Obra</InputLabel>
              <Select
                labelId="project"
                id="project"
                value={expense.project}
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
            <FormControl fullWidth variant="filled">
              <InputLabel id="category">Categoria</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={expense.category}
                label="Categoria"
                onChange={handleCategoryChange}
              >
                {CATEGORIES.map((category, index) => {
                  return (
                    <MenuItem key={`${category}_${index}`} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item margin={1} sx={{ width: "100%" }}>
          <Box component="form" noValidate autoComplete="off">
            <FormControl fullWidth variant="filled">
              <InputLabel id="area_input">Rubro</InputLabel>
              <Select
                labelId="area_input"
                id="area_input"
                value={expense.area}
                label="Rubro"
                onChange={handleAreaChange}
              >
                {area.map((area, index) => {
                  {
                    if (
                      area.project == expense.project &&
                      area.category == expense.category
                    )
                      return (
                        <MenuItem
                          key={`${area.name}_${index}`}
                          value={area.name}
                        >
                          {area.name}
                        </MenuItem>
                      );
                  }
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
              label="Item"
              variant="filled"
              onChange={(event) => {
                setExpense({ ...expense, item: event.target.value });
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
              type="number"
              label="Monto"
              variant="filled"
              onChange={(event) => {
                setExpense({ ...expense, amount: +event.target.value });
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
                setExpense({ ...expense, date: event.target.value });
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
