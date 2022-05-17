import { Chip, Container, Divider, Stack } from "@mui/material";
import React from "react";
import EventInsights from "./EventInsights";
import PostInsights from "./PostInsights";

function ArtistInsightsPage() {
  const [page, setPage] = React.useState(1);
  return (
    <Container maxWidth="md">
      <Stack direction gap={2}>
        <Chip onClick={()=>setPage(1)} clickable label="Event Insights" />
        <Chip onClick={()=>setPage(2)} clickable label="Post Insights" />
      </Stack>
      <Divider sx={{ mt: "10px" }} />
      {page == 1 ? <EventInsights /> : <PostInsights />}
    </Container>
  );
}

export default ArtistInsightsPage;
