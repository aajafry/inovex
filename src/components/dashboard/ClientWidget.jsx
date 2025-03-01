/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PeopleIcon from "@mui/icons-material/People";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

export default function ClientWidget({ numberOfClient }) {
  return (
    <Paper
      elevation={2}
      sx={{ backgroundColor: "secondary.main", color: "info.main" }}
    >
      <ListItem>
        <ListItemIcon className=" min-w-fit mr-2">
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>
      <Typography variant="h4" className=" pl-4" gutterBottom>
        {numberOfClient ? numberOfClient : 0}
      </Typography>
    </Paper>
  );
}
