import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const StyledCell = (TableCell) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function EventTable({ event }) {
  const columns = [
    {
      field: "eventName",
      headerName: "Event Name",
      width: 150,
      editable: true,
    },
    {
      field: "noOfTickets",
      headerName: "Total No. of Tickets",
      type: "number",
      width: 210,
    },
    {
      headerName: "Tickets Sold",
      field: "noOfTicketsSold",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 260,
    },
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="center">Event Name</TableCell>
            <TableCell align="center">Ticket price</TableCell>
            <TableCell align="center">Tickets Sold</TableCell>
            <TableCell align="center">Event Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {event?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img width="100px" src={row?.eventImage} />
              </TableCell>
              <TableCell align="center">
                <Chip label={row.eventName} />
              </TableCell>
              <TableCell align="center">
                <Chip label={row.ticketPrice} />
              </TableCell>
              <TableCell align="center">
                <Chip label={row.noOfTicketsSold} />
              </TableCell>
              <TableCell align="center">
                <Chip label={row?.eventDate?.substring(0, 10)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventTable;
