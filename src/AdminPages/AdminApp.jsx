import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "../Components/Navbar";
import AdminOutlet from "../Outlets/AdminOutlet";
import Sidebar from "./AdminComponents/SideBar/Sidebar";
function AdminApp() {
  return (
    <>
      <Grid container>
        <Grid mt={8} item sm={12}  >
          <Box sx={{position:"fixed"}} >
          <Navbar />
          </Box>
        </Grid>
        <Grid item lg={2} md={2} >
          <Box sx={{position:"fixed"}}>
          <Sidebar />
          </Box>
        </Grid>
        <Grid item lg={10}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
         <AdminOutlet/>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminApp;
