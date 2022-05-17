import {
  Avatar,
  Chip,
  Divider,
  Paper,
  Stack,
  Switch,
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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AxiosBase from "../../../api/AxiosBase";
import AnimationPages from "../../../Outlets/AnimationPages";


function UserTable() {
  const navigate=useNavigate();
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [search, setsearch] = useState("");
  const [condition, setCondition] = useState("all");

  useEffect(() => {
    AxiosBase.get("/api/admin/getUserInfos").then((res) => {
      setData(res.data);
      
      setsearch(res.data);
    });
  }, [update]);
  const handleBlock = async(id,isBlocked) => {
  const {isConfirmed}=await  Swal.fire({
      title: "Are you sure?",
      text: `You want to ${isBlocked?"unblock":"block"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    })
    
    if(isConfirmed){
    AxiosBase.put("/api/admin/blockUser", { id }).then((res) => {
      
      setUpdate(!update);
    });}
  };
  const Search = (e) => {
    
    
    //filter data based on search text
    const re = new RegExp(e.target.value);
    const filteredData = search.filter((item) => {
      return re.test(item.fname) || re.test(item.lname);
    });
    setData(filteredData);
  };
  useEffect(() => {});

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
          <Chip
            size="small"
            variant="outlined"
            color="primary"
            label="Show users"
            onClick={() => setCondition("0")}
            clickable
          />
          <Chip
            size="small"
            variant="outlined"
            color="primary"
            label="Show artists"
            onClick={() => setCondition("1")}
            clickable
          />
        </Stack>
        <TableContainer component={Paper} elevation={9} sx={{ padding: "5px" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableCell sx={{ width: "5px" }} align="left">
                Avatar
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                First name
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Last name
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Email
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                User role
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Total Posts
              </TableCell>
              <TableCell sx={{ width: "70px" }} align="center">
                Total Posts
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
                      <Avatar onClick={()=>navigate(`user/${row?._id}`)} src={row.avatar} />
                    </TableCell>
                    <TableCell align="center">{row?.fname}</TableCell>
                    <TableCell align="center">{row?.lname}</TableCell>
                    <TableCell align="center">{row?.email}</TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={!row?.isBlocked}
                        onClick={() => {
                          handleBlock(row._id,row.isBlocked);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {row?.isArtist ? "Artist" : "User"}
                    </TableCell>
                    <TableCell sx={{ width: "70px" }} align="center">
                      {row.posts.length}
                    </TableCell>
                    <TableCell sx={{ width: "70px" }} align="center">
                      Total Posts
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
  );
}

export default UserTable;
