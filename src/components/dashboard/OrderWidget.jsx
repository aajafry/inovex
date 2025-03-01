/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

export default function OrderWidget({ numberOfOrder }) {
  return (
    <Paper
      elevation={2}
      sx={{ backgroundColor: "secondary.main", color: "info.main" }}
    >
      <ListItem>
        <ListItemIcon className=" min-w-fit mr-2">
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <Typography variant="h4" className=" pl-4" gutterBottom>
        {numberOfOrder ? numberOfOrder : 0}
      </Typography>
    </Paper>
  );
}
