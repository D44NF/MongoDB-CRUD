import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";

const mainItems = [
  { label: "Shop", path: "/shop" },
  { label: "Bibliothek", path: "/library" },
];

const secondaryItems = [
  { label: "Einstellungen", path: "/settings" },
  { label: "Hilfe", path: "/help" },
];

export default function AppDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const renderItem = (item: { label: string; path: string }) => (
    <ListItem key={item.label} disablePadding>
      <ListItemButton component={NavLink} to={item.path} onClick={onClose}>
        <ListItemIcon>{/* Add icons later */}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "var(--color-secondary)",
            },
          },
        }}
      >
        <List>{mainItems.map(renderItem)}</List>
        <Divider />
        <List>{secondaryItems.map(renderItem)}</List>
      </Drawer>
    </div>
  );
}
