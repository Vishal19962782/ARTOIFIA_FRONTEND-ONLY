import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import AxiosBase from "../api/AxiosBase";
import { useNavigate } from "react-router-dom";

export default function TrendingArtists() {
  const navigate=useNavigate()
  const [artists, setArtists] = React.useState([]);
  useEffect(() => {
    AxiosBase.get("/api/trending/trendingArtsits").then((res) => {
      setArtists(res.data);
      console.table(res.data);
    });
  }, []);
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {artists.map((artist) => {
        return (
          <ListItem onClick={()=>navigate("/userpage/"+artist._id)} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={artist.img} />
            </ListItemAvatar>
            <ListItemText
              primary={artist.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {artist?.description}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
