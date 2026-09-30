import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppDrawer from "./AppDrawer";
import { useState } from "react";

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "var(--color-primary)" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "var(--color-secondary)" }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "var(--color-secondary)" }}
          >
            ArcadeX
          </Typography>
          <IconButton sx={{ color: "var(--color-secondary)" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton sx={{ color: "var(--color-secondary)" }}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
        <AppDrawer open={open} onClose={() => setOpen(false)} />
      </AppBar>
    </Box>
  );
}
