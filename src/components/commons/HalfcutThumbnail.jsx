import { Box, Button, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function HalfcutThumbnail({ name, ppImg, bgImg }) {
  return (
    <Box
      className=" flex justify-between items-center p-2 my-1"
      sx={{ background: `url(${bgImg}) center/cover no-repeat` }}
    >
      <Box className=" flex items-baseline ">
        <img src={ppImg} alt={name} className=" h-32 w-32 mr-2" />
        <Typography variant="h6" className="capitalize">
          {name}
        </Typography>
      </Box>
      <Box>
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
    </Box>
  );
}
