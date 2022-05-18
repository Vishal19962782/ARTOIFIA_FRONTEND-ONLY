import { Box, Button, Divider, Skeleton, Stack } from "@mui/material";
import EventCard from "../Components/EventCard";
import AxiosBase from "../api/AxiosBase";
import { useEffect, useState } from "react";
import AddEventPage from "./AddEventPage";
import { useSelector } from "react-redux";
import { getUser } from "../features/Userslice";
import MyTickets from "./MyTickets";
import styled from "@emotion/styled";

const SButton = styled(Button)({
  borderRadius: "0px",
});

function EventsPage() {
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    AxiosBase.get("/api/Events/getEvents").then((res) => {
      setEvent(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <Box sx={{ width: "80%" }}>
      <Stack direction gap={2}>
        <Button
          size="small"
          sx={{ borderRadius: "15px 15px 0px 0px" }}
          variant={page == 1 ? "contained" : "text"}
          onClick={() => setPage(1)}
        >
          Upcomming Events
        </Button>
        <Button
          size="small"
          sx={{ borderRadius: "15px 15px 0px 0px" }}
          variant={page == 3 ? "contained" : "text"}
          onClick={() => setPage(3)}
        >
          My Tickets
        </Button>
        {user.isArtist ? (
          <Button
            size="small"
            sx={{ borderRadius: "15px 15px 0px 0px" }}
            variant={page == 2 ? "contained" : "text"}
            onClick={() => setPage(2)}
          >
            Add Event
          </Button>
        ) : null}
      </Stack>
      <Divider />
      {loading ? (
        <Skeleton
          sx={{ mt: "30px" }}
          variant="rect"
          animation="wave"
          width="100%"
          height={200}
        />
      ) : null}
      {page == 1 && !loading ? (
        event.map((item, index) => {
          return <EventCard key={index} item={item} />;
        })
      ) : page == 2 ? (
        <AddEventPage />
      ) : (
        <MyTickets />
      )}
    </Box>
  );
}

export default EventsPage;
