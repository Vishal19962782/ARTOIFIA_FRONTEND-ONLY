import {
  Badge,
  Box as Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
} from "@mui/material";
import React from "react";
import Home from "@mui/icons-material/Home";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BrushIcon from "@mui/icons-material/Brush";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../features/Userslice";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
function Sidebar({ setTheme, theme }) {
  const [open, setOpen] = React.useState(true);
  const UserData = useSelector(getUser);
  const { isArtist, isAdmin } = UserData;
  return (
    <>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          left: "5px",
          top: "10px",
          zIndex: 9999,
          color: "white",
          display: { sm: "block", md: "none" },
        }}
      >
        <MenuIcon />
  
      </IconButton>
      <Box
        bgColor="#f5f5f5"
        position={"static"}
        flex="1"
        p="2"
        sx={{
          display: {
            sm: open ? "none" : "block",
            xs: open ? "none" : "block",
            md: "block",
          },
        }}
      >
        <Paper
          sx={{
            width: "200px",
            position: "fixed",
            top: "90px",
            left: "0px",
            backgroundColor: "secondary",
            borderRadius: "0px 60px 60px 0px",
            overflow: "hidden",
            display: {
              sm: open ? "none" : "block",
              xs: open ? "none" : "block",
              md: "block",
            },
            maxHeight:"90vh",
            zIndex: 9999,
          }}
        >
          <List sx={{ display: "flex", flexDirection: "column", gap: "13px" }}>
            <NavLink color="black"  to="/home" >
              <ListItem disablePadding>
                <ListItemButton  >
                  <ListItemIcon>
                    <BrushIcon />
                  </ListItemIcon>
                  <ListItemText sx={{color:"text.primary"}} primary="All arts" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to="/home/allArts"  >
              <ListItem disablePadding>
                <ListItemButton  >
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText sx={{color:"text.primary"}} primary="Following" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to="/Home/MyBids">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Badge
                      badgeContent={UserData?.Notification?.length}
                      color="secondary"
                    >
                      <PointOfSaleIcon />
                    </Badge>
                  </ListItemIcon>

                  <ListItemText sx={{color:"text.primary"}} primary="My Bids" />
                </ListItemButton>{" "}
              </ListItem>
            </NavLink>
            <NavLink to="User">
              <ListItem disablePadding>
                <ListItemButton >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText sx={{color:"text.primary"}} primary="Profile" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to="/home/events">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                  <StoreIcon />
                  </ListItemIcon>
                  <ListItemText sx={{color:"text.primary"}} primary="Events" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to="/home/orders">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingBasketOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText sx={{color:"text.primary"}} primary="Orders" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <ListItem disablePadding>
              <ListItemButton  >
                <ListItemIcon>
                  <DarkModeIcon />
                </ListItemIcon>
                <Switch
                  onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
                />
              </ListItemButton>
            </ListItem>
            {isArtist ? (
              <ListItem disablePadding>
                <NavLink to="/Home/managePosts" >
                  <ListItemButton>
                    <ListItemIcon>
                      <PointOfSaleIcon />
                    </ListItemIcon>
                    <ListItemText sx={{color:"text.primary"}} primary="Mananage Posts" />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ) : null}
            {isArtist ? (
              <ListItem disablePadding>
                <NavLink to="/Home/ArtistInsigths" >
                  <ListItemButton>
                    <ListItemIcon>
                      <PsychologyIcon color={"warning"}/>
                    </ListItemIcon>
                    <ListItemText sx={{color:"text.primary"}} primary="Artist Insight" />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ) : null}
            {isAdmin ? (
              <NavLink to="/Admin" >
                  <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{color:"red"}}>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText sx={{color:"text.primary"}} primary="Admin panel" />
                  </ListItemButton>
              </ListItem>
                </NavLink>
            ) : null}
          </List>
        </Paper>
      </Box>
    </>
  );
}

export default Sidebar;
