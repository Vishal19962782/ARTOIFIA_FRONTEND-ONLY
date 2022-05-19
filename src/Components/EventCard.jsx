import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventPayment from "./EventPayment";
import AnimationPages from "../Outlets/AnimationPages";

function EventCard({ item }) {
  const [quantity, setQuantity] = React.useState(
    item.noOfTickets - item?.noOfTicketsSold
  );
  const currentDate = new Date();
  const date = new Date(item?.eventDate);
  // const expire=currentDate.getDate()>=date.getDate()?true:false;
  // 
  const expire = currentDate >= date ? true : false;
  return (
    <AnimationPages>
      <Paper
        elevation={3}
        sx={{ marginBottom: "20px", padding: "10px", mt: "20px" }}
      >
        <Card>
          <CardMedia
            component="img"
            image={item?.eventImage}
            alt="no Image"
            height={150}
          />
          <CardContent>
            
            <Stack justifyContent={"space-between"} direction>
              <Typography variant="h4">{item?.eventName} </Typography>
              <Chip variant="outlined" label={date.toDateString()} />

              {!expire?(<Stack gap={1} alignItems={"center"}>
                <Typography variant="h5">{item?.ticketPrice} ₹</Typography>

                <EventPayment
                  Event={item}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <Typography component={"h12"}>
                  {quantity} Tickets available
                </Typography>
              </Stack>):<Typography>This event is over</Typography>}
            </Stack>
            <Stack direction alignItems={"center"}>
              <Avatar src={item?.eventOwner?.avatar}></Avatar>
              <Stack direction alignItems={"center"} gap={1}>
                <Typography variant="h5">
                  {item?.eventOwner?.fname} {item?.eventOwner?.lname}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
          <Accordion sx={{ p: "0" }}>
            <AccordionSummary
              sx={{ height: "10px" }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h6">See details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                  <Typography>{item?.eventDescription}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Typography>{item?.eventAddress}</Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>
      </Paper>
    </AnimationPages>
  );
}

export default EventCard;
