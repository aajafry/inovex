/* eslint-disable react/prop-types */
import { Box, Button, Paper, Typography } from "@mui/material";

export default function PreviewHeader({ label }) {
  return (
    <Paper elevation={2} className="flex justify-between items-center p-2 my-1">
      <Typography variant="button" className="w-full font-medium capitalize">
        {label}
      </Typography>
      <Box className=" contents">
        <Button
          className=" mr-1"
          variant="contained"
          size="small"
          color="primary"
        >
          Edit
        </Button>
        <Button className=" ml-1" variant="outlined" size="small" color="error">
          Delete
        </Button>
      </Box>
    </Paper>
  );
}
