import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Budgetable } from "../models/project.model";
import { postProject } from "../services/firebase";
import { useLoading } from "../shared/hooks/LoadingContext";

export default function ProjectLoad() {
  const [project, setProject] = useState({} as Budgetable);
  const { loading, setLoading } = useLoading();

  const handleSubmit = async () => {
    setLoading(true);
    await postProject(project);
    setProject({ name: "" } as Budgetable);
    (document.getElementById("name") as HTMLInputElement).value = (
      document.getElementById("budget") as HTMLInputElement
    ).value = "";
    setLoading(false);
  };

  const handleEnter = (event: any) => {
    if (event.key == "Enter") {
      event.preventDefault();
      event.stopPropagation();
    }
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
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="name"
              label="Obra"
              variant="filled"
              onChange={(event) => {
                setProject({ ...project, name: event.target.value });
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
              id="budget"
              label="Presupuesto"
              type="number"
              variant="filled"
              onChange={(event) => {
                setProject({ ...project, budget: +event.target.value });
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
