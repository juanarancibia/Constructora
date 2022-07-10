import { collection, onSnapshot, query, where } from "@firebase/firestore";
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
import { CATEGORIES } from "../models/const/categories.const";
import { Budgetable, Area } from "../models/project.model";
import { getUserId, postArea } from "../services/firebase";

export default function AreaLoad() {
  const [area, setArea] = useState({} as Area);
  const [projects, setProjects] = useState([] as Budgetable[]);

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

  const handleSubmit = async () => {
    await postArea(area);
    setArea({ name: "" } as Area);
    (document.getElementById("area_name") as HTMLInputElement).value = (
      document.getElementById("area_budget") as HTMLInputElement
    ).value = "";
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
    setArea({ ...area, project: event.target.value });
  };

  const handleCategoryChange = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ) => {
    setArea({ ...area, category: event.target.value });
  };

  return (
    <>
      <Grid
        container
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
                value={area.project}
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
              <InputLabel id="project">Categoria</InputLabel>
              <Select
                labelId="project"
                id="category"
                value={area.category}
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
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="area_name"
              label="Rubro"
              variant="filled"
              onChange={(event) => {
                setArea({ ...area, name: event.target.value });
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
              id="area_budget"
              label="Presupuesto"
              type="number"
              variant="filled"
              onChange={(event) => {
                setArea({ ...area, budget: +event.target.value });
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
