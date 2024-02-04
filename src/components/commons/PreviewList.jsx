/* eslint-disable react/prop-types */
import { Paper, Typography } from "@mui/material";

export default function PreviewList({ title, subtitle }) {
  return (
    <Paper elevation={2} className="p-4 my-1">
      <Typography variant="h6" className="capitalize">
        {title}
      </Typography>
      <Typography variant="subtitle2">{subtitle}</Typography>
    </Paper>
  );
}
