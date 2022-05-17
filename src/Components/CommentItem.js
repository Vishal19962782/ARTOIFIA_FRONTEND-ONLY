import { Avatar, Box, Grid, Paper } from "@mui/material";

function CommentItem(props) {
  return (
    <div>
      {props?.comments?.map((comment, index) => {
        const date = new Date(comment?.date);
        return (
          <Box p={1} key={index}>
            <Paper
              elevation={5}
              style={{ borderRadius: "20px", padding: "20px 20px" }}
            >
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp" />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4
                    style={{ margin: 0, textAlign: "left", color: "primary" }}
                  >
                    {comment?.userId?.fname} {comment?.userId?.lname}
                  </h4>
                  <p style={{ textAlign: "left", fontSize: "16px" }}>
                    {comment?.comment}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      color: "gray",
                      fontSize: "12px",
                    }}
                  >
                    {date.toDateString()}
                  </p>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      })}
    </div>
  );
}

export default CommentItem;
