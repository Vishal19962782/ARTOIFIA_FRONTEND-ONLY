import { Box, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import AxiosBase from "../api/AxiosBase";
import EventOrderDetailcard from "../Components/EventOrderDetailcard";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AxiosBase.get("api/ticket/getOrder").then((res) => {
      setTickets(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading ? (
        tickets.map((item, index) => {
          return <EventOrderDetailcard key={index} tickets={item} />;
        })
      ) : (
        <Skeleton variant="rect" animation="wave" width="100%" height={200} />
      )}
      {tickets?.length == 0&&!loading ? (
        <Box>
          <Typography variant="h6" sx={{ opacity: "0.3",color:"text.primary" }} textAlign={"center"}>
            NO Tickets Purchased
          </Typography>
        </Box>
      ) : null}
    </>
  );
}

export default MyTickets;
