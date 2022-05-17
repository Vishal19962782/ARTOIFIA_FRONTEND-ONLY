import { Box, Container, Divider, Stack } from "@mui/material";
import MyTickets from "./MyTickets";
import PastOrders from "./PastOrders";

function Allorders() {
  return (
    <Container maxWidth={"md"} sx={{ mr: { lg: "300px",md:"0px" } }}>
      <Box >
   
        <Stack>
            <Divider sx={{color:"text.primary"}} variant="string">Bids-Purchased</Divider>
            <PastOrders/>
            <Divider sx={{color:"text.primary"}} variant="string">Events</Divider>
            <MyTickets/>
        </Stack>

      </Box>
    </Container>
  );
}

export default Allorders;
