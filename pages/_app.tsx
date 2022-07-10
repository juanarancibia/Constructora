/* eslint-disable react/jsx-key */
import { InsertLink, Menu } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import { MENU_ITEMS as menuItems } from "../models/const/menu-items.const";
import { LoadingProvider } from "../shared/hooks/LoadingContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <LoadingProvider>
      <>
        <Button size="large">
          <Menu onClick={() => setOpen(true)} />
        </Button>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List>
              {menuItems.map((item) => {
                return (
                  <>
                    <ListItem
                      disablePadding
                      sx={{ width: 250 }}
                      onClick={() => router.push(item.link)}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <InsertLink />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </ListItem>
                  </>
                );
              })}
            </List>
          </Box>
        </Drawer>
        <Component {...pageProps} />
      </>
    </LoadingProvider>
  );
}

export default MyApp;
