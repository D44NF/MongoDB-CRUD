import type { ComponentType } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineRounded";
import { NavLink, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
  icon: ComponentType;
}

const mainItems: NavItem[] = [
  { label: "Home", path: "/", icon: HomeIcon },
  { label: "Shop", path: "/shop", icon: StorefrontIcon },
  { label: "Bibliothek", path: "/library", icon: VideogameAssetIcon },
];

const secondaryItems: NavItem[] = [
  { label: "Einstellungen", path: "/settings", icon: SettingsIcon },
  { label: "Hilfe", path: "/help", icon: HelpOutlineIcon },
];

export default function AppDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const location = useLocation();

  const renderItem = (item: NavItem) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;
    return (
      <ListItem key={item.label} disablePadding sx={{ px: 1 }}>
        <ListItemButton
          component={NavLink}
          to={item.path}
          onClick={onClose}
          selected={isActive}
          sx={{
            borderRadius: 1.5,
            "&.Mui-selected": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "& .MuiListItemIcon-root": { color: "primary.contrastText" },
              "&:hover": { bgcolor: "primary.main" },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 260,
            backgroundColor: "background.paper",
          },
        },
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 2.5 }}
      >
        <SportsEsportsIcon sx={{ color: "primary.main" }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          ArcadeX
        </Typography>
      </Box>
      <Divider />
      <List sx={{ py: 1 }}>{mainItems.map(renderItem)}</List>
      <Divider />
      <List sx={{ py: 1 }}>{secondaryItems.map(renderItem)}</List>
    </Drawer>
  );
}
