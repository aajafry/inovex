import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <Paper
      elevation={2}
      className=" h-screen text-center flex flex-col justify-center items-center"
    >
      <Typography variant="h4" className="w-full p-4 font-semibold capitalize">
        404 - Not Found
      </Typography>
      <Button
        variant="contained"
        className="font-bold tracking-normal text-nowrap capitalize "
      >
        <Link to="/">Back to Dashbord</Link>
      </Button>
    </Paper>
  );
}
