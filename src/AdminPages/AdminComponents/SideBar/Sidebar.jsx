import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import HomeIcon from "@mui/icons-material/Home";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { Link } from "react-router-dom";
function Sidebar() {
  const items = [
    { item: "Dashboard", icon: <HomeIcon />, link: "" },
    { item: "Users", icon: <PeopleOutlineIcon />, link: "users" },
    { item: "Requests", icon: <BubbleChartIcon />, link: "Requests" },
    { item: "Bids", icon: <LocalAtmIcon />, link: "Bids" },
  ];
  return (
    <Paper
      height={"100vh"}
      elevation={9}
      sx={{
        backgroundColor: "primary.dark",
        height: "100vh",
        borderRadius: "0px",
      }}
      width={"250px"}
      // role="presentation"
    >
      <Typography
        textAlign="center"
        pt={2}
        fontFamily={"Satisfy"}
        sx={{
          display: { xs: "block", sm: "block" },
          cursor: "pointer",
          color: "white",
        }}
        variant="h5"
      >
        Admin Board
      </Typography>
      <Toolbar sx={{ padding: "0px", margin: "0px" }}>
        <List sx={{ width: "250px" }}>
          {items.map((item, index) => (
            <Link to={item.link}>
              <ListItem button key={index}>
                <Divider sx={{ mt: "50px" }} />
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText sx={{color:"text.primary"}}  primary={item.item} />
                <Divider />
              </ListItem>
            </Link>
          ))}
        </List>
      </Toolbar>
    </Paper>
  );
}

export default Sidebar;
