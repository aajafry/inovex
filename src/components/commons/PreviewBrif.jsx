/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

export default function PreviewBrif({ title, body }) {
  return (
    <Box>
      <Typography variant="h6" className="w-full capitalize" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" className="w-full font-thin">
        {body}
      </Typography>
    </Box>
  );
}
