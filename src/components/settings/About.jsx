/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import React from "react";
import DevImg from "../../assets/images/pp.jpg";

export default function About() {
  return (
    <Box className="text-center flex flex-col justify-center items-center">
      <img
        src={DevImg}
        alt="developerImg"
        className=" h-20 w-auto object-cover"
      />
      <Typography variant="subtitle2" component="p" className="py-2 uppercase">
        Developed by Al Abed Jafry
        <br />
        ALL RIGHT RESERVED @2024
      </Typography>
    </Box>
  );
}
