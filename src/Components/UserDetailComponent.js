import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

function UserDetailComponent({
  item,
  value,
  edit,
  editObj,
  setEditObj,
  selector,
}) {
  const [editValue, setEditValue] = useState(true);
  const select = JSON.stringify(selector);
  return (
    <Stack
      sx={{ maxWidth: { sm: "400px" }, minHeight: "50px" }}
      // bgcolor="#fafafa"
      gap={2}
      alignItems={"center"}
      direction="row"
    >
      <Typography minWidth={"100px"} color={"white:"}>
        {item}
      </Typography>
      <Box >
        <TextField
          disabled={editValue}
          variant="standard"
          InputProps={{ style: { fontSize: "20px" } }}
          defaultValue={item!=="Password"?value:"***********"}
          onChange={(e) => {
            setEditObj({ ...editObj, [selector]: e.target.value });
          }}
        >
          {editObj?.select}
        </TextField>
        {edit ? (
          <IconButton onClick={() => setEditValue(!editValue)}>
            <EditIcon color={editValue ? "null" : "primary"} />
          </IconButton>
        ) : null}
      </Box>
    </Stack>
  );
}

export default UserDetailComponent;
