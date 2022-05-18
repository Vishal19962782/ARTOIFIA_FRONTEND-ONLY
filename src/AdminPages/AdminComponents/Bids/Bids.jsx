import {
  Chip,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import AxiosBase from "../../../api/AxiosBase";
import AnimationPages from "../../../Outlets/AnimationPages";

function Bids() {
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [search, setsearch] = useState("");
    const [condition, setCondition] = useState("all");
    
    useEffect(() => {
      AxiosBase.get("/api/admin/getPostInfos").then((res) => {
        setData(res.data);
        
        setsearch(res.data);
      });
    }, [update]);
   
    const Search = (e) => {
      
      
      //filter data based on search text
      const re = new RegExp(e.target.value);
      const filteredData = search.filter((item) => {
        return re.test(item.fname) || re.test(item.lname);
      });
      setData(filteredData);
    };
   
  
    const check = (item) => {
      
      if (condition == "all") {
        return true;
      }
      if (item.isArtist == condition) {
        
        return true;
      }
      return false;
    };
  return (
    <>
     <AnimationPages>
      <Stack mt={4}>
        <TextField
          onChange={Search}
          sx={{ maxWidth: "200px", mb: "10px" }}
          placeholder="Type here to Search"
          variant="standard"
        ></TextField>
        <Stack gap={1} mb={2} direction>
          <Chip
            size="small"
            variant="outlined"
            color="primary"
            label="Show all"
            onClick={() => setCondition("all")}
            clickable
          />
        
        </Stack>
        <TableContainer component={Paper} elevation={9} sx={{ padding: "5px" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableCell sx={{ width: "5px" }} align="left">
                Post
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Art name
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Artist name
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Current price
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
               Total likes
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Total bids
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Date
              </TableCell>
            </TableHead>
            <TableBody>
              {data
                ?.filter((item) => check(item, condition))
                .map((row) => (
                  <TableRow
                    key={row?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <img src={row.Image} alt="art" width="60px" />
                    </TableCell>
                    <TableCell align="center">{row?.postName}</TableCell>
                    <TableCell align="center">{row?.postOwner.fname +" "+ row?.postOwner.lname  }</TableCell>
                    <TableCell align="center">{row?.minPrice}₹ </TableCell>
                    <TableCell align="center">
                     {row.Status}
                    </TableCell>
                    <TableCell align="center">
                      {row?.postLikes?.length}
                    </TableCell>
                    <TableCell sx={{ width: "70px" }} align="center">
                      {row?.bids.length} 
                    </TableCell>
                    <TableCell sx={{ width: "70px" }} align="center">
                      {new Date(row?.postDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography color={"gray"} mt={3}>
          click on any user to get insights
        </Typography>
        <Divider variant="pre" />
      </Stack>
    </AnimationPages>
    </>
  )
}

export default Bids