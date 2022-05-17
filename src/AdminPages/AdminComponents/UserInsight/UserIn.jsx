import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosBase from "../../../api/AxiosBase";

function UserIn() {
  const [data, setData] = React.useState([]);
  const { id } = useParams();
  useEffect(() => {
    AxiosBase.get("/api/admin/getUserInfo/" + id)
      .then((res) => {
        
        setData(res.data);
      })
      .catch((err) => {
        
      });
  }, []);
  return (
    <Grid ml={5} container display="flex" justifyContent={"center"} gap={3}>
      <Grid
        bgcolor="#e1f5fe"
        pt={"30px"}
        container
        display="flex"
        alignItems="center"
      >
        <Grid
          justifyContent={"center"}
          display={"flex"}
          item
          xs={12}
          md={3}
          lg={3}
        >
          <Avatar sx={{ width: "100px", height: "100px" }} src={data?.avatar} />
        </Grid>
        <Grid item lg={9} md={9} xs={12}>
          <Typography variant="h2">
            {data?.fname + " " + data?.lname}
          </Typography>
        </Grid>
        <Grid mt={4} item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <Box>
        <Typography variant="h4">Email: {data?.email}</Typography>
        <Typography variant="h4">Phone: {data?.phoneNo}</Typography>
        <Typography variant="h4">Address: {data?.addressArray}</Typography>
  
      </Box>
   
      {/* <Grid container dislay="flex" justifyContent={"space-around"}>
        <Grid container xs={12} lg={4} justifyContent="center" display="flex">
          <Grid item lg={6}>
            <Typography variant="h4">full name:</Typography>
          </Grid>
          <Grid item lg={6}>
            <Typography variant="h4">
              {data.fname + " " + data.lname}
            </Typography>
          </Grid>
        </Grid>
        <Divider orientation="vertical" variant="middle" />
        <Grid container xs={12} lg={4} justifyContent="space-around" display="flex">
          <Grid item lg={6}>
            <Typography variant="h4">full name:</Typography>
          </Grid>
          <Grid item lg={5.8}>
            <Typography variant="h4">
              {data.fname + " " + data.lname}
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
}

export default UserIn;
