import { Chip, Container, Divider, Stack } from "@mui/material";
import React from "react";
import EventInsights from "./EventInsights";
import PostInsights from "./PostInsights";

function ArtistInsightsPage() {
  const [page, setPage] = React.useState(1);
  return (
    <Container maxWidth="md">
     
      <Divider sx={{ mt: "10px" }} />
      {page == 1 ? <EventInsights /> : <PostInsights />}
    </Container>
  );
}

export default ArtistInsightsPage;
