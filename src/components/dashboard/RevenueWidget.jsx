/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import React from 'react';


export default function RevenueWidget({totalRevenue}) {
  return (
    <Paper elevation={2}
    sx={{ backgroundColor: "secondary.main", color: "info.main"}}>
       <ListItem>
          <ListItemIcon className=" min-w-fit mr-2">
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText
            primary="Revenues" 
          />
        </ListItem>
        <Typography variant="h4" className=" pl-4" gutterBottom>
          ${totalRevenue ? totalRevenue : 0}
       </Typography>
    </Paper>
  )
}
