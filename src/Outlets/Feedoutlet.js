import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function Feedoutlet() {

  return (
    // <Box maxWidth={200}>

    <Box flex="3" p="2"  height={50} justifyContent="center">

      <Outlet  />

    </Box>
    // </Box>
  );
}

export default Feedoutlet;
