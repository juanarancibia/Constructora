import { Box, Tabs, Tab } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import AreaLoad from "../../components/AreaLoad";
import ProjectLoad from "../../components/ProjectLoad";

export default function Configuration() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="flex-container">
        <Box
          sx={{ bgcolor: "background.paper", paddingBottom: 2, width: "35em" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label="Obra" />
              <Tab label="Categoria" />
            </Tabs>
          </Box>
          <div
            role="tabpanel"
            hidden={value != 0}
            id="simple-tabpanel-1"
            aria-labelledby="simple-tabpanel-1"
          >
            <ProjectLoad />
          </div>
          <div
            role="tabpanel"
            hidden={value != 1}
            id="simple-tabpanel-2"
            aria-labelledby="simple-tabpanel-2"
          >
            <AreaLoad />
          </div>
        </Box>
      </div>
    </>
  );
}
