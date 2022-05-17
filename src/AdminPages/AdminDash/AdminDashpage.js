import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { MonthlySalesChart } from "../ChartComponents/MontlySalesChart";
import { MonthlyUserChart } from "../ChartComponents/MontlyUserChart";
// import { MonthlySalesChart } from "../ChartComponents/MontlySalesChart";
import { PostsStatus } from "../ChartComponents/PostsStatus";
import { Uservsartist } from "../ChartComponents/Uservsartist";

function AdminDashpage() {
  return (
    <Container maxWidth="md">
      <Stack direction justifyContent={"space-around"}>
        <Box width={300}>
          <Uservsartist />
        </Box>
        <Box width={300}>
          <PostsStatus />
        </Box>
      </Stack>
      <MonthlySalesChart />
      <MonthlyUserChart />
    </Container>
  );
}

export default AdminDashpage;
