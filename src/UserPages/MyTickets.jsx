import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import AxiosBase from "../api/AxiosBase";
import EventOrderDetailcard from "../Components/EventOrderDetailcard";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    AxiosBase.get("api/ticket/getOrder").then((res) => {
      setTickets(res.data);
    });
  }, []);

  return (
    <>
      {tickets.map((item, index) => {
        return <EventOrderDetailcard key={index} tickets={item} />;
      })}
      {tickets?.length == 0 ? (
        <Box>
          <Typography variant="h6" sx={{ opacity: "0.5" }} textAlign={"center"}>
            NO Tickets Purchased
          </Typography>
        </Box>
      ) : null}
    </>
  );
}

export default MyTickets;
