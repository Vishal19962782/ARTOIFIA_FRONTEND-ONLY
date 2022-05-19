import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useEffect } from "react";
import AxiosBase from "../api/AxiosBase";
import EventTable from "./EventTable";
function EventInsights() {
  const [data, setData] = React.useState(null);
  useEffect(() => {
    AxiosBase.get("/api/ArtistInsight").then(({ data }) => {
      console.log(data);
      setData(data);
    });
  }, []);
  return (
    <Grid sx={{ mt: "20px" }} gap={1} justifyContent="space-evenly" container>
      <Grid item xs={5} lg={12}>
        <Paper sx={{ padding: "20px", backgroundColor: "error.dark" }}>
          <Stack justifyContent={"center"} alignItems="center">
            <Typography variant="h6" fontSize={18}>
              TOTAL REVENUE
            </Typography>
            <Stack direction alignItems={"center"}>
              <CurrencyRupeeIcon />
              <Typography variant="h3" fontSize={60}>
              {parseInt(data?.eventRevenue[0].total)+parseInt(data?.postRevenue[0].total)}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={5} lg={5.8}>
        <Paper sx={{ padding: "20px", backgroundColor: "warning.dark" }}>
          <Stack justifyContent={"center"} alignItems="center">
            <Typography variant="h6" fontSize={18}>
              EVENT REVENUE
            </Typography>
            <Stack direction alignItems={"center"}>
              <Typography variant="h2" fontSize={60}>
                {data?.eventRevenue[0].total}
              </Typography>
              <CurrencyRupeeIcon />
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={5} lg={5.8}>
        <Paper sx={{ padding: "20px", backgroundColor: "warning.dark" }}>
          <Stack justifyContent={"center"} alignItems="center">
            <Typography variant="h6" fontSize={18}>
              BID REVENUE
            </Typography>
            <Stack direction alignItems={"center"}>
              <Typography variant="h2" fontSize={60}>
                {data?.postRevenue[0]?.total}
              </Typography>
              <CurrencyRupeeIcon />
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={5} lg={3.5}>
        <Paper sx={{ padding: "20px", backgroundColor: "success.dark" }}>
          <Stack justifyContent={"center"} alignItems="center">
            <Typography variant="h6" fontSize={18}>
              BIDS SOLD
            </Typography>
            <Stack direction alignItems={"center"}>
              <Typography variant="h3" fontSize={60}>
                {data?.postRevenue[0].count}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={5} lg={3.5}>
        <Paper sx={{ padding: "20px", backgroundColor: "info.dark" }}>
          <Stack justifyContent={"center"} alignItems="center">
            <Typography variant="h6" fontSize={18}>
              EVENTS HOSTED
            </Typography>
            <Typography variant="h2" fontSize={60}>
              {data?.event?.length}
            </Typography>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={5} lg={3.5}>
        <Paper sx={{ padding: "20px", backgroundColor: "success.dark" }}>
          <Stack justifyContent={"center"} alignItems="center">
            <Typography variant="h6" fontSize={18}>
              TICKETS SOLD
            </Typography>
            <Typography variant="h2" fontSize={60}>
              {data?.eventRevenue[0]?.count}
            </Typography>
          </Stack>
        </Paper>
      </Grid>
      <Divider />
      <Grid item xs={5} lg={12}>
        <EventTable event={data?.event} />
      </Grid>
    </Grid>
  );
}

export default EventInsights;
