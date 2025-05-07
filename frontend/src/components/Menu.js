import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigateTo = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Portail du Concours
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button onClick={() => navigateTo("/")}>
            <HomeIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Accueil" />
          </ListItem>
          <ListItem button onClick={() => navigateTo("/admin")}>
            <AdminPanelSettingsIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Dashboard Admin" />
          </ListItem>
          <ListItem button onClick={() => navigateTo("/login")}>
            <ListItemText primary="Se connecter" />
          </ListItem>
          
        </List>
      </Drawer>
    </div>
  );
};

export default Menu;
